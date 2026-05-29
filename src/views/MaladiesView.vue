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
        <div class="grid">
          <RouterLink
            v-for="maladie in maladies"
            :key="maladie.id"
            :to="`/maladies/${maladie.slug}`"
            class="maladie-card"
            :style="{ '--accent': maladie.couleur }"
          >
            <div class="card-top">
              <span class="color-dot" :style="{ background: maladie.couleur }"></span>
            </div>
            <h2 class="card-name">{{ maladie.nom }}</h2>
            <p class="card-accroche">{{ maladie.accroche }}</p>
            <span class="card-stat">{{ maladie.statistiquesAfrique }}</span>
            <span class="card-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { maladies } from '@/data/maladies'
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
  color: var(--color-green);
  font-style: italic;
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
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: var(--color-surface);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
  margin-bottom: 1.25rem;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
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
}

.card-arrow {
  font-size: 1.25rem;
  color: var(--color-green);
  position: absolute;
  bottom: 1.75rem;
  right: 1.75rem;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
}

.maladie-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
</style>
