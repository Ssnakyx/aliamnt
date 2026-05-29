<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HabitudeCard {
  src: string
  alt: string
}

const cards: HabitudeCard[] = [
  {
    src: '/Images/habitude_1.jpg',
    alt: 'ALIAMNT te parle : Certaines habitudes toxiques sont devenues normales chez les jeunes.',
  },
  {
    src: '/Images/habitude_2.jpg',
    alt: "S'endormir à 2h ou 3h en scrollant sur TikTok",
  },
  {
    src: '/Images/habitude_3.jpg',
    alt: 'Boire des boissons énergisantes pour tenir pendant les cours',
  },
  {
    src: '/Images/habitude_4.jpg',
    alt: "Être constamment fatigué et penser que c'est normal",
  },
  {
    src: '/Images/habitude_5.jpg',
    alt: 'Passer toute la journée assis sur les réseaux sociaux sans activité physique',
  },
  {
    src: '/Images/habitude_6.jpg',
    alt: 'La santé ne se détruit pas en un jour - les petites habitudes font la différence',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const carouselRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])

function setCardRef(el: HTMLElement | null, index: number): void {
  if (el) cardRefs.value[index] = el
}

function scrollPrev(): void {
  if (!carouselRef.value) return
  carouselRef.value.scrollBy({ left: -300, behavior: 'smooth' })
}

function scrollNext(): void {
  if (!carouselRef.value) return
  carouselRef.value.scrollBy({ left: 300, behavior: 'smooth' })
}

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    if (cardRefs.value.length > 0) {
      gsap.fromTo(
        cardRefs.value,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: carouselRef.value,
            start: 'top 80%',
            once: true,
          },
        },
      )
    }
  }, sectionRef.value ?? undefined)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section ref="sectionRef" class="habitudes" aria-labelledby="habitudes-title">
    <!-- Background accent blob -->
    <div class="habitudes__blob" aria-hidden="true" />

    <div class="habitudes__container">
      <!-- Header -->
      <header class="habitudes__header">
        <span class="habitudes__label">ALIAMNT TE PARLE</span>
        <h2 id="habitudes-title" class="habitudes__title">
          Ces habitudes qui détruisent ta santé
          <em>en silence</em>
        </h2>
        <p class="habitudes__subtitle">
          6 réalités que la jeunesse africaine vit chaque jour sans en mesurer les conséquences.
        </p>
      </header>

      <!-- Carousel wrapper -->
      <div class="habitudes__carousel-wrapper">
        <!-- Prev button -->
        <button
          class="habitudes__nav habitudes__nav--prev"
          aria-label="Post précédent"
          @click="scrollPrev"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M13 4l-6 6 6 6"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Cards track -->
        <div ref="carouselRef" class="habitudes__track" role="list">
          <article
            v-for="(card, i) in cards"
            :key="card.src"
            :ref="(el) => setCardRef(el as HTMLElement | null, i)"
            class="habitudes__card"
            role="listitem"
          >
            <img :src="card.src" :alt="card.alt" class="habitudes__img" loading="lazy" />
            <div class="habitudes__overlay" aria-hidden="true" />
          </article>
        </div>

        <!-- Next button -->
        <button
          class="habitudes__nav habitudes__nav--next"
          aria-label="Post suivant"
          @click="scrollNext"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M7 4l6 6-6 6"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- CTA -->
      <div class="habitudes__cta-wrapper">
        <a
          href="https://www.instagram.com/aliamnt_"
          target="_blank"
          rel="noopener noreferrer"
          class="habitudes__cta"
          aria-label="Voir nos publications Instagram (ouvre dans un nouvel onglet)"
        >
          <!-- Instagram icon -->
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              stroke="currentColor"
              stroke-width="1.75"
            />
            <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
          Voir nos publications Instagram
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.habitudes {
  position: relative;
  background-color: var(--color-bg);
  padding: clamp(5rem, 9vw, 9rem) 0;
  overflow: hidden;
}

/* ── Background accent ── */
.habitudes__blob {
  position: absolute;
  top: -10%;
  right: -20%;
  width: clamp(400px, 55vw, 800px);
  height: clamp(400px, 55vw, 800px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.07) 0%, transparent 65%);
  pointer-events: none;
}

/* ── Container ── */
.habitudes__container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

/* ── Header ── */
.habitudes__header {
  margin-bottom: 3.5rem;
}

.habitudes__label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #4191ff;
  margin-bottom: 1rem;
}

.habitudes__title {
  font-family: var(--font-playfair);
  font-size: clamp(2.25rem, 4.5vw, 4rem);
  font-weight: 800;
  color: var(--color-white);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
}

.habitudes__title em {
  font-style: italic;
  color: #4191ff;
}

.habitudes__subtitle {
  font-family: var(--font-dm);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: var(--color-gray);
  max-width: 560px;
  line-height: 1.65;
  margin: 0;
}

/* ── Carousel wrapper ── */
.habitudes__carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* ── Nav buttons ── */
.habitudes__nav {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(65, 145, 255, 0.3);
  background-color: var(--color-surface);
  color: #4191ff;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s var(--ease-expo);
  z-index: 2;
}

.habitudes__nav:hover {
  background-color: rgba(65, 145, 255, 0.15);
  border-color: #4191ff;
  transform: scale(1.08);
}

.habitudes__nav:focus-visible {
  outline: 2px solid #4191ff;
  outline-offset: 3px;
}

/* ── Scrollable track ── */
.habitudes__track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0.5rem 0;
  flex: 1;
  min-width: 0;
}

.habitudes__track::-webkit-scrollbar {
  display: none;
}

/* ── Card ── */
.habitudes__card {
  position: relative;
  flex-shrink: 0;
  width: 280px;
  aspect-ratio: 3 / 4;
  border-radius: 16px;
  overflow: hidden;
  scroll-snap-align: start;
  cursor: pointer;
  transition:
    transform 0.35s var(--ease-expo),
    box-shadow 0.35s var(--ease-expo);
  will-change: transform;
}

.habitudes__card:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(65, 145, 255, 0.25);
}

/* ── Image ── */
.habitudes__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s var(--ease-expo);
}

.habitudes__card:hover .habitudes__img {
  transform: scale(1.04);
}

/* ── Gradient overlay ── */
.habitudes__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 30%, rgba(7, 16, 30, 0.85) 100%);
  pointer-events: none;
}

/* ── CTA ── */
.habitudes__cta-wrapper {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.habitudes__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-dm);
  font-size: 1rem;
  font-weight: 500;
  color: #4191ff;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.habitudes__cta:hover {
  opacity: 0.7;
}

.habitudes__cta:focus-visible {
  outline: 2px solid #4191ff;
  outline-offset: 4px;
  border-radius: 4px;
}

/* ── Responsive: hide nav buttons on mobile ── */
@media (max-width: 640px) {
  .habitudes__nav {
    display: none;
  }

  .habitudes__track {
    padding: 0.5rem clamp(1.5rem, 5vw, 4rem);
    /* Bleed to edges on mobile */
    margin: 0 calc(-1 * clamp(1.5rem, 5vw, 4rem));
  }
}
</style>
