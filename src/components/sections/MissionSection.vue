<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Pilier {
  number: string
  titre: string
  description: string
  icone: 'megaphone' | 'book' | 'network'
  tag: string
}

const piliers: Pilier[] = [
  {
    number: '01',
    titre: 'Sensibiliser',
    description: 'Informer et conscientiser sur les risques des maladies chroniques en Afrique à travers des campagnes terrain et digitales accessibles à tous.',
    icone: 'megaphone',
    tag: 'Terrain & Digital',
  },
  {
    number: '02',
    titre: 'Éduquer',
    description: 'Fournir des outils et ressources pour comprendre et prévenir les MNT, adaptés aux réalités et cultures africaines.',
    icone: 'book',
    tag: 'Ressources & Outils',
  },
  {
    number: '03',
    titre: 'Mobiliser',
    description: "Créer des réseaux d'action locale et nationale pour la santé publique en fédérant communautés, soignants et décideurs.",
    icone: 'network',
    tag: 'Communautés & Réseaux',
  },
]

const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionEl.value) return

  gsap.fromTo(
    sectionEl.value.querySelectorAll('.mission__header > *'),
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1,
      scrollTrigger: { trigger: sectionEl.value, start: 'top 80%', once: true },
    },
  )

  sectionEl.value.querySelectorAll('.pilier-row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, x: -28 },
      {
        opacity: 1, x: 0, duration: 0.75, ease: 'expo.out', delay: i * 0.1,
        scrollTrigger: { trigger: row, start: 'top 88%', once: true },
      },
    )
  })
})
</script>

<template>
  <section ref="sectionEl" class="mission">
    <div class="mission__container">
      <!-- Header -->
      <div class="mission__header">
        <span class="section-label">Notre Mission</span>
        <h2 class="mission__title">Trois piliers pour<br><em>un avenir sain</em></h2>
      </div>

      <!-- Editorial rows -->
      <div class="mission__rows">
        <article
          v-for="pilier in piliers"
          :key="pilier.number"
          class="pilier-row"
        >
          <div class="pilier-row__num">
            <span class="pilier-num">{{ pilier.number }}</span>
          </div>

          <div class="pilier-row__content">
            <div class="pilier-row__head">
              <h3 class="pilier-title">{{ pilier.titre }}</h3>
              <span class="pilier-tag">{{ pilier.tag }}</span>
            </div>
            <p class="pilier-desc">{{ pilier.description }}</p>
          </div>

          <div class="pilier-row__icon">
            <div class="pilier-icon-box">
              <!-- Megaphone -->
              <template v-if="pilier.icone === 'megaphone'">
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path d="M30 8L10 16.5H6a2 2 0 00-2 2v3a2 2 0 002 2h4l3 8h3l-1-8 14 8.5V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M34 10c2 2.5 2 7.5 0 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </template>
              <!-- Book -->
              <template v-else-if="pilier.icone === 'book'">
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <path d="M6 8h12c3.314 0 6 2.686 6 6v16c0-3.314-2.686-6-6-6H6V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M34 8H22c-3.314 0-6 2.686-6 6v16c0-3.314 2.686-6 6-6h12V8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M20 14v16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </template>
              <!-- Network -->
              <template v-else-if="pilier.icone === 'network'">
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="14" r="4" stroke="currentColor" stroke-width="2"/>
                  <circle cx="8" cy="30" r="3.5" stroke="currentColor" stroke-width="2"/>
                  <circle cx="32" cy="30" r="3.5" stroke="currentColor" stroke-width="2"/>
                  <path d="M20 18c0 4-5 6-8 8.5M20 18c0 4 5 6 8 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M11 30h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>
                </svg>
              </template>
            </div>
          </div>
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
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}

/* ── Header ── */
.mission__header {
  margin-bottom: clamp(3rem, 6vw, 5rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-label {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-green);
}

.mission__title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: var(--color-white);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 0;
}

.mission__title em {
  font-style: italic;
  color: var(--color-green);
}

/* ── Rows ── */
.mission__rows {
  display: flex;
  flex-direction: column;
}

.pilier-row {
  display: grid;
  grid-template-columns: 52px 1fr 68px;
  align-items: center;
  gap: 2rem;
  padding: 2.25rem 0;
  border-top: 1px solid var(--color-border-subtle);
  position: relative;
  cursor: default;
  transition: padding-left 0.45s var(--ease-expo);
  will-change: opacity, transform;
}

.pilier-row:last-child {
  border-bottom: 1px solid var(--color-border-subtle);
}

/* Blue left accent line */
.pilier-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-green);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.45s var(--ease-expo);
}

.pilier-row:hover::before {
  transform: scaleY(1);
}

.pilier-row:hover {
  padding-left: 1.25rem;
}

/* ── Number ── */
.pilier-row__num {
  display: flex;
  align-items: flex-start;
  padding-top: 0.2rem;
}

.pilier-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--color-gray);
  line-height: 1;
  transition: color 0.3s;
}

.pilier-row:hover .pilier-num {
  color: var(--color-green);
}

/* ── Content ── */
.pilier-row__content {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.pilier-row__head {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}

.pilier-title {
  font-family: var(--font-playfair);
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: var(--color-white);
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.pilier-tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-green);
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.4s var(--ease-expo), transform 0.4s var(--ease-expo);
}

.pilier-row:hover .pilier-tag {
  opacity: 1;
  transform: translateX(0);
}

.pilier-desc {
  font-family: var(--font-dm);
  font-size: 0.93rem;
  color: var(--color-gray);
  line-height: 1.75;
  margin: 0;
  max-width: 520px;
}

/* ── Icon ── */
.pilier-row__icon {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.pilier-icon-box {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-gray);
  transition:
    background 0.35s,
    color 0.35s,
    border-color 0.35s,
    transform 0.45s var(--ease-expo),
    box-shadow 0.35s;
}

.pilier-row:hover .pilier-icon-box {
  background: rgba(65, 145, 255, 0.1);
  color: var(--color-green);
  border-color: rgba(65, 145, 255, 0.25);
  transform: rotate(-5deg) scale(1.1);
  box-shadow: 0 0 20px rgba(65, 145, 255, 0.18);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .pilier-row {
    grid-template-columns: 40px 1fr;
    gap: 1.25rem;
  }

  .pilier-row__icon { display: none; }

  .pilier-row:hover { padding-left: 0.75rem; }
}
</style>
