import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHOTOS = [
  "/photos/p1.jpg",
  "/photos/p2.jpg",
  "/photos/p3.jpg",
  "/photos/p4.jpg",
  "/photos/p5.jpg",
  "/photos/p6.jpg",
  "/photos/p7.jpg",
  "/photos/p8.jpg",
];

type Reason = { icon: string; title: string; body: string };

const REASONS: Reason[] = [
  { icon: "💌", title: "Since you entered my life", body: "It has been beautiful. Despite seeing worst days with you, the happy ones are too happy to ever leave your side." },
  { icon: "🫂", title: "Always there", body: "As a friend, a son, a brother, and a boyfriend — no matter what comes your way, you show up." },
  { icon: "🏠", title: "Our house feels empty without you", body: "You are the sound and the softness of home." },
  { icon: "🛒", title: "The little errands", body: "The way you go down to throw the trash or bring milk or fetch anything — never once complaining." },
  { icon: "🤍", title: "You never say no", body: "You make sacrifices for us, and you don't make them count." },
  { icon: "🛡️", title: "Safe with you", body: "I always feel protected around you. Always." },
  { icon: "🌱", title: "Better for us", body: "The way you never say no to working on yourself — always trying to be better for me, for us." },
  { icon: "✨", title: "The way you love and live", body: "Fully. Softly. Like it's the only way you know how." },
  { icon: "📣", title: "My biggest cheerleader", body: "You back my dreams louder than I do sometimes. You believe first." },
  { icon: "💍", title: "Loyal, always", body: "The way you never look at any other girl — I have your loyalty, and it is quiet and huge." },
  { icon: "🌸", title: "You smell like home", body: "One breath of you and I'm instantly there." },
  { icon: "🌊", title: "Patient with me", body: "The way you try to control your anger, stay patient, and cannot bear to see me cry or hurt." },
  { icon: "📺", title: "Every favourite show of mine", body: "You watch them like they were always yours." },
  { icon: "☕", title: "Coffee over chai (hehe)", body: "You sip coffee now instead of chai — like it was always your first preference. (Now it kind of is.)" },
  { icon: "🗣️", title: "The way you listen to my gyan", body: "Full attention. Zero eye-rolls. Every time." },
  { icon: "👑", title: "You put me first", body: "You respect my choices and I feel it in the everyday, not just the big things." },
  { icon: "📅", title: "Every weekend, a date", body: "No matter how busy the week is, you plan for us." },
  { icon: "😊", title: "Your cutie pattootie blush", body: "That little smile when you blush makes me love you even more, every time." },
  { icon: "🔍", title: "The little things", body: "You remember details that matter to me — the ones I forget I told you." },
  { icon: "👯", title: "Best friends", body: "You're my favourite person to talk to, laugh with, and just be around." },
  { icon: "🕊️", title: "Your gentle side", body: "The soft, caring one you show me — I know that's just for us." },
  { icon: "💬", title: "We can talk through anything", body: "No matter how hard the conversation, we find our way to each other." },
  { icon: "🌟", title: "You bring out the best in me", body: "You push me to grow. You make me want to be better." },
  { icon: "⏳", title: "Time, always for us", body: "Even when life is chaotic, you make room for our relationship." },
  { icon: "💖", title: "Just you", body: "Quite simply — I just love everything about being yours." },
];

const MOMENTS = [
  {
    title: "Fun movie dates",
    body: "Fun Movie dates—the ones where we cry, sometimes get a little naughty, and mostly just cuddle.",
    photo: PHOTOS[4],
  },
  {
    title: "Our gyoza date",
    body: "Our gyoza date holds our cutest moments together. That was the year you made my birthday feel like something straight out of a Disney movie.",
    photo: PHOTOS[3],
  },
  {
    title: "Udaipur",
    body: "Udaipur lives in my head rent-free. Those gorgeous sunsets and you... honestly, what else could I even ask for?",
    photo: PHOTOS[5],
  },
  {
    title: "Safe, even tipsy",
    body: "I feel so safe getting drunk with you. That's rarer than people think.",
    photo: PHOTOS[7],
  },
];

const SONGS = [
  "3vCzLB6kS2lGcIpm1OOUsy",
  "3phw912iJRhtMfsdJ1k3Sr",
  "5OMUXgfXsSukZ0zxelpC3b",
  "59alvnjzlbX6LaHhXGDZYv",
];

function burstConfetti(x = 0.5, y = 0.6) {
  const colors = ["#ff6b35", "#f7931e", "#e84393", "#f6c453", "#ffd6e0", "#6c5ce7"];
  confetti({ particleCount: 90, spread: 75, origin: { x, y }, colors, scalar: 1.05, ticks: 220 });
  setTimeout(() => confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors }), 120);
  setTimeout(() => confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors }), 200);
}

function Ember({ i }: { i: number }) {
  const left = (i * 53) % 100;
  const delay = (i * 0.7) % 6;
  const dur = 8 + ((i * 3) % 8);
  const size = 3 + (i % 5);
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full"
      style={{
        left: `${left}%`,
        bottom: -20,
        width: size,
        height: size,
        background: "radial-gradient(circle, #ffd28a 0%, #ff6b35 60%, transparent 70%)",
        filter: "blur(0.5px)",
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: -900, opacity: [0, 0.9, 0.6, 0], x: [0, 10, -8, 6, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(1200px 700px at 50% 10%, #ff8a3d33, transparent 60%), radial-gradient(900px 600px at 80% 90%, #e8439333, transparent 60%), linear-gradient(180deg, #1a0b1f 0%, #2b0f2f 60%, #3a1330 100%)" }} />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => <Ember key={i} i={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-4 text-xs uppercase tracking-[0.4em] text-amber-200/80"
      >
        A tiny love letter · 18.07
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
        className="font-serif text-6xl leading-[0.95] tracking-tight text-amber-50 sm:text-7xl md:text-8xl"
        style={{ fontFamily: "Fraunces, serif" }}
      >
        Happy <span className="italic" style={{ background: "linear-gradient(90deg,#ffb26b,#ff6b35,#e84393)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>25th</span>,
        <br />
        Naik Ji
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="mt-6 max-w-md text-lg text-amber-100/80"
      >
        25 reasons you're a gem, a few of our moments, our songs — and a letter waiting at the end. From your girl.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        onClick={() => {
          burstConfetti(0.5, 0.5);
          onStart();
        }}
        className="mt-10 rounded-full px-8 py-4 text-base font-semibold text-white shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(135deg,#ff6b35,#e84393)", boxShadow: "0 20px 60px -20px #e8439399" }}
      >
        Unwrap your day →
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 flex flex-col items-center text-xs uppercase tracking-widest text-amber-100/60"
      >
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="mt-2 h-6 w-px bg-amber-100/40" />
      </motion.div>
    </section>
  );
}

function ReasonCard({ r, i, opened, onOpen }: { r: Reason; i: number; opened: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const handle = () => {
    if (!opened) {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        burstConfetti((rect.left + rect.width / 2) / window.innerWidth, (rect.top + rect.height / 2) / window.innerHeight);
      } else {
        burstConfetti();
      }
    }
    onOpen();
  };
  return (
    <motion.button
      ref={ref}
      onClick={handle}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-3xl text-left"
      style={{
        background: opened
          ? "linear-gradient(160deg, #2a0f2c 0%, #3a1738 100%)"
          : "linear-gradient(160deg, #ff6b35 0%, #e84393 100%)",
        boxShadow: opened
          ? "0 20px 60px -30px #e8439366, inset 0 0 0 1px #ffffff15"
          : "0 20px 40px -20px #ff6b3566, inset 0 0 0 1px #ffffff30",
      }}
    >
      {/* Ribbon on closed state */}
      {!opened && (
        <>
          <div className="absolute inset-y-0 left-1/2 w-4 -translate-x-1/2" style={{ background: "linear-gradient(180deg,#ffd28a,#ffb26b)" }} />
          <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2" style={{ background: "linear-gradient(90deg,#ffd28a,#ffb26b)" }} />
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: "radial-gradient(circle,#fff2c8,#ffb26b)" }} />
        </>
      )}
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-black/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            {String(i + 1).padStart(2, "0")} / 25
          </span>
          <span className="text-3xl drop-shadow">{r.icon}</span>
        </div>
        <AnimatePresence mode="wait">
          {opened ? (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="font-serif text-2xl leading-tight text-amber-50" style={{ fontFamily: "Fraunces, serif" }}>
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-amber-100/80">{r.body}</p>
            </motion.div>
          ) : (
            <motion.div key="closed" exit={{ opacity: 0 }} className="text-white/95">
              <div className="font-serif text-xl italic" style={{ fontFamily: "Fraunces, serif" }}>tap to unwrap</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-white/70">reason #{i + 1}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

function ReasonsGrid() {
  const [opened, setOpened] = useState<Set<number>>(new Set());
  const openedCount = opened.size;

  const openAll = () => {
    setOpened(new Set(REASONS.map((_, i) => i)));
    burstConfetti(0.5, 0.4);
    setTimeout(() => burstConfetti(0.2, 0.5), 200);
    setTimeout(() => burstConfetti(0.8, 0.5), 400);
  };

  return (
    <section className="relative px-4 py-24 sm:px-8" id="reasons">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">Chapter One</div>
          <h2 className="mt-3 font-serif text-5xl text-amber-50 sm:text-6xl" style={{ fontFamily: "Fraunces, serif" }}>
            25 reasons you're <span className="italic" style={{ color: "#ffb26b" }}>my gem</span>
          </h2>
          <p className="mt-4 max-w-lg text-amber-100/70">Tap each little gift. One reason for every year of you.</p>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg,#ff6b35,#e84393)" }}
                animate={{ width: `${(openedCount / 25) * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-100/70">
              {openedCount}/25
            </span>
          </div>
          {openedCount < 25 && (
            <button onClick={openAll} className="mt-4 text-xs uppercase tracking-widest text-amber-100/50 underline underline-offset-4 hover:text-amber-100">
              or open them all
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {REASONS.map((r, i) => (
            <ReasonCard
              key={i}
              r={r}
              i={i}
              opened={opened.has(i)}
              onOpen={() =>
                setOpened((s) => {
                  const n = new Set(s);
                  n.add(i);
                  return n;
                })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Moments() {
  return (
    <section className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">Chapter Two</div>
          <h2 className="mt-3 font-serif text-5xl text-amber-50 sm:text-6xl" style={{ fontFamily: "Fraunces, serif" }}>
            Our Special Moments
          </h2>
          <p className="mt-4 text-amber-100/70">Tiny moments I keep re-reading in my head.</p>
        </div>
        <div className="space-y-16">
          {MOMENTS.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col items-center gap-8 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="relative w-full md:w-1/2">
                <div className="absolute -inset-3 rounded-3xl" style={{ background: "linear-gradient(135deg,#ff6b3555,#e8439355)", filter: "blur(30px)" }} />
                <motion.img
                  whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? -1 : 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  src={m.photo}
                  alt={m.title}
                  className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Moment {String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 font-serif text-4xl text-amber-50 sm:text-5xl" style={{ fontFamily: "Fraunces, serif" }}>{m.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-amber-100/80">{m.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Songs() {
  return (
    <section className="relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">Chapter Three</div>
          <h2 className="mt-3 font-serif text-5xl text-amber-50 sm:text-6xl" style={{ fontFamily: "Fraunces, serif" }}>
            Songs that are <span className="italic" style={{ color: "#ffb26b" }}>us</span>
          </h2>
          <p className="mt-4 text-amber-100/70">Press play. I dare you not to smile.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SONGS.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl bg-white/5 p-2 backdrop-blur"
              style={{ boxShadow: "inset 0 0 0 1px #ffffff10" }}
            >
              <iframe
                title={`song-${id}`}
                src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoStrip() {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="flex gap-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex shrink-0 gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {[...PHOTOS, ...PHOTOS].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-56 w-40 shrink-0 rounded-2xl object-cover shadow-xl sm:h-72 sm:w-56"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 2}deg)` }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Finale() {
  const [wished, setWished] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const blowCandle = () => {
    setWished(true);
    burstConfetti(0.5, 0.4);
    setTimeout(() => burstConfetti(0.3, 0.5), 200);
    setTimeout(() => burstConfetti(0.7, 0.5), 400);
    setTimeout(() => burstConfetti(0.5, 0.3), 600);
  };

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-8">
      <motion.img
        src={PHOTOS[7]}
        alt=""
        style={{ y }}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg,#1a0b1fee,#2b0f2fee)" }} />

      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs uppercase tracking-[0.4em] text-amber-200/70">Finale</div>
        <h2 className="mt-3 font-serif text-5xl text-amber-50 sm:text-6xl" style={{ fontFamily: "Fraunces, serif" }}>
          One <span className="italic" style={{ color: "#ffb26b" }}>wish</span>, from me
        </h2>

        <div className="mx-auto mt-10 flex flex-col items-center">
          <motion.button
            onClick={blowCandle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-32 w-16 flex-col items-center justify-end"
            aria-label="Blow the candle"
          >
            {/* flame */}
            <AnimatePresence>
              {!wished && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0.9, 1.05, 0.95, 1], y: [0, -2, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="absolute -top-2 h-8 w-5 rounded-full"
                  style={{ background: "radial-gradient(circle at 50% 70%, #fff2c8, #ffb26b 40%, #ff6b35 70%, transparent 80%)", filter: "blur(0.5px)" }}
                />
              )}
            </AnimatePresence>
            {/* candle */}
            <div className="h-24 w-6 rounded-t-md" style={{ background: "linear-gradient(180deg,#ffd28a,#e84393)" }} />
          </motion.button>
          <p className="mt-4 text-sm uppercase tracking-widest text-amber-100/60">
            {wished ? "wish made ✨" : "tap the candle"}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur sm:p-12"
        >
          <p className="font-serif text-2xl italic leading-relaxed text-amber-50 sm:text-3xl" style={{ fontFamily: "Fraunces, serif" }}>
            Tanay,
          </p>
          <p className="mt-6 font-serif text-lg leading-relaxed text-amber-100/90 sm:text-xl" style={{ fontFamily: "Fraunces, serif" }}>
            I love you more than you'll ever know. Honestly, Bangalore didn't feel like home for a single day without you. But now that you are here, every single moment has become special. No matter how mundane Mondays feel, your morning coffee makes them so much better. No matter how shitty my work day has been, one hug from you and dinner together makes it all completely melt away.
          </p>
          <p className="mt-4 text-base leading-relaxed text-amber-100/80">
            You have given so much more purpose to my life. I know I can be hard to handle sometimes—I'm a total pain in the ass, and on my luteal days, I am frankly unbearable! But you never leave. I have always been scared that people wouldn't stay, which made me stop pouring my heart out to anyone. But then you came into my life and never gave up on me. You stayed through it all.
          </p>
          <p className="mt-4 text-base leading-relaxed text-amber-100/80">
            It's easy to forgive someone when they apologize, but you have this beautiful habit of forgiving things I don't even acknowledge sometimes, just to ensure I don't feel bad or upset. You consistently put your pride and ego aside for us, and I see that. I appreciate you, and I am deeply grateful for you every single day of my life.
          </p>
          <p className="mt-4 text-base leading-relaxed text-amber-100/80">
            Yes, I fully plan to spend the next 100 years of my life making you apologize for things you didn't even do (haha!), but there's no one else I'd rather tease. On this 25th birthday, all the way until our 50s and way beyond, I want to celebrate every single birthday and every big win right by your side.
          </p>
          <p className="mt-8 text-right font-serif text-base italic text-amber-200/80" style={{ fontFamily: "Fraunces, serif" }}>
            — your girl, forever · 25/25 🤍
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Index() {
  const [started, setStarted] = useState(false);
  const reasonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (started) {
      setTimeout(() => reasonsRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [started]);

  const bg = useMemo(
    () => ({
      background:
        "radial-gradient(1000px 700px at 20% 10%, #ff6b3522, transparent 60%), radial-gradient(900px 600px at 90% 60%, #e8439322, transparent 60%), linear-gradient(180deg,#150818 0%, #1e0a22 40%, #2a0f2c 100%)",
    }),
    []
  );

  return (
    <main className="min-h-screen font-sans text-amber-50" style={{ ...bg, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Landing onStart={() => setStarted(true)} />
      <div ref={reasonsRef}>
        <ReasonsGrid />
      </div>
      <PhotoStrip />
      <Moments />
      <Songs />
      <Finale />
      <footer className="px-4 pb-12 pt-6 text-center text-xs uppercase tracking-[0.3em] text-amber-100/40">
        made with 🤍 · for tanay · 18.07
      </footer>
    </main>
  );
}
