<template>
  <section ref="sectionEl" class="maladies-section">
    <div class="container">

      <!-- Header -->
      <div class="sect-head" ref="headEl">
        <div class="head-row">
          <span class="sect-label">NOS MALADIES CIBLES</span>
          <RouterLink to="/maladies" class="sect-all">
            Voir tout
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
        <h2 class="sect-title"><em>9</em> maladies, une seule mission.</h2>
        <p class="sect-sub">Des pathologies silencieuses qui ravagent le continent. Nous les nommons pour mieux les combattre.</p>
      </div>

      <!-- Apple-style card grid -->
      <div class="grid" ref="gridEl">
        <RouterLink
          v-for="maladie in maladies"
          :key="maladie.id"
          :to="`/maladies/${maladie.slug}`"
          class="mcard"
          :style="{ '--c': maladie.couleur }"
        >
          <!-- Visual area — colored gradient + icon -->
          <div class="mcard-visual">
            <div class="mcard-glow" aria-hidden="true" />
            <div class="mcard-icon" v-html="iconMap[maladie.icone]" aria-hidden="true" />
          </div>

          <!-- Text area -->
          <div class="mcard-body">
            <h3 class="mcard-name">{{ maladie.nom }}</h3>
            <p class="mcard-desc">{{ maladie.accroche }}</p>
          </div>

          <!-- Arrow -->
          <div class="mcard-footer">
            <span class="mcard-arrow" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </div>
        </RouterLink>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { maladies } from '@/data/maladies'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref<HTMLElement | null>(null)
const headEl    = ref<HTMLElement | null>(null)
const gridEl    = ref<HTMLElement | null>(null)

/* ── SVG icon map ──────────────────────────────────────── */
const iconMap: Record<string, string> = {
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>`,
  drop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
  </svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>`,
  ribbon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M12 12 8.5 20l3.5-2 3.5 2L12 12z"/>
  </svg>`,
  smoke: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 12H3v3h15v-3z"/>
    <path d="M18 8c0-2.5 2-2.5 2-5"/>
    <path d="M21 8c0-2.5 2-2.5 2-5"/>
    <line x1="3" y1="3" x2="21" y2="21"/>
  </svg>`,
  mind: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="9" r="5"/>
    <path d="M12 14v7"/>
    <path d="M9 18h6"/>
    <path d="M8 7c0-1 .5-2 1.5-2.5"/>
    <path d="M14.5 5.5C16 6.2 16.5 7.5 16 9"/>
  </svg>`,
  cell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <circle cx="5" cy="7" r="2"/>
    <circle cx="19" cy="7" r="2"/>
    <circle cx="5" cy="17" r="2"/>
    <circle cx="19" cy="17" r="2"/>
    <line x1="7" y1="8" x2="10" y2="10.5"/>
    <line x1="17" y1="8" x2="14" y2="10.5"/>
    <line x1="7" y1="16" x2="10" y2="13.5"/>
    <line x1="17" y1="16" x2="14" y2="13.5"/>
  </svg>`,
  scale: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 3v18"/>
    <path d="M5 21h14"/>
    <path d="M5 6l-2 5c0 1.66 2 3 4 3s4-1.34 4-3L9 6H5z"/>
    <path d="M19 6l-2 5c0 1.66 2 3 4 3s4-1.34 4-3l-2-5h-4z"/>
    <path d="M5 6h4M15 6h4"/>
  </svg>`,
  heartbeat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="3 12 6 12 8 6 10 18 12 10 14 14 16 12 21 12"/>
  </svg>`,
}

onMounted(() => {
  if (headEl.value) {
    gsap.fromTo([...headEl.value.children],
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: headEl.value, start: 'top 82%', once: true } }
    )
  }
  if (gridEl.value) {
    const cards = gridEl.value.querySelectorAll('.mcard')
    gsap.fromTo(cards,
      { opacity: 0, y: 32, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06, ease: 'expo.out',
        scrollTrigger: { trigger: gridEl.value, start: 'top 78%', once: true } }
    )
  }
})
</script>

<style scoped>
.maladies-section {
  background: var(--color-surface);
  padding: clamp(5rem, 9vw, 9rem) 0;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 3rem);
}

/* ── Header ──────────────────────────────── */
.sect-head { margin-bottom: clamp(2.5rem, 4vw, 4rem); }

.head-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sect-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  color: var(--color-green);
}

.sect-all {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-dm);
  font-size: 0.8rem;
  color: var(--color-gray);
  transition: color 0.25s;
}
.sect-all:hover { color: var(--color-green); }

.sect-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.25rem, 4.5vw, 4rem);
  font-weight: 800;
  color: var(--color-white);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 0 0 0.85rem;
}
.sect-title em { font-style: normal; color: var(--color-green); }

.sect-sub {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray);
  max-width: 480px;
  line-height: 1.75;
  margin: 0;
}

/* ── Grid ────────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* ── Card ────────────────────────────────── */
.mcard {
  background: var(--color-bg);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s var(--ease-expo), box-shadow 0.4s;
  position: relative;
}

.mcard:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45),
              0 0 0 1px color-mix(in srgb, var(--c) 30%, transparent);
}

/* ── Visual top area ─────────────────────── */
.mcard-visual {
  position: relative;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.mcard-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 60%,
    color-mix(in srgb, var(--c) 18%, transparent) 0%,
    color-mix(in srgb, var(--c) 6%, transparent) 55%,
    transparent 100%);
  transition: opacity 0.4s;
}
.mcard:hover .mcard-glow {
  background: radial-gradient(ellipse at 50% 60%,
    color-mix(in srgb, var(--c) 26%, transparent) 0%,
    color-mix(in srgb, var(--c) 10%, transparent) 55%,
    transparent 100%);
}

.mcard-icon {
  position: relative;
  z-index: 1;
  width: 56px;
  height: 56px;
  color: var(--c);
  filter: drop-shadow(0 0 12px color-mix(in srgb, var(--c) 40%, transparent));
  transition: transform 0.4s var(--ease-expo), filter 0.4s;
}
.mcard-icon :deep(svg) {
  width: 56px;
  height: 56px;
  display: block;
}
.mcard:hover .mcard-icon {
  transform: scale(1.12) translateY(-3px);
  filter: drop-shadow(0 0 20px color-mix(in srgb, var(--c) 60%, transparent));
}

/* ── Text area ───────────────────────────── */
.mcard-body {
  padding: 1.25rem 1.5rem 0.5rem;
  flex: 1;
}

.mcard-name {
  font-family: var(--font-playfair);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.01em;
  margin: 0 0 0.4rem;
  line-height: 1.2;
}

.mcard-desc {
  font-family: var(--font-dm);
  font-size: 0.8rem;
  color: var(--color-gray);
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Footer arrow ────────────────────────── */
.mcard-footer {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  justify-content: flex-end;
}

.mcard-arrow {
  color: var(--color-gray);
  display: flex;
  align-items: center;
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 0.3s, color 0.3s, transform 0.3s var(--ease-expo);
}
.mcard:hover .mcard-arrow {
  opacity: 1;
  color: var(--c);
  transform: translate(0, 0);
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .grid { grid-template-columns: 1fr; }
  .mcard-visual { height: 120px; }
}
</style>
