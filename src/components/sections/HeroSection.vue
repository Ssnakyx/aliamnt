<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleLine1 = ref<HTMLElement | null>(null)
const titleLine2 = ref<HTMLElement | null>(null)
const titleLine3 = ref<HTMLElement | null>(null)
const subtitle = ref<HTMLElement | null>(null)
const ctaGroup = ref<HTMLElement | null>(null)
const scrollIndicator = ref<HTMLElement | null>(null)

onMounted(() => {
  const lines = [titleLine1.value, titleLine2.value, titleLine3.value].filter(
    (el): el is HTMLElement => el !== null,
  )

  gsap.fromTo(
    lines,
    { clipPath: 'inset(0 0 100% 0)' },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.15,
    },
  )

  if (subtitle.value) {
    gsap.fromTo(
      subtitle.value,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.6 },
    )
  }

  if (ctaGroup.value) {
    const buttons = ctaGroup.value.querySelectorAll('button')
    gsap.fromTo(
      buttons,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', stagger: 0.1, delay: 0.9 },
    )
  }

  if (scrollIndicator.value) {
    gsap.fromTo(
      scrollIndicator.value,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'expo.out', delay: 1.3 },
    )
  }
})
</script>

<template>
  <section class="hero">
    <!-- Mesh gradient blobs -->
    <div class="blob blob--1" aria-hidden="true" />
    <div class="blob blob--2" aria-hidden="true" />

    <!-- Grain texture overlay -->
    <div class="grain" aria-hidden="true" />

    <!-- Main content -->
    <div class="hero__content">
      <h1 class="hero__title" aria-label="La santé, une priorité africaine.">
        <span ref="titleLine1" class="title-line title-line--white">La santé,</span>
        <span ref="titleLine2" class="title-line title-line--white">une priorité</span>
        <span ref="titleLine3" class="title-line title-line--green">africaine.</span>
      </h1>

      <p ref="subtitle" class="hero__subtitle">
        Sensibiliser, éduquer et mobiliser la jeunesse africaine face aux maladies silencieuses.
      </p>

      <div ref="ctaGroup" class="hero__cta">
        <button class="btn btn--primary">Découvrir nos actions</button>
        <button class="btn btn--outline">Rejoindre l'association</button>
        <button class="btn btn--ghost">Faire un don</button>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollIndicator" class="hero__scroll" aria-hidden="true">
      <span class="scroll-label">Défiler</span>
      <svg
        class="scroll-arrow"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3v10M3 9l5 5 5-5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ── Blobs ── */
.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform;
}

.blob--1 {
  width: clamp(400px, 60vw, 900px);
  height: clamp(400px, 60vw, 900px);
  top: -20%;
  left: -15%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.13) 0%, transparent 60%);
  animation: floatBlob1 18s ease-in-out infinite alternate;
}

.blob--2 {
  width: clamp(300px, 50vw, 700px);
  height: clamp(300px, 50vw, 700px);
  bottom: -15%;
  right: -10%;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.07) 0%, transparent 60%);
  animation: floatBlob2 22s ease-in-out infinite alternate;
}

@keyframes floatBlob1 {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(5%, 8%) scale(1.08);
  }
}

@keyframes floatBlob2 {
  from {
    transform: translate(0, 0) scale(1);
  }
  to {
    transform: translate(-6%, -5%) scale(1.05);
  }
}

/* ── Grain ── */
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

/* ── Content ── */
.hero__content {
  position: relative;
  z-index: 2;
  padding-left: clamp(2rem, 8vw, 8rem);
  padding-right: clamp(2rem, 8vw, 8rem);
  max-width: 900px;
}

/* ── Title ── */
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
  font-size: clamp(3.5rem, 8vw, 7rem);
  will-change: clip-path;
}

.title-line--white {
  color: var(--color-white);
}

.title-line--green {
  color: var(--color-green);
  font-style: italic;
}

/* ── Subtitle ── */
.hero__subtitle {
  font-family: var(--font-dm);
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: #9ca3af;
  max-width: 480px;
  margin-top: 1.5rem;
  line-height: 1.6;
}

/* ── CTA ── */
.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn {
  font-family: var(--font-dm);
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition:
    transform 0.25s var(--ease-expo),
    box-shadow 0.25s var(--ease-expo),
    background-color 0.25s ease,
    color 0.25s ease;
  white-space: nowrap;
}

.btn--primary {
  background-color: var(--color-green);
  color: #fff;
  border: 2px solid var(--color-green);
}

.btn--primary:hover {
  transform: scale(1.04);
  box-shadow: var(--shadow-green-md);
}

.btn--outline {
  background-color: transparent;
  color: var(--color-green);
  border: 2px solid var(--color-green);
}

.btn--outline:hover {
  background-color: var(--color-green);
  color: #000;
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-gray);
  border: 2px solid transparent;
}

.btn--ghost:hover {
  color: var(--color-white);
}

/* ── Scroll indicator ── */
.hero__scroll {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-gray);
}

.scroll-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.scroll-arrow {
  animation: pulseDown 1.8s ease-in-out infinite;
}

@keyframes pulseDown {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(5px);
    opacity: 0.4;
  }
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .hero__cta {
    flex-direction: column;
  }

  .btn {
    text-align: center;
  }
}
</style>
