<template>
  <main v-if="maladie" class="maladie-detail">
    <section class="detail-hero" :style="{ '--accent': maladie.couleur }">
      <div class="container">
        <RouterLink to="/maladies" class="back-link">← Retour aux maladies</RouterLink>
        <span class="detail-label">{{ maladie.statistiquesAfrique }}</span>
        <h1 class="detail-title">{{ maladie.nom }}</h1>
        <p class="detail-accroche">{{ maladie.accroche }}</p>
      </div>
    </section>

    <section class="detail-body">
      <div class="container">
        <div class="detail-layout">
          <div class="detail-main">
            <div class="detail-block">
              <h2>Description</h2>
              <p>{{ maladie.description }}</p>
            </div>

            <div class="detail-block">
              <h2>Causes principales</h2>
              <ul class="detail-list">
                <li v-for="cause in maladie.causes" :key="cause">{{ cause }}</li>
              </ul>
            </div>

            <div class="detail-block">
              <h2>Symptômes</h2>
              <ul class="detail-list">
                <li v-for="symptome in maladie.symptomes" :key="symptome">{{ symptome }}</li>
              </ul>
            </div>

            <div class="detail-block">
              <h2>Prévention</h2>
              <ul class="detail-list prevention">
                <li v-for="prev in maladie.prevention" :key="prev">{{ prev }}</li>
              </ul>
            </div>
          </div>

          <aside class="detail-aside">
            <div class="myth-card" v-for="mythe in maladie.mythes" :key="mythe.mythe">
              <span class="myth-label">Mythe</span>
              <p class="myth-text">{{ mythe.mythe }}</p>
              <span class="reality-label">Réalité</span>
              <p class="reality-text">{{ mythe.realite }}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>

  <div v-else class="not-found">
    <p>Maladie introuvable.</p>
    <RouterLink to="/maladies">Retour</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { maladies } from '@/data/maladies'

const route = useRoute()
const maladie = computed(() => maladies.find(m => m.slug === route.params.slug))
</script>

<style scoped>
.maladie-detail { min-height: 100vh; padding-top: 80px; }

.detail-hero {
  padding: clamp(4rem, 8vw, 8rem) 0 clamp(3rem, 5vw, 5rem);
  background: var(--color-surface);
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem);
}

.back-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-gray);
  display: inline-block;
  margin-bottom: 2rem;
  transition: color 0.3s;
}
.back-link:hover { color: var(--color-green); }

.detail-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent, var(--color-green));
  display: block;
  margin-bottom: 1rem;
}

.detail-title {
  font-family: var(--font-playfair);
  font-size: clamp(3rem, 7vw, 6rem);
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.05;
}

.detail-accroche {
  font-family: var(--font-dm);
  font-size: 1.25rem;
  color: var(--color-gray);
  margin-top: 1.5rem;
  max-width: 600px;
}

.detail-body { padding: clamp(4rem, 6vw, 6rem) 0; background: var(--color-bg); }

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 4rem;
  align-items: start;
}

.detail-block { margin-bottom: 3rem; }

.detail-block h2 {
  font-family: var(--font-playfair);
  font-size: 1.5rem;
  color: var(--color-white);
  margin-bottom: 1rem;
}

.detail-block p {
  font-family: var(--font-dm);
  color: var(--color-gray-light, #9CA3AF);
  line-height: 1.8;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-list li {
  font-family: var(--font-dm);
  color: var(--color-gray-light, #9CA3AF);
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.detail-list li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: var(--color-green);
}

.detail-list.prevention li::before { content: '✓'; }

.myth-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 3px solid var(--color-green);
}

.myth-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gray);
}

.myth-text {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-white);
  margin: 0.5rem 0 1rem;
  font-style: italic;
}

.reality-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-green);
}

.reality-text {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-gray-light, #9CA3AF);
  margin-top: 0.5rem;
  line-height: 1.7;
}

.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--color-gray);
  font-family: var(--font-dm);
}

@media (max-width: 1024px) {
  .detail-layout { grid-template-columns: 1fr; }
}
</style>
