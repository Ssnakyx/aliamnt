<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Data ────────────────────────────────────────────────────────────────────
interface Pilier {
  number: string
  titre: string
  description: string
  icone: 'megaphone' | 'book' | 'network'
}

const piliers: Pilier[] = [
  {
    number: '01',
    titre: 'Sensibiliser',
    description:
      'Informer et conscientiser sur les risques des maladies chroniques en Afrique à travers des campagnes terrain et digitales accessibles à tous.',
    icone: 'megaphone',
  },
  {
    number: '02',
    titre: 'Éduquer',
    description:
      'Fournir des outils et ressources pour comprendre et prévenir les MNT, adaptés aux réalités et cultures africaines.',
    icone: 'book',
  },
  {
    number: '03',
    titre: 'Mobiliser',
    description:
      "Créer des réseaux d'action locale et nationale pour la santé publique en fédérant communautés, soignants et décideurs.",
    icone: 'network',
  },
]

// ── Refs ────────────────────────────────────────────────────────────────────
const sectionEl = ref<HTMLElement | null>(null)
const headerLabel = ref<HTMLElement | null>(null)
const headerTitle = ref<HTMLElement | null>(null)
const headerSubtitle = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionEl.value) return

  // Header reveal
  const headerEls = [headerLabel.value, headerTitle.value, headerSubtitle.value].filter(
    (el): el is HTMLElement => el !== null,
  )

  gsap.fromTo(
    headerEls,
    { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    {
      clipPath: 'inset(0 0 0% 0)',
      opacity: 1,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top 80%',
        once: true,
      },
    },
  )

  // Cards reveal
  const cards = sectionEl.value.querySelectorAll<HTMLElement>('.pilier-card')
  gsap.fromTo(
    cards,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionEl.value.querySelector('.mission__grid'),
        start: 'top 85%',
        once: true,
      },
    },
  )
})
</script>

<template>
  <section ref="sectionEl" class="mission">
    <div class="mission__container">
      <!-- Section header -->
      <div class="mission__header">
        <span ref="headerLabel" class="section-label">Notre Mission</span>
        <h2 ref="headerTitle" class="mission__title">Trois piliers pour un avenir sain</h2>
        <p ref="headerSubtitle" class="mission__subtitle">
          Une association engagée pour transformer la santé publique africaine par l'action
          collective et la transmission du savoir.
        </p>
      </div>

      <!-- Piliers grid -->
      <div class="mission__grid">
        <article
          v-for="pilier in piliers"
          :key="pilier.number"
          class="pilier-card"
        >
          <div class="pilier-card__top">
            <!-- Icon -->
            <span class="pilier-card__icon">
              <!-- Megaphone -->
              <template v-if="pilier.icone === 'megaphone'">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M30 8L10 16.5H6a2 2 0 00-2 2v3a2 2 0 002 2h4l3 8h3l-1-8 14 8.5V8z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34 10c2 2.5 2 7.5 0 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </template>

              <!-- Book -->
              <template v-else-if="pilier.icone === 'book'">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 8h12c3.314 0 6 2.686 6 6v16c0-3.314-2.686-6-6-6H6V8z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M34 8H22c-3.314 0-6 2.686-6 6v16c0-3.314 2.686-6 6-6h12V8z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20 14v16"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </template>

              <!-- Network / people connected -->
              <template v-else-if="pilier.icone === 'network'">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="20" cy="14" r="4" stroke="currentColor" stroke-width="2" />
                  <circle cx="8" cy="30" r="3.5" stroke="currentColor" stroke-width="2" />
                  <circle cx="32" cy="30" r="3.5" stroke="currentColor" stroke-width="2" />
                  <path
                    d="M20 18c0 4-5 6-8 8.5M20 18c0 4 5 6 8 8.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M11 30h18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-dasharray="3 3"
                  />
                </svg>
              </template>
            </span>

            <!-- Number -->
            <span class="pilier-card__number">{{ pilier.number }}</span>
          </div>

          <h3 class="pilier-card__title">{{ pilier.titre }}</h3>
          <p class="pilier-card__description">{{ pilier.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission {
  background-color: var(--color-bg);
  padding-block: clamp(5rem, 8vw, 8rem);
}

.mission__container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}

/* ── Header ── */
.mission__header {
  max-width: 640px;
  margin-bottom: clamp(3rem, 5vw, 5rem);
}

.section-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-green);
  will-change: clip-path, opacity;
}

.mission__title {
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 3.5rem);
  color: var(--color-white);
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin: 0.75rem 0 0;
  will-change: clip-path, opacity;
}

.mission__subtitle {
  font-family: var(--font-dm);
  font-size: 1rem;
  color: var(--color-gray);
  max-width: 500px;
  line-height: 1.7;
  margin: 0.75rem 0 0;
  will-change: clip-path, opacity;
}

/* ── Grid ── */
.mission__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.25rem, 3vw, 2rem);
}

/* ── Card ── */
.pilier-card {
  background-color: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(26, 224, 90, 0.08);
  transition:
    border-color 0.3s ease,
    transform 0.35s var(--ease-expo),
    box-shadow 0.35s var(--ease-expo);
  will-change: opacity, transform;
}

.pilier-card:hover {
  border-color: rgba(26, 224, 90, 0.3);
  transform: translateY(-4px);
  box-shadow: var(--shadow-green-sm);
}

.pilier-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.pilier-card__icon {
  display: flex;
  color: var(--color-green);
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.pilier-card__number {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-gray);
  letter-spacing: 0.05em;
}

.pilier-card__title {
  font-family: var(--font-playfair);
  font-size: 1.375rem;
  color: var(--color-white);
  margin: 1.5rem 0 0;
  line-height: 1.25;
}

.pilier-card__description {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray);
  margin: 0.75rem 0 0;
  line-height: 1.7;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .mission__grid {
    grid-template-columns: 1fr;
    max-width: 520px;
  }
}
</style>
