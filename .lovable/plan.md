
# For Tanay — 25 & Magical 🎁

A one-page, cinematic warm-sunset site where Tanay uses **real webcam hand gestures** to unlock 25 surprises made from your words, then falls into a memories + playlist + full-letter finale.

## Page flow

**1. Landing** — animated sunset gradient, drifting embers, kinetic title:
*"Happy 25th, Naik Ji"* with a soft subtitle *"from your girl"*. Two buttons: **Turn on camera to begin** and **Skip camera / tap instead** (so it never breaks if he denies permission).

**2. Gesture onboarding (10s)** — live webcam with a hand-skeleton overlay so he *sees* it working:
- ✋ **Open palm** → unwrap the next surprise
- 🤏 **Pinch** (thumb + index) → pop a balloon
- 👋 **Wave** → shuffle to a random one

**3. The 25 surprises** — a floating scene mixing 🎁 boxes, ✉️ envelopes, 🎈 balloons. Each opens with confetti + soft chime + one of your reasons. Progress dots track 1/25 → 25/25. He can also click/tap any surprise as a fallback.

I'll turn your writing into **25 polished cards** using your voice — light touch on punctuation/rhythm only, no rewrites. Draft split:

| # | Type | Content (source: your message) |
|---|---|---|
| 1 | ✉️ Long | "Since you entered my life it has been beautiful…" (opening letter) |
| 2 | 🎁 Short | Always there — as friend, son, brother, boyfriend |
| 3 | 🎈 Short | Our house feels so empty without you |
| 4 | 🎁 Short | The way you throw the trash, bring milk, fetch things — never complaining |
| 5 | ✉️ Med | You never say no. You make sacrifices and don't make them count |
| 6 | 🎁 Short | I always feel protected and safe around you |
| 7 | ✉️ Med | The way you work on yourself — better for me, better for us |
| 8 | 🎁 Short | The way you love and live |
| 9 | ✉️ Med | My biggest cheerleader — how you support my dreams |
| 10 | 🎈 Short | Your loyalty — you never look at any other girl |
| 11 | 🎁 Short | Your smell instantly feels like home |
| 12 | ✉️ Med | The way you control your anger, stay patient, can't see me hurt |
| 13 | 🎁 Short | You watch every favourite show of mine like it's yours |
| 14 | 🎈 Short | You sip coffee instead of chai now (hehe) |
| 15 | 🎁 Short | The way you listen to my gyan |
| 16 | ✉️ Med | You respect my choices and always put me first |
| 17 | 🎁 Short | Weekend dates, no matter how busy |
| 18 | 🎈 Short | Your cutie pattootie blush smile |
| 19 | 🎁 Short | You remember the little things that matter to me |
| 20 | ✉️ Med | We're best friends — favourite person to talk, laugh, hang with |
| 21 | 🎁 Short | Your gentle, caring side (only I see) |
| 22 | ✉️ Med | We can talk through anything |
| 23 | 🎁 Short | You bring out the best in me |
| 24 | 🎈 Short | You always make time for us |
| 25 | ✉️ Long | *"Just you. I love everything about being yours."* (finale card) |

**4. Our Bangalore chapter** — after all 25, a horizontal parallax scroll of your 3 moments:
- HSR first date, board games, hours together — *your happy place*
- Watching Lockup + a meal you cooked together
- Feeling safe getting drunk with you
Each paired with photos from your uploads.

**5. Songs that are us** — 4 embedded Spotify tracks (the links you shared) laid out as glowing vinyl-style cards he can play right there.

**6. The finale** — a full-screen love letter with slow parallax photo backdrop, your opening paragraph in a bigger serif, then a **"Make a wish"** candle he blows out via mic input (or clicks) → confetti burst → your closing line signed *"— your girl, forever"* + date.

## Design

- **Palette:** `#ff6b35` `#f7931e` `#e84393` `#6c5ce7` on a deep plum background, cream text
- **Fonts:** *Fraunces* (romantic display serif) + *Plus Jakarta Sans* (body)
- **Motion:** Framer Motion springs; canvas-confetti bursts on unwrap; continuous ember particles; ambient sunset gradient shift
- **Photos:** all 8 uploads used across boxes, envelopes, Bangalore section, and finale (uploaded to Lovable Assets CDN for fast load)

## Technical

- **Hand tracking:** MediaPipe Tasks Vision (`@mediapipe/tasks-vision`) — runs 100% in his browser, no server, no data leaves his device. Detects open palm, pinch (thumb-index distance), wave (horizontal velocity). ~8MB model lazy-loads only after "Turn on camera" so initial page is snappy.
- **Fallback:** every gesture has click/tap equivalent so a phone or no-camera device still gets the full experience.
- **Stack:** existing TanStack Start + React + Tailwind + Framer Motion + canvas-confetti. No backend needed.
- **Hosting:** publish to a public `naik-ji-25.lovable.app` link once you approve — text him the link on the day. No password (keeps it frictionless; can add one later if you want).

## Content I still need from you (optional, we can ship without)

- ✅ Reasons & letter — got them
- ✅ Bangalore moments — got them
- ✅ Playlist — got 4 songs
- 🟡 His actual birth date (for the finale signature) — otherwise I'll just sign it "your girl"
- 🟡 Anything else you want to add before publishing (a nickname line, one inside joke)

## Build order (so you see progress fast)

1. Landing + sunset ambient scene + palette + fonts
2. Webcam permission + MediaPipe wired up + gesture tutorial with live skeleton
3. 25-surprise scene with your polished content already loaded
4. Bangalore memories + Spotify playlist section
5. Finale letter + wish-candle + confetti ending
6. Upload your 8 photos to CDN and place them across sections
7. Polish timing, publish, give you the link

Approve this and I'll start building — you'll see the sunset landing come alive first, then everything else stacks on top.
