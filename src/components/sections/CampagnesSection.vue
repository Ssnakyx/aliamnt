<template>
  <section class="camp-section" ref="sectionEl">
    <div class="container">

      <!-- Header -->
      <header class="sect-head" ref="headEl">
        <span class="sect-label">NOS CAMPAGNES</span>
        <div class="head-row">
          <h2 class="sect-title">L'impact sur <em>le terrain</em></h2>
          <RouterLink to="/campagnes" class="sect-all">
            Voir tout
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </header>

      <!-- Apple-style 3-column cards -->
      <div class="cards-grid" ref="cardsEl">

        <!-- Card 0 — dark featured -->
        <RouterLink to="/campagnes" class="acard acard--dark">
          <div class="acard-text">
            <span class="acard-tag" style="color: #1AE05A">Viral</span>
            <h3 class="acard-title">#NonAuPuff</h3>
            <p class="acard-sub">La jeunesse africaine dit non aux cigarettes électroniques.</p>
            <div class="acard-stat">
              <span class="stat-num">890K</span>
              <span class="stat-lbl">personnes touchées</span>
            </div>
          </div>
          <div class="acard-art">
            <img src="/Images/campagne_puff_1.jpg" alt="Campagne #NonAuPuff — La jeunesse africaine dit non aux cigarettes électroniques" loading="lazy" />
          </div>
          <div class="card-glare" aria-hidden="true" />
        </RouterLink>

        <!-- Card 1 — medium -->
        <RouterLink to="/campagnes" class="acard acard--mid">
          <div class="acard-text">
            <span class="acard-tag" style="color: #FF6B6B">Dépistage</span>
            <h3 class="acard-title">Novembre Bleu</h3>
            <p class="acard-sub">Tous unis contre le cancer de la prostate. Movember, mois de sensibilisation.</p>
            <div class="acard-stat">
              <span class="stat-num">127K</span>
              <span class="stat-lbl">personnes touchées</span>
            </div>
          </div>
          <div class="acard-art">
            <img src="/Images/novembre_bleu.jpg" alt="Novembre Bleu — Sensibilisation au cancer de la prostate" loading="lazy" />
          </div>
          <div class="card-glare" aria-hidden="true" />
        </RouterLink>

        <!-- Card 2 — medium -->
        <RouterLink to="/campagnes" class="acard acard--mid">
          <div class="acard-text">
            <span class="acard-tag" style="color: #93C5FD">Éducation</span>
            <h3 class="acard-title">ALIAMNT t'explique</h3>
            <p class="acard-sub">Notre série pédagogique pour comprendre et prévenir les MNT.</p>
            <div class="acard-stat">
              <span class="stat-num">54K</span>
              <span class="stat-lbl">personnes touchées</span>
            </div>
          </div>
          <div class="acard-art">
            <img src="/Images/aliamnt_explique_1.jpg" alt="ALIAMNT t'explique — Série pédagogique sur les maladies non transmissibles" loading="lazy" />
          </div>
          <div class="card-glare" aria-hidden="true" />
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
import { useTilt } from '@/composables/useTilt'

gsap.registerPlugin(ScrollTrigger)

const sectionEl = ref<HTMLElement | null>(null)
const headEl    = ref<HTMLElement | null>(null)
const cardsEl   = ref<HTMLElement | null>(null)

useTilt(cardsEl, '.acard')

onMounted(() => {
  if (headEl.value) {
    gsap.fromTo(headEl.value.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: headEl.value, start: 'top 82%', once: true } }
    )
  }
  if (cardsEl.value) {
    const cards = cardsEl.value.querySelectorAll('.acard')
    gsap.fromTo(cards,
      { opacity: 0, y: 44, scale: 0.97, filter: 'blur(10px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'power3.out',
        clearProps: 'filter,transform',
        scrollTrigger: { trigger: cardsEl.value, start: 'top 80%', once: true } }
    )
  }
})
</script>

<style scoped>
.camp-section {
  background: var(--color-bg);
  padding: clamp(6rem, 10vw, 10.5rem) 0;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 3rem);
}

/* ── Header ──────────────────────────────── */
.sect-head { margin-bottom: clamp(2.5rem, 4vw, 4rem); }

.sect-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  color: var(--color-green);
  display: block;
  margin-bottom: 1rem;
}

.head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
}

.sect-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.25rem, 4.5vw, 4rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin: 0;
}
.sect-title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.sect-all {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-dm);
  font-size: 0.85rem;
  color: var(--color-gray);
  white-space: nowrap;
  padding-bottom: 0.25rem;
  transition: color 0.25s;
}
.sect-all:hover { color: var(--color-green); }

/* ── Apple grid ──────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

/* ── Card base ───────────────────────────── */
.acard {
  border: 1px solid var(--color-border-subtle);
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 520px;
  text-decoration: none;
  transition: transform 0.4s var(--ease-expo), box-shadow 0.4s;
  position: relative;
}

.acard:hover {
  transform: translateY(-6px) scale(1.005);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}

/* Card variants */
.acard--dark {
  background: #07101E;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
}
.acard--mid {
  background: var(--color-surface);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
}

/* ── Text block ──────────────────────────── */
.acard-text {
  padding: 2rem 2rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.acard-tag {
  font-family: var(--font-dm);
  font-size: 0.82rem;
  font-weight: 500;
  display: block;
  margin-bottom: 0.6rem;
}

.acard-title {
  font-family: var(--font-playfair);
  font-size: clamp(1.35rem, 1.8vw, 1.75rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin: 0 0 0.6rem;
}

.acard-sub {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray-light);
  line-height: 1.6;
  margin: 0 0 1rem;
}

/* Stat — the "price" equivalent */
.acard-stat {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.stat-num {
  font-family: var(--font-mono);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
}

.stat-lbl {
  font-family: var(--font-dm);
  font-size: 0.8rem;
  color: var(--color-gray);
}

/* ── Art block ───────────────────────────── */
.acard-art {
  flex: 1;
  min-height: 220px;
  overflow: hidden;
  position: relative;
}

.acard-art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.6s ease;
}

.acard:hover .acard-art img {
  transform: scale(1.04);
}

/* ── Glare ───────────────────────────────── */
.card-glare {
  position: absolute;
  inset: 0;
  border-radius: 28px;
  pointer-events: none;
  z-index: 4;
  opacity: 0;
  transition: opacity 0.3s;
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.875rem;
  }
  .acard:last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .cards-grid { grid-template-columns: 1fr; }
  .acard:last-child { grid-column: auto; }
  .acard { min-height: 420px; }
}
</style>
