import { useCallback, useEffect, useRef, useState } from "react";
import type { HandLandmarker } from "@mediapipe/tasks-vision";

export type GestureStatus = "idle" | "loading" | "ready" | "tracking" | "error";

type Options = {
  enabled: boolean;
  onPinchOut?: () => void;
  cooldownMs?: number;
};

const WASM_CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const PINCH_IN = 0.055;
const PINCH_OUT = 0.12;

function pinchDistance(landmarks: { x: number; y: number; z: number }[]) {
  const thumb = landmarks[4];
  const index = landmarks[8];
  const wrist = landmarks[0];
  const middle = landmarks[12];
  // Normalize by approximate hand size so distance is stable across depth
  const handSize = Math.hypot(wrist.x - middle.x, wrist.y - middle.y) || 0.2;
  return Math.hypot(thumb.x - index.x, thumb.y - index.y) / handSize;
}

export function useHandGestures({ enabled, onPinchOut, cooldownMs = 900 }: Options) {
  const [status, setStatus] = useState<GestureStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [pinched, setPinched] = useState(false);
  const [handSeen, setHandSeen] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const pinchedRef = useRef(false);
  const lastFireRef = useRef(0);
  const onPinchOutRef = useRef(onPinchOut);
  onPinchOutRef.current = onPinchOut;

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    landmarkerRef.current?.close();
    landmarkerRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    pinchedRef.current = false;
    setPinched(false);
    setHandSeen(false);
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (!enabled) {
      stop();
      return;
    }

    let cancelled = false;

    const start = async () => {
      setStatus("loading");
      setError(null);
      try {
        const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
        const vision = await FilesetResolver.forVisionTasks(WASM_CDN);
        let landmarker: HandLandmarker;
        try {
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: MODEL_URL,
              delegate: "GPU",
            },
            runningMode: "VIDEO",
            numHands: 1,
            minHandDetectionConfidence: 0.55,
            minHandPresenceConfidence: 0.55,
            minTrackingConfidence: 0.5,
          });
        } catch {
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: MODEL_URL,
              delegate: "CPU",
            },
            runningMode: "VIDEO",
            numHands: 1,
            minHandDetectionConfidence: 0.55,
            minHandPresenceConfidence: 0.55,
            minTrackingConfidence: 0.5,
          });
        }
        if (cancelled) {
          landmarker.close();
          return;
        }
        landmarkerRef.current = landmarker;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          landmarker.close();
          return;
        }
        streamRef.current = stream;

        // Wait a tick so the dock's <video> ref is attached after enable
        let video = videoRef.current;
        for (let i = 0; i < 20 && !video; i++) {
          await new Promise((r) => setTimeout(r, 50));
          video = videoRef.current;
        }
        if (!video) throw new Error("Video element missing");
        video.srcObject = stream;
        await video.play();

        setStatus("ready");

        const loop = () => {
          if (cancelled || !landmarkerRef.current || !videoRef.current) return;
          const v = videoRef.current;
          if (v.readyState >= 2) {
            const now = performance.now();
            const result = landmarkerRef.current.detectForVideo(v, now);
            const landmarks = result.landmarks?.[0];
            const canvas = canvasRef.current;

            if (canvas && v.videoWidth) {
              const ctx = canvas.getContext("2d");
              if (ctx) {
                if (canvas.width !== v.videoWidth || canvas.height !== v.videoHeight) {
                  canvas.width = v.videoWidth;
                  canvas.height = v.videoHeight;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                if (landmarks) {
                  ctx.strokeStyle = "#ffb26b";
                  ctx.fillStyle = "#e84393";
                  ctx.lineWidth = 3;
                  // Draw thumb–index line
                  const t = landmarks[4];
                  const i = landmarks[8];
                  ctx.beginPath();
                  ctx.moveTo(t.x * canvas.width, t.y * canvas.height);
                  ctx.lineTo(i.x * canvas.width, i.y * canvas.height);
                  ctx.stroke();
                  for (const p of [t, i]) {
                    ctx.beginPath();
                    ctx.arc(p.x * canvas.width, p.y * canvas.height, 6, 0, Math.PI * 2);
                    ctx.fill();
                  }
                }
              }
            }

            if (landmarks) {
              setHandSeen(true);
              setStatus("tracking");
              const dist = pinchDistance(landmarks);
              if (!pinchedRef.current && dist < PINCH_IN) {
                pinchedRef.current = true;
                setPinched(true);
              } else if (pinchedRef.current && dist > PINCH_OUT) {
                pinchedRef.current = false;
                setPinched(false);
                if (now - lastFireRef.current > cooldownMs) {
                  lastFireRef.current = now;
                  onPinchOutRef.current?.();
                }
              }
            } else {
              setHandSeen(false);
              if (pinchedRef.current) {
                pinchedRef.current = false;
                setPinched(false);
              }
              setStatus("ready");
            }
          }
          rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
      } catch (e) {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Camera unavailable";
        cancelAnimationFrame(rafRef.current);
        streamRef.current?.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        landmarkerRef.current?.close();
        landmarkerRef.current = null;
        setError(message);
        setStatus("error");
      }
    };

    void start();
    return () => {
      cancelled = true;
      stop();
    };
  }, [enabled, cooldownMs, stop]);

  return { status, error, pinched, handSeen, videoRef, canvasRef, stop };
}
