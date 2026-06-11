<template>
  <main class="page-maladies">
    <section class="page-hero">
      <div class="container">
        <span class="page-label">Nos maladies cibles</span>
        <h1 class="page-title">Comprendre pour <em>mieux prévenir</em></h1>
        <p class="page-subtitle">
          Chaque maladie est une bataille. Ensemble, avec la connaissance et la prévention,
          nous pouvons les gagner.
        </p>
      </div>
    </section>

    <section class="maladies-grid-section">
      <div class="container">
        <!-- Filtres -->
        <div class="filters">
          <div class="filter-pills" role="group" aria-label="Filtrer par catégorie">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              class="pill"
              :class="{ 'is-active': activeCat === cat }"
              @click="activeCat = cat"
            >
              {{ cat }}
            </button>
          </div>

          <div class="search-box">
            <svg class="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>
            </svg>
            <input
              v-model="query"
              type="search"
              class="search-input"
              placeholder="Rechercher une maladie…"
              aria-label="Rechercher une maladie"
            />
          </div>
        </div>

        <p class="results-count" role="status">
          {{ filtered.length }} {{ filtered.length > 1 ? 'maladies' : 'maladie' }}
          <template v-if="activeCat !== 'Toutes'"> · {{ activeCat }}</template>
        </p>

        <!-- Grille -->
        <TransitionGroup name="cards" tag="div" class="grid">
          <RouterLink
            v-for="maladie in filtered"
            :key="maladie.id"
            :to="`/maladies/${maladie.slug}`"
            class="maladie-card"
            :style="{ '--accent': maladie.couleur }"
          >
            <div class="card-top">
              <span class="card-icon" v-html="iconesMaladies[maladie.icone]" aria-hidden="true" />
              <span class="card-cat">{{ maladie.categorie }}</span>
            </div>
            <h2 class="card-name">{{ maladie.nom }}</h2>
            <p class="card-accroche">{{ maladie.accroche }}</p>
            <span class="card-stat">{{ maladie.statistiquesAfrique }}</span>
            <span class="card-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </TransitionGroup>

        <!-- Aucun résultat -->
        <div v-if="filtered.length === 0" class="empty-state">
          <p class="empty-state__title">Aucune maladie ne correspond à « {{ query }} ».</p>
          <button class="empty-state__btn" type="button" @click="resetFilters">
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { maladies } from '@/data/maladies'
import { iconesMaladies } from '@/data/icones'

const query = ref('')
const activeCat = ref('Toutes')

const categories = computed(() => {
  const cats = [...new Set(maladies.map(m => m.categorie))]
  return ['Toutes', ...cats]
})

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const filtered = computed(() => {
  const q = normalize(query.value.trim())
  return maladies.filter(m => {
    const matchCat = activeCat.value === 'Toutes' || m.categorie === activeCat.value
    const matchQuery =
      q === '' ||
      normalize(m.nom).includes(q) ||
      normalize(m.accroche).includes(q) ||
      normalize(m.categorie).includes(q)
    return matchCat && matchQuery
  })
})

function resetFilters() {
  query.value = ''
  activeCat.value = 'Toutes'
}

onMounted(() => {
  gsap.fromTo(
    '.page-hero .container > *',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out' },
  )
  gsap.fromTo(
    '.maladie-card',
    { opacity: 0, y: 28 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out', delay: 0.3, clearProps: 'all' },
  )
})
</script>

<style scoped>
.page-maladies {
  min-height: 100vh;
  padding-top: 80px;
}

.page-hero {
  padding: clamp(4rem, 8vw, 8rem) 0 clamp(3rem, 5vw, 5rem);
  background: var(--color-bg);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem);
}

.page-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 1.5rem;
}

.page-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--color-white);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.page-subtitle {
  font-family: var(--font-dm);
  font-size: 1.125rem;
  color: var(--color-gray);
  max-width: 540px;
  margin: 1.5rem auto 0;
  line-height: 1.7;
}

.maladies-grid-section {
  padding: clamp(3rem, 5vw, 5rem) 0 clamp(4rem, 6vw, 6rem);
  background: var(--color-surface);
}

/* ── Filtres ──────────────────────────────── */
.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.filter-pills {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pill {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gray-light);
  background: transparent;
  border: 1px solid var(--color-border-subtle);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s, background 0.25s;
}

.pill:hover { color: var(--color-white); border-color: rgba(65, 145, 255, 0.4); }

.pill.is-active {
  color: #07101E;
  background: var(--color-green);
  border-color: var(--color-green);
  font-weight: 700;
}

.pill:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

.search-box {
  position: relative;
  flex-shrink: 0;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray);
  pointer-events: none;
}

.search-input {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-white);
  background: var(--color-bg);
  border: 1px solid var(--color-border-subtle);
  border-radius: 9999px;
  padding: 0.6rem 1.1rem 0.6rem 2.5rem;
  width: 240px;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, width 0.3s var(--ease-expo);
}

.search-input:focus {
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(65, 145, 255, 0.1);
  width: 280px;
}

.search-input::placeholder { color: var(--color-gray); }

.results-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: var(--color-gray);
  margin: 0 0 1.75rem;
}

/* ── Grille ───────────────────────────────── */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  position: relative; /* contient les cartes sortantes (position: absolute) */
}

.maladie-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  border-radius: 16px;
  padding: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.4s var(--ease-expo), border-color 0.4s, box-shadow 0.4s;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.maladie-card:hover {
  transform: translateY(-6px);
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  box-shadow: 0 0 40px color-mix(in srgb, var(--accent) 12%, transparent);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.card-icon {
  width: 36px;
  height: 36px;
  color: var(--accent);
  filter: drop-shadow(0 0 10px color-mix(in srgb, var(--accent) 35%, transparent));
  transition: transform 0.4s var(--ease-expo);
}

.card-icon :deep(svg) { width: 100%; height: 100%; }

.maladie-card:hover .card-icon { transform: scale(1.12) translateY(-2px); }

.card-cat {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--accent) 80%, white);
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
  border-radius: 9999px;
  padding: 0.3rem 0.7rem;
}

.card-name {
  font-family: var(--font-playfair);
  font-size: 1.25rem;
  color: var(--color-white);
  margin-bottom: 0.5rem;
}

.card-accroche {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
  line-height: 1.6;
  flex: 1;
}

.card-stat {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-green-dim);
  margin-top: 1rem;
  line-height: 1.5;
  display: block;
  padding-right: 2rem;
}

.card-arrow {
  font-size: 1.25rem;
  color: var(--accent);
  position: absolute;
  bottom: 1.5rem;
  right: 1.75rem;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.maladie-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(4px);
}

/* ── Transitions de filtre ────────────────── */
.cards-enter-active { transition: opacity 0.4s, transform 0.45s var(--ease-expo); }
.cards-leave-active { transition: opacity 0.2s, transform 0.25s; position: absolute; opacity: 0; }
.cards-enter-from { opacity: 0; transform: translateY(16px) scale(0.98); }
.cards-leave-to { opacity: 0; transform: scale(0.96); }
.cards-move { transition: transform 0.45s var(--ease-expo); }

/* ── Aucun résultat ───────────────────────── */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
}

.empty-state__title {
  font-family: var(--font-dm);
  color: var(--color-gray-light);
  margin: 0 0 1.5rem;
}

.empty-state__btn {
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-green);
  background: transparent;
  border: 1.5px solid rgba(65, 145, 255, 0.35);
  border-radius: 9999px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s;
}

.empty-state__btn:hover {
  background: rgba(65, 145, 255, 0.08);
  border-color: var(--color-green);
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .filters { flex-direction: column; align-items: stretch; }
  .search-box { width: 100%; }
  .search-input, .search-input:focus { width: 100%; }
}
</style>
