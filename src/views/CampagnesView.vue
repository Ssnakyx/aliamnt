<template>
  <main class="page-campagnes">
    <section class="hero">
      <div class="container">
        <span class="label">Impact &amp; Action</span>
        <h1 class="title">Nos campagnes <em>en chiffres</em></h1>
        <p class="subtitle">
          Chaque campagne est une promesse tenue. Découvrez comment nous mobilisons
          la jeunesse africaine pour la santé.
        </p>
      </div>
    </section>

    <section class="campagnes-section">
      <div class="container">
        <div class="campagnes-list">
          <article
            v-for="(c, index) in campagnes"
            :key="c.id"
            class="campagne-item"
            :style="{ '--accent': c.couleurTag }"
          >
            <div class="campagne-media">
              <img
                :src="c.image"
                :alt="c.titre"
                class="campagne-img"
                loading="lazy"
              />
              <div v-if="c.images && c.images.length" class="campagne-gallery">
                <img
                  v-for="(img, i) in c.images"
                  :key="i"
                  :src="img"
                  :alt="`${c.titre} — photo ${i + 2}`"
                  class="gallery-thumb"
                  loading="lazy"
                />
              </div>
            </div>

            <div class="campagne-content">
              <div class="campagne-header">
                <span
                  class="campagne-tag"
                  :style="{
                    color: c.couleurTag,
                    background: `color-mix(in srgb, ${c.couleurTag} 14%, transparent)`
                  }"
                >{{ c.tag }}</span>
                <time class="campagne-date">{{ formatDate(c.date) }}</time>
              </div>

              <h2 class="campagne-titre">{{ c.titre }}</h2>
              <p class="campagne-desc">{{ c.description }}</p>

              <div class="campagne-reach">
                <span class="reach-number">{{ formatReach(c.reach) }}</span>
                <span class="reach-label">personnes touchées</span>
              </div>
            </div>

            <div
              v-if="index < campagnes.length - 1"
              class="campagne-separator"
              aria-hidden="true"
            ></div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { campagnes } from '@/data/campagnes'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
}

function formatReach(reach: number): string {
  if (reach >= 1_000_000) return `${(reach / 1_000_000).toFixed(1)}M`
  if (reach >= 1_000) return `${Math.round(reach / 1_000)}K`
  return String(reach)
}
</script>

<style scoped>
.page-campagnes { min-height: 100vh; padding-top: 80px; }

/* ── Hero ── */
.hero {
  padding: clamp(5rem, 10vw, 10rem) 0;
  background: var(--color-surface);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem);
}

.label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 1.5rem;
}

.title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.title em { color: var(--color-green); font-style: italic; }

.subtitle {
  font-family: var(--font-dm);
  font-size: 1.125rem;
  color: var(--color-gray);
  max-width: 540px;
  margin: 1.5rem auto 0;
  line-height: 1.7;
}

/* ── List section ── */
.campagnes-section {
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: var(--color-bg);
}

.campagnes-list {
  display: flex;
  flex-direction: column;
}

/* ── Individual article ── */
.campagne-item {
  position: relative;
  display: grid;
  grid-template-columns: 40% 1fr;
  gap: 0;
  padding: 3rem 0;
}

.campagne-separator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
}

/* ── Media column ── */
.campagne-media {
  padding-right: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.campagne-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 14px;
  display: block;
  background: var(--color-surface);
}

/* ── Mini gallery ── */
.campagne-gallery {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 2px;
}
.campagne-gallery::-webkit-scrollbar { display: none; }

.gallery-thumb {
  flex-shrink: 0;
  width: auto;
  height: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  background: var(--color-surface);
  opacity: 0.75;
  transition: opacity 0.2s;
  cursor: pointer;
}
.gallery-thumb:hover { opacity: 1; }

/* ── Content column ── */
.campagne-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding-left: 0.5rem;
}

.campagne-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.campagne-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.35rem 0.75rem;
  border-radius: 99px;
  font-weight: 600;
}

.campagne-date {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-gray);
}

.campagne-titre {
  font-family: var(--font-playfair);
  font-size: clamp(1.4rem, 2.5vw, 2rem);
  color: var(--color-white);
  line-height: 1.2;
  margin: 0;
}

.campagne-desc {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray);
  line-height: 1.75;
  margin: 0;
  max-width: 56ch;
}

/* ── Reach stat ── */
.campagne-reach {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.reach-number {
  font-family: var(--font-mono);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: #4191FF;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
}

.reach-label {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .campagne-item {
    grid-template-columns: 1fr;
    padding: 2rem 0;
  }

  .campagne-media {
    padding-right: 0;
  }

  .campagne-img {
    height: 220px;
  }

  .campagne-content {
    padding-left: 0;
    padding-top: 1.25rem;
  }
}
</style>
