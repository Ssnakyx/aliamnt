<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleLine1 = ref<HTMLElement | null>(null)
const titleLine2 = ref<HTMLElement | null>(null)
const titleLine3 = ref<HTMLElement | null>(null)
const subtitle    = ref<HTMLElement | null>(null)
const ctaGroup    = ref<HTMLElement | null>(null)
const scrollEl    = ref<HTMLElement | null>(null)
const eyebrow     = ref<HTMLElement | null>(null)
const imgMainEl   = ref<HTMLElement | null>(null)
const imgAEl      = ref<HTMLElement | null>(null)
const imgBEl      = ref<HTMLElement | null>(null)

const ticker = [
  'Diabète', 'Hypertension', 'Obésité', 'Cancer', 'MNT',
  'Prévention', 'Sensibilisation', 'Niger', 'Afrique',
  'Santé Publique', 'Maladies chroniques', 'Mobilisation', 'Éducation',
]

const dots = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 5.73 + 2.1) % 96}%`,
  top: `${(i * 13.17 + 3.4) % 89}%`,
  delay: `${(i * 0.61) % 5}s`,
  dur: `${3.2 + (i % 5) * 0.6}s`,
  size: `${i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5}px`,
}))

/* ── Cycling images ────────────────────────────────────── */
const cycleImages = [
  { src: '/Images/campagne_puff_1.jpg', label: '#NonAuPuff' },
  { src: '/Images/novembre_bleu.jpg',   label: 'Novembre Bleu' },
  { src: '/Images/habitude_3.jpg',      label: 'Habitudes Saines' },
  { src: '/Images/journee_soignants.jpg', label: 'Journée des Soignants' },
  { src: '/Images/octobre_rose.jpg',    label: 'Octobre Rose' },
]
const currentIdx = ref(0)
let cycleTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const lines = [titleLine1.value, titleLine2.value, titleLine3.value].filter(
    (el): el is HTMLElement => el !== null,
  )

  if (eyebrow.value) {
    gsap.fromTo(eyebrow.value, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.7, ease: 'expo.out' })
  }

  gsap.fromTo(lines,
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'expo.out', stagger: 0.15, delay: 0.15 },
  )

  if (subtitle.value) {
    gsap.fromTo(subtitle.value, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.7 })
  }

  if (ctaGroup.value) {
    gsap.fromTo(ctaGroup.value.querySelectorAll('button'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.1, delay: 1.0 },
    )
  }

  if (scrollEl.value) {
    gsap.fromTo(scrollEl.value, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1.4 })
  }

  /* ── Image entrance (opacity only — CSS handles all transforms) ── */
  const imgs = [imgBEl.value, imgAEl.value, imgMainEl.value].filter(Boolean) as HTMLElement[]
  if (imgs.length) {
    gsap.to(imgs, { opacity: 1, duration: 1.1, stagger: 0.22, ease: 'power2.out', delay: 0.55 })
  }

  /* ── Image cycle ── */
  cycleTimer = setInterval(() => {
    currentIdx.value = (currentIdx.value + 1) % cycleImages.length
  }, 4500)
})

onUnmounted(() => {
  if (cycleTimer) clearInterval(cycleTimer)
})
</script>

<template>
  <section class="hero">
    <!-- Ambient background layers -->
    <div class="blob blob--1" aria-hidden="true" />
    <div class="blob blob--2" aria-hidden="true" />
    <div class="blob blob--3" aria-hidden="true" />
    <div class="grain"     aria-hidden="true" />
    <div class="hero-grid" aria-hidden="true" />
    <div class="dots" aria-hidden="true">
      <span
        v-for="(dot, i) in dots" :key="i"
        class="dot"
        :style="{
          left: dot.left, top: dot.top,
          animationDelay: dot.delay, animationDuration: dot.dur,
          width: dot.size, height: dot.size,
        }"
      />
    </div>

    <!-- ── Two-column layout ─────────────────────────── -->
    <div class="hero__inner">

      <!-- Left: content -->
      <div class="hero__content">
        <div ref="eyebrow" class="hero__eyebrow">
          <span class="eyebrow-pulse" aria-hidden="true" />
          <span class="eyebrow-text">Alliance contre les Maladies Non Transmissibles</span>
        </div>

        <h1 class="hero__title" aria-label="La santé, une priorité africaine.">
          <span ref="titleLine1" class="title-line title-line--white">La santé,</span>
          <span ref="titleLine2" class="title-line title-line--white">une priorité</span>
          <span ref="titleLine3" class="title-line title-line--green">africaine.</span>
        </h1>

        <p ref="subtitle" class="hero__subtitle">
          Sensibiliser, éduquer et mobiliser la jeunesse africaine face aux maladies silencieuses.
        </p>

        <div ref="ctaGroup" class="hero__cta">
          <button class="btn btn--primary">
            Découvrir nos actions
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn btn--outline">Rejoindre l'association</button>
          <button class="btn btn--ghost">Faire un don</button>
        </div>
      </div>

      <!-- Right: floating image cluster -->
      <div class="hero__visual" aria-hidden="true">
        <!-- Radial glow behind images -->
        <div class="vis-glow" />

        <!-- Image B — bottom left, slowest float -->
        <div class="vis-img vis-img--b" ref="imgBEl">
          <div class="vis-frame vis-frame--sm">
            <img src="/Images/campagne_puff_2.jpg" alt="" loading="lazy" />
            <div class="vis-overlay" />
          </div>
        </div>

        <!-- Image A — top right, fastest float -->
        <div class="vis-img vis-img--a" ref="imgAEl">
          <div class="vis-frame vis-frame--sm">
            <img src="/Images/habitude_6.jpg" alt="" loading="lazy" />
            <div class="vis-overlay" />
          </div>
        </div>

        <!-- Main image — cycling, largest, centered -->
        <div class="vis-img vis-img--main" ref="imgMainEl">
          <div class="vis-frame vis-frame--main">
            <!-- Cycling images stack -->
            <img
              v-for="(item, i) in cycleImages"
              :key="item.src"
              :src="item.src"
              :class="['cycle-img', { 'is-active': i === currentIdx }]"
              alt=""
              loading="lazy"
            />
            <div class="vis-overlay" />
            <!-- Caption badge -->
            <div class="vis-badge">
              <span class="vis-badge-dot" />
              <span class="vis-badge-text">{{ cycleImages[currentIdx].label }}</span>
            </div>
          </div>
        </div>

        <!-- Cycle indicator dots -->
        <div class="cycle-dots">
          <button
            v-for="(_, i) in cycleImages"
            :key="i"
            :class="['cycle-dot', { 'is-active': i === currentIdx }]"
            @click="currentIdx = i"
          />
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollEl" class="hero__scroll" aria-hidden="true">
      <div class="scroll-track">
        <div class="scroll-thumb" />
      </div>
      <span class="scroll-label">Défiler</span>
    </div>

    <!-- Marquee ticker -->
    <div class="ticker" aria-hidden="true">
      <div class="ticker__track">
        <span v-for="n in 2" :key="n" class="ticker__reel">
          <span v-for="item in ticker" :key="`${n}-${item}`" class="ticker__item">
            {{ item }}<span class="ticker__sep" />
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ─────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--color-bg);
  overflow: hidden;
}

/* ── Inner grid (content + visual) ──────── */
.hero__inner {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: 55% 45%;
  align-items: center;
  padding-top: 80px;
  padding-bottom: 4.5rem;
}

/* ── Blobs ───────────────────────────────── */
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

.blob--1 {
  width: clamp(400px, 60vw, 900px);
  height: clamp(400px, 60vw, 900px);
  top: -20%; left: -15%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.13) 0%, transparent 60%);
  animation: floatBlob1 18s ease-in-out infinite alternate;
}

.blob--2 {
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  bottom: -15%; right: -10%;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.07) 0%, transparent 60%);
  animation: floatBlob2 22s ease-in-out infinite alternate;
}

.blob--3 {
  width: clamp(200px, 35vw, 500px);
  height: clamp(200px, 35vw, 500px);
  top: 35%; right: 8%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.07) 0%, transparent 60%);
  animation: floatBlob2 15s ease-in-out infinite alternate;
}

@keyframes floatBlob1 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(5%, 8%) scale(1.08); }
}
@keyframes floatBlob2 {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-6%, -5%) scale(1.05); }
}

/* ── Grain ───────────────────────────────── */
.grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  background-repeat: repeat;
}

/* ── Grid lines ──────────────────────────── */
.hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image:
    linear-gradient(to right, rgba(65, 145, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(65, 145, 255, 0.04) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 10%, transparent 100%);
}

/* ── Floating dots ───────────────────────── */
.dots {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background: var(--color-green);
  animation: dotFloat var(--dur, 4s) ease-in-out var(--delay, 0s) infinite alternate;
  opacity: 0.2;
}

@keyframes dotFloat {
  0%   { transform: translateY(0) scale(1); opacity: 0.12; }
  50%  { transform: translateY(-14px) scale(1.3); opacity: 0.32; }
  100% { transform: translateY(4px) scale(0.85); opacity: 0.08; }
}

/* ── Content (left column) ───────────────── */
.hero__content {
  padding-left: clamp(2rem, 8vw, 8rem);
  padding-right: 2rem;
}

/* ── Eyebrow ─────────────────────────────── */
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1.75rem;
}

.eyebrow-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-green);
  position: relative;
  flex-shrink: 0;
}

.eyebrow-pulse::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 1px solid var(--color-green);
  animation: pulseRing 2.5s ease-in-out infinite;
  opacity: 0;
}

@keyframes pulseRing {
  0%   { transform: scale(0.8); opacity: 0.7; }
  100% { transform: scale(2.6); opacity: 0; }
}

.eyebrow-text {
  font-family: var(--font-mono);
  font-size: 0.67rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-gray);
}

/* ── Title ───────────────────────────────── */
.hero__title {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

.title-line {
  display: block;
  font-family: var(--font-playfair);
  font-size: clamp(3rem, 6.5vw, 6.5rem);
  will-change: clip-path;
}

.title-line--white { color: var(--color-white); }
.title-line--green { color: var(--color-green); font-style: italic; }

/* ── Subtitle ────────────────────────────── */
.hero__subtitle {
  font-family: var(--font-dm);
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  color: var(--color-gray-light);
  max-width: 440px;
  margin-top: 1.5rem;
  line-height: 1.65;
}

/* ── CTA ─────────────────────────────────── */
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  margin-top: 2.5rem;
}

.btn {
  font-family: var(--font-dm);
  font-weight: 500;
  font-size: 0.92rem;
  padding: 0.75rem 1.6rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s, background-color 0.25s, color 0.25s, border-color 0.25s;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn--primary { background-color: var(--color-green); color: #07101E; font-weight: 600; }
.btn--primary:hover { transform: scale(1.04) translateY(-1px); box-shadow: 0 8px 32px rgba(65, 145, 255, 0.4); }
.btn--primary svg { transition: transform 0.3s var(--ease-expo); }
.btn--primary:hover svg { transform: translate(2px, -2px); }

.btn--outline { background: transparent; color: var(--color-green); border: 1.5px solid rgba(65, 145, 255, 0.35); }
.btn--outline:hover { background: rgba(65, 145, 255, 0.08); border-color: var(--color-green); transform: translateY(-1px); }

.btn--ghost { background: transparent; color: var(--color-gray); border: 1.5px solid transparent; }
.btn--ghost:hover { color: var(--color-white); border-color: rgba(255,255,255,0.1); transform: translateY(-1px); }

/* ── Visual (right column) ───────────────── */
.hero__visual {
  position: relative;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Gradient fade blending left edge of visual into content */
.hero__visual::before {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 100px;
  background: linear-gradient(to right, var(--color-bg), transparent);
  z-index: 5;
  pointer-events: none;
}

.vis-glow {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.10) 0%, transparent 70%);
  pointer-events: none;
  animation: glowPulse 5s ease-in-out infinite alternate;
}

@keyframes glowPulse {
  from { transform: scale(0.9); opacity: 0.6; }
  to   { transform: scale(1.1); opacity: 1; }
}

/* ── Image wrappers ──────────────────────── */
.vis-img {
  position: absolute;
  opacity: 0; /* GSAP fades in */
}

/* Main — centered, largest, cycles, gentle slow float */
.vis-img--main {
  top: 50%;
  left: 46%;
  animation: floatMain 5s ease-in-out infinite alternate;
}

/* A — top right, smaller, fast float */
.vis-img--a {
  top: 8%;
  right: 6%;
  animation: floatA 3.5s ease-in-out 0.8s infinite alternate;
}

/* B — bottom left, smallest, slowest float */
.vis-img--b {
  bottom: 12%;
  left: 5%;
  animation: floatB 6.5s ease-in-out 1.5s infinite alternate;
}

/* Float keyframes — rotation baked in so CSS transform doesn't conflict */
@keyframes floatMain {
  0%   { transform: translate(-50%, -50%) rotate(-3deg) translateY(0px); }
  100% { transform: translate(-50%, -50%) rotate(-3deg) translateY(-22px); }
}

@keyframes floatA {
  0%   { transform: rotate(6deg) translateY(0px); }
  100% { transform: rotate(6deg) translateY(-14px); }
}

@keyframes floatB {
  0%   { transform: rotate(-8deg) translateY(0px); }
  100% { transform: rotate(-8deg) translateY(-18px); }
}

/* ── Frames ──────────────────────────────── */
.vis-frame {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.vis-frame--main {
  width: 248px;
  height: 336px;
}

.vis-frame--sm {
  width: 150px;
  height: 198px;
}

.vis-frame img,
.cycle-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Cycling images (stack) */
.cycle-img {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s ease;
}

.cycle-img.is-active { opacity: 1; }

.vis-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 45%, rgba(7, 16, 30, 0.55) 100%);
  pointer-events: none;
  z-index: 1;
}

/* ── Caption badge ───────────────────────── */
.vis-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(7, 16, 30, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(65, 145, 255, 0.18);
  border-radius: 9999px;
  padding: 0.35rem 0.75rem;
}

.vis-badge-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-green);
  flex-shrink: 0;
  animation: badgeDot 2s ease-in-out infinite;
}

@keyframes badgeDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.75); }
}

.vis-badge-text {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: opacity 0.4s;
}

/* ── Cycle indicator dots ────────────────── */
.cycle-dots {
  position: absolute;
  bottom: -28px;
  left: 46%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 3;
}

.cycle-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-gray);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.3s, transform 0.3s;
}

.cycle-dot.is-active {
  background: var(--color-green);
  transform: scale(1.4);
}

/* ── Scroll line indicator ───────────────── */
.hero__scroll {
  position: absolute;
  bottom: 5.5rem;
  left: clamp(2rem, 8vw, 8rem);
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.scroll-track {
  width: 1.5px;
  height: 44px;
  background: rgba(65, 145, 255, 0.18);
  border-radius: 9999px;
  position: relative;
  overflow: hidden;
}

.scroll-thumb {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40%;
  background: var(--color-green);
  border-radius: 9999px;
  animation: scrollSlide 2.2s ease-in-out infinite;
}

@keyframes scrollSlide {
  0%   { top: 0; opacity: 1; }
  55%  { top: 60%; opacity: 1; }
  85%  { top: 60%; opacity: 0; }
  86%  { top: 0; opacity: 0; }
  100% { top: 0; opacity: 1; }
}

.scroll-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-gray);
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}

/* ── Marquee ticker ──────────────────────── */
.ticker {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  overflow: hidden;
  z-index: 3;
  padding: 1.1rem 0;
  border-top: 1px solid rgba(65, 145, 255, 0.07);
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.ticker__track {
  display: flex;
  width: max-content;
  animation: marquee 38s linear infinite;
}

.ticker__track:hover { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.ticker__reel { display: flex; align-items: center; }

.ticker__item {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  font-family: var(--font-mono);
  font-size: 0.63rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gray);
  white-space: nowrap;
  padding: 0 0.4rem;
  transition: color 0.2s;
  cursor: default;
}

.ticker__item:hover { color: var(--color-sand); }

.ticker__sep {
  display: inline-block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--color-green);
  opacity: 0.35;
  flex-shrink: 0;
}

/* ── Responsive ──────────────────────────── */
@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    padding-bottom: 5rem;
  }

  .hero__visual {
    display: none;
  }

  .title-line {
    font-size: clamp(3rem, 10vw, 5rem);
  }
}

@media (max-width: 640px) {
  .hero__cta { flex-direction: column; align-items: flex-start; }
  .hero__scroll { display: none; }
  .ticker__item { font-size: 0.58rem; }
}
</style>
