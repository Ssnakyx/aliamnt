<template>
  <main v-if="maladie" class="maladie-detail" :style="{ '--accent': maladie.couleur }">

    <!-- ── Hero thématisé ─────────────────────────── -->
    <section class="detail-hero">
      <div class="hero-glow" aria-hidden="true" />
      <div class="container">
        <nav class="breadcrumb" aria-label="Fil d'Ariane">
          <RouterLink to="/maladies" class="breadcrumb__link">Maladies</RouterLink>
          <span class="breadcrumb__sep" aria-hidden="true">/</span>
          <span class="breadcrumb__current">{{ maladie.nom }}</span>
        </nav>

        <div class="hero-grid">
          <div class="hero-content">
            <span class="hero-cat">{{ maladie.categorie }}</span>
            <h1 class="detail-title">{{ maladie.nom }}</h1>
            <p class="detail-accroche">{{ maladie.accroche }}</p>
            <p class="detail-desc">{{ maladie.description }}</p>
          </div>

          <div class="hero-visual" aria-hidden="true">
            <div class="hero-icon-frame">
              <span class="hero-icon" v-html="iconesMaladies[maladie.icone]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Chiffre clé ────────────────────────────── -->
    <section class="stat-band">
      <div class="container stat-band__inner">
        <span class="stat-band__label">Chiffre clé · Afrique</span>
        <p class="stat-band__text">{{ maladie.statistiquesAfrique }}</p>
      </div>
    </section>

    <!-- ── Corps ──────────────────────────────────── -->
    <section class="detail-body">
      <div class="container">
        <div class="info-grid" v-reveal.children>
          <!-- Causes -->
          <div class="info-card">
            <div class="info-card__head">
              <span class="info-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/>
                </svg>
              </span>
              <h2>Causes principales</h2>
            </div>
            <ul class="info-list">
              <li v-for="cause in maladie.causes" :key="cause">{{ cause }}</li>
            </ul>
          </div>

          <!-- Symptômes -->
          <div class="info-card">
            <div class="info-card__head">
              <span class="info-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 12 6 12 8 6 10 18 12 10 14 14 16 12 21 12"/>
                </svg>
              </span>
              <h2>Symptômes</h2>
            </div>
            <ul class="info-list">
              <li v-for="symptome in maladie.symptomes" :key="symptome">{{ symptome }}</li>
            </ul>
          </div>

          <!-- Prévention -->
          <div class="info-card info-card--prevention">
            <div class="info-card__head">
              <span class="info-card__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3L4 6.5v5C4 15.4 7.6 19.8 12 21c4.4-1.2 8-5.6 8-9.5v-5L12 3z"/><path d="M9 12l2 2 4-4"/>
                </svg>
              </span>
              <h2>Prévention</h2>
            </div>
            <ul class="info-list info-list--check">
              <li v-for="prev in maladie.prevention" :key="prev">{{ prev }}</li>
            </ul>
          </div>
        </div>

        <!-- Mythes vs Réalités -->
        <div class="mythes-section">
          <h2 class="mythes-heading">Idées reçues <em>vs</em> réalité</h2>
          <div class="mythes-grid" v-reveal.children>
            <div class="myth-card" v-for="mythe in maladie.mythes" :key="mythe.mythe">
              <div class="myth-half myth-half--myth">
                <span class="myth-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                  Mythe
                </span>
                <p class="myth-text">« {{ mythe.mythe }} »</p>
              </div>
              <div class="myth-half myth-half--reality">
                <span class="reality-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Réalité
                </span>
                <p class="reality-text">{{ mythe.realite }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Test Santé -->
        <div class="detail-cta" v-reveal>
          <div class="detail-cta__text">
            <h2>Et toi, où en es-tu ?</h2>
            <p>Évalue ton exposition aux maladies non transmissibles en 3 minutes — anonyme et gratuit.</p>
          </div>
          <RouterLink to="/evaluation" class="detail-cta__btn">
            Faire le Test Santé
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Navigation prev/next ───────────────────── -->
    <nav class="detail-nav" aria-label="Autres maladies">
      <RouterLink
        :to="`/maladies/${prevMaladie.slug}`"
        class="detail-nav__item detail-nav__item--prev"
        :style="{ '--nav-accent': prevMaladie.couleur }"
      >
        <span class="detail-nav__dir">← Précédent</span>
        <span class="detail-nav__name">{{ prevMaladie.nom }}</span>
      </RouterLink>
      <RouterLink to="/maladies" class="detail-nav__all" aria-label="Toutes les maladies">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
          <rect x="11" y="2" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
          <rect x="2" y="11" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
          <rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4"/>
        </svg>
      </RouterLink>
      <RouterLink
        :to="`/maladies/${nextMaladie.slug}`"
        class="detail-nav__item detail-nav__item--next"
        :style="{ '--nav-accent': nextMaladie.couleur }"
      >
        <span class="detail-nav__dir">Suivant →</span>
        <span class="detail-nav__name">{{ nextMaladie.nom }}</span>
      </RouterLink>
    </nav>
  </main>

  <!-- ── Introuvable ──────────────────────────────── -->
  <main v-else class="not-found">
    <p class="not-found__title">Maladie introuvable.</p>
    <p class="not-found__text">Le lien est peut-être erroné — toutes nos fiches sont ici :</p>
    <RouterLink to="/maladies" class="not-found__btn">Voir les 9 maladies</RouterLink>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import gsap from 'gsap'
import { maladies } from '@/data/maladies'
import { iconesMaladies } from '@/data/icones'

const route = useRoute()

const index = computed(() => maladies.findIndex(m => m.slug === route.params.slug))
const maladie = computed(() => (index.value >= 0 ? maladies[index.value] : undefined))

const prevMaladie = computed(
  () => maladies[(index.value - 1 + maladies.length) % maladies.length],
)
const nextMaladie = computed(() => maladies[(index.value + 1) % maladies.length])

onMounted(() => {
  if (!maladie.value) return
  gsap.fromTo(
    ['.breadcrumb', '.hero-cat', '.detail-title', '.detail-accroche', '.detail-desc'],
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: 'expo.out' },
  )
  gsap.fromTo(
    '.hero-icon-frame',
    { opacity: 0, scale: 0.88, rotate: -6 },
    { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: 'expo.out', delay: 0.25 },
  )
})
</script>

<style scoped>
.maladie-detail {
  min-height: 100vh;
  padding-top: 80px;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 3rem);
}

/* ── Hero ─────────────────────────────────── */
.detail-hero {
  position: relative;
  padding: clamp(3.5rem, 7vw, 6.5rem) 0 clamp(3rem, 5vw, 5rem);
  background: var(--color-surface);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  top: -30%;
  right: -10%;
  width: clamp(300px, 45vw, 640px);
  height: clamp(300px, 45vw, 640px);
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 13%, transparent) 0%, transparent 65%);
  pointer-events: none;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.breadcrumb__link {
  color: var(--color-gray);
  text-decoration: none;
  transition: color 0.25s;
}
.breadcrumb__link:hover { color: var(--color-green); }

.breadcrumb__sep { color: var(--color-gray); opacity: 0.5; }
.breadcrumb__current { color: var(--accent); }

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
}

.hero-cat {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 9%, transparent);
  border-radius: 9999px;
  padding: 0.4rem 0.9rem;
  margin-bottom: 1.25rem;
}

.detail-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.75rem, 6.5vw, 5.5rem);
  color: var(--color-white);
  letter-spacing: -0.025em;
  line-height: 1.04;
  margin: 0;
}

.detail-accroche {
  font-family: var(--font-dm);
  font-size: clamp(1.1rem, 2vw, 1.35rem);
  color: var(--color-gray-light);
  margin: 1.25rem 0 0;
  max-width: 560px;
  line-height: 1.55;
  font-weight: 500;
}

.detail-desc {
  font-family: var(--font-dm);
  font-size: 0.98rem;
  color: var(--color-gray);
  margin: 1.25rem 0 0;
  max-width: 600px;
  line-height: 1.8;
}

.hero-visual { display: flex; align-items: center; }

.hero-icon-frame {
  width: clamp(150px, 16vw, 210px);
  height: clamp(150px, 16vw, 210px);
  border-radius: 28px;
  background: color-mix(in srgb, var(--accent) 8%, var(--color-bg));
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  box-shadow: 0 0 60px color-mix(in srgb, var(--accent) 18%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-icon {
  width: 52%;
  height: 52%;
  color: var(--accent);
  filter: drop-shadow(0 0 16px color-mix(in srgb, var(--accent) 50%, transparent));
}

.hero-icon :deep(svg) { width: 100%; height: 100%; }

/* ── Bande chiffre clé ────────────────────── */
.stat-band {
  background: color-mix(in srgb, var(--accent) 7%, var(--color-bg));
  border-bottom: 1px solid var(--color-border-subtle);
}

.stat-band__inner {
  display: flex;
  align-items: baseline;
  gap: 2rem;
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
  flex-wrap: wrap;
}

.stat-band__label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  white-space: nowrap;
}

.stat-band__text {
  font-family: var(--font-playfair);
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: var(--color-white);
  margin: 0;
  line-height: 1.45;
  flex: 1;
  min-width: 260px;
}

/* ── Corps ────────────────────────────────── */
.detail-body {
  padding: clamp(3.5rem, 6vw, 6rem) 0;
  background: var(--color-bg);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 18px;
  padding: 1.9rem 1.75rem;
}

.info-card--prevention {
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
  background: color-mix(in srgb, var(--accent) 4%, var(--color-surface));
}

.info-card__head {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.4rem;
}

.info-card__icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-card__icon svg { width: 20px; height: 20px; }

.info-card__head h2 {
  font-family: var(--font-playfair);
  font-size: 1.2rem;
  color: var(--color-white);
  margin: 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.info-list li {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-gray-light);
  padding-left: 1.4rem;
  position: relative;
  line-height: 1.55;
}

.info-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.info-list--check li::before { content: '✓'; }

/* ── Mythes ───────────────────────────────── */
.mythes-section { margin-top: clamp(3.5rem, 6vw, 5.5rem); }

.mythes-heading {
  font-family: var(--font-playfair);
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin: 0 0 1.75rem;
}

.mythes-heading em {
  font-style: normal;
  color: var(--accent);
}

.mythes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.myth-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
}

.myth-half { padding: 1.5rem 1.75rem; }

.myth-half--myth {
  background: var(--color-surface);
  border-bottom: 1px dashed var(--color-border-subtle);
}

.myth-half--reality {
  background: color-mix(in srgb, var(--accent) 5%, var(--color-surface));
  flex: 1;
}

.myth-label,
.reality-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.myth-label { color: var(--color-gray); }
.reality-label { color: var(--accent); }

.myth-text {
  font-family: var(--font-playfair);
  font-size: 1rem;
  font-style: italic;
  color: var(--color-white);
  margin: 0.6rem 0 0;
  line-height: 1.5;
}

.reality-text {
  font-family: var(--font-dm);
  font-size: 0.92rem;
  color: var(--color-gray-light);
  margin: 0.6rem 0 0;
  line-height: 1.7;
}

/* ── CTA Test Santé ───────────────────────── */
.detail-cta {
  margin-top: clamp(3.5rem, 6vw, 5.5rem);
  background: linear-gradient(120deg, color-mix(in srgb, var(--accent) 12%, var(--color-surface)) 0%, var(--color-surface) 60%);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  border-radius: 22px;
  padding: clamp(1.75rem, 4vw, 2.75rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.detail-cta__text h2 {
  font-family: var(--font-playfair);
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  color: var(--color-white);
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.detail-cta__text p {
  font-family: var(--font-dm);
  font-size: 0.92rem;
  color: var(--color-gray-light);
  margin: 0;
  max-width: 460px;
  line-height: 1.6;
}

.detail-cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--color-green);
  color: #07101E;
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.85rem 1.9rem;
  border-radius: 9999px;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s;
}

.detail-cta__btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px rgba(65, 145, 255, 0.4);
}

/* ── Prev / Next ──────────────────────────── */
.detail-nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-top: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
}

.detail-nav__item {
  padding: 2rem clamp(1.5rem, 5vw, 3.5rem);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: background 0.3s;
}

.detail-nav__item--next { align-items: flex-end; text-align: right; }

.detail-nav__item:hover {
  background: color-mix(in srgb, var(--nav-accent) 7%, transparent);
}

.detail-nav__dir {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray);
}

.detail-nav__name {
  font-family: var(--font-playfair);
  font-size: clamp(1.05rem, 2vw, 1.4rem);
  font-weight: 700;
  color: var(--color-white);
  transition: color 0.3s;
}

.detail-nav__item:hover .detail-nav__name { color: var(--nav-accent); }

.detail-nav__all {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  color: var(--color-gray);
  border-left: 1px solid var(--color-border-subtle);
  border-right: 1px solid var(--color-border-subtle);
  transition: color 0.3s, background 0.3s;
}

.detail-nav__all:hover {
  color: var(--color-green);
  background: rgba(65, 145, 255, 0.06);
}

/* ── Introuvable ──────────────────────────── */
.not-found {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  padding: 6rem 1.5rem;
}

.not-found__title {
  font-family: var(--font-playfair);
  font-size: 1.75rem;
  color: var(--color-white);
  margin: 0;
}

.not-found__text {
  font-family: var(--font-dm);
  color: var(--color-gray);
  margin: 0;
}

.not-found__btn {
  margin-top: 1.25rem;
  background: var(--color-green);
  color: #07101E;
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.8rem 1.75rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s;
}

.not-found__btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-green-sm);
}

/* ── Responsive ───────────────────────────── */
@media (max-width: 900px) {
  .hero-grid { grid-template-columns: 1fr; }
  .hero-visual { display: none; }
  .info-grid { grid-template-columns: 1fr; }
  .mythes-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .detail-nav { grid-template-columns: 1fr 1fr; }
  .detail-nav__all { display: none; }
  .detail-nav__name { font-size: 0.95rem; }
}
</style>
