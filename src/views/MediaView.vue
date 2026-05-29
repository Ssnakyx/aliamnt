<template>
  <main class="page-media">

    <!-- Hero -->
    <section class="hero">
      <div class="container">
        <span class="hero-label">MÉDIAS &amp; PUBLICATIONS</span>
        <h1 class="hero-title">Nos contenus qui <em>impactent</em></h1>
        <p class="hero-subtitle">Retrouvez nos publications, campagnes et contenus éducatifs.</p>
      </div>
    </section>

    <!-- Instagram grid -->
    <section class="gallery-section">
      <div class="container">
        <div class="insta-grid">
          <article
            v-for="post in posts"
            :key="post.id"
            class="post-card"
            :class="{ 'post-card--tall': post.size === 'tall' }"
          >
            <img
              :src="`/Images/${post.image}`"
              :alt="post.caption"
              loading="lazy"
              class="post-img"
            />
            <div class="post-overlay"></div>
            <footer class="post-footer">
              <span class="post-tag" :style="{ color: post.tagColor }">{{ post.tag }}</span>
              <span class="post-caption">{{ post.caption }}</span>
            </footer>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA Instagram -->
    <section class="cta-section">
      <div class="container cta-inner">
        <div class="cta-text">
          <p class="cta-stat">+500 abonnés</p>
          <p class="cta-desc">Suivez-nous pour plus de contenus santé au quotidien.</p>
        </div>
        <a
          href="https://www.instagram.com/aliamnt_"
          target="_blank"
          rel="noopener noreferrer"
          class="cta-btn"
        >
          Suivez-nous @aliamnt_ sur Instagram
        </a>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
interface InstaPost {
  id: string
  image: string
  caption: string
  tag: string
  tagColor: string
  date: string
  size: 'normal' | 'tall'
}

const posts: InstaPost[] = [
  {
    id: '1',
    image: 'habitude_1.jpg',
    caption: 'ALIAMNT te parle',
    tag: 'Habitudes',
    tagColor: '#4191FF',
    date: '2024-10-01',
    size: 'normal',
  },
  {
    id: '2',
    image: 'habitude_2.jpg',
    caption: 'Sommeil & TikTok',
    tag: 'Habitudes',
    tagColor: '#4191FF',
    date: '2024-10-05',
    size: 'normal',
  },
  {
    id: '3',
    image: 'habitude_3.jpg',
    caption: 'Boissons énergisantes',
    tag: 'Habitudes',
    tagColor: '#4191FF',
    date: '2024-10-08',
    size: 'normal',
  },
  {
    id: '4',
    image: 'habitude_4.jpg',
    caption: 'Fatigue chronique',
    tag: 'Habitudes',
    tagColor: '#4191FF',
    date: '2024-10-12',
    size: 'normal',
  },
  {
    id: '5',
    image: 'habitude_5.jpg',
    caption: 'Sédentarité',
    tag: 'Habitudes',
    tagColor: '#4191FF',
    date: '2024-10-15',
    size: 'normal',
  },
  {
    id: '6',
    image: 'habitude_6.jpg',
    caption: 'La santé au quotidien',
    tag: 'Inspiration',
    tagColor: '#93C5FD',
    date: '2024-10-20',
    size: 'tall',
  },
  {
    id: '7',
    image: 'campagne_puff_1.jpg',
    caption: '#NonAuPuff',
    tag: 'Campagne',
    tagColor: '#1AE05A',
    date: '2024-09-01',
    size: 'tall',
  },
  {
    id: '8',
    image: 'campagne_puff_2.jpg',
    caption: "Au début c'est une taffe",
    tag: 'Campagne',
    tagColor: '#1AE05A',
    date: '2024-09-05',
    size: 'normal',
  },
  {
    id: '9',
    image: 'campagne_puff_3.jpg',
    caption: "La dépendance s'installe",
    tag: 'Campagne',
    tagColor: '#1AE05A',
    date: '2024-09-10',
    size: 'normal',
  },
  {
    id: '10',
    image: 'novembre_bleu.jpg',
    caption: 'Novembre Bleu',
    tag: 'Movember',
    tagColor: '#3B82F6',
    date: '2024-11-01',
    size: 'tall',
  },
  {
    id: '11',
    image: 'octobre_rose.jpg',
    caption: 'Octobre Rose',
    tag: 'Campagne',
    tagColor: '#EC4899',
    date: '2024-10-01',
    size: 'normal',
  },
  {
    id: '12',
    image: 'journee_soignants.jpg',
    caption: 'Journée des soignants',
    tag: 'Événement',
    tagColor: '#93C5FD',
    date: '2024-07-15',
    size: 'normal',
  },
]
</script>

<style scoped>
/* ── Page ────────────────────────────────── */
.page-media {
  min-height: 100vh;
  padding-top: 80px;
  background: var(--color-bg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 3rem);
}

/* ── Hero ────────────────────────────────── */
.hero {
  padding: clamp(5rem, 10vw, 10rem) 0 clamp(3rem, 6vw, 6rem);
  background: var(--color-surface);
  text-align: center;
}

.hero-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 800;
  color: var(--color-white);
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}
.hero-title em {
  font-style: italic;
  color: var(--color-green);
}

.hero-subtitle {
  font-family: var(--font-dm);
  font-size: 1.125rem;
  color: var(--color-gray);
  max-width: 460px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ── Gallery section ─────────────────────── */
.gallery-section {
  padding: clamp(3rem, 6vw, 6rem) 0;
}

/* ── Instagram masonry grid ──────────────── */
.insta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 0.75rem;
}

/* ── Post card ───────────────────────────── */
.post-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.post-card--tall {
  grid-row: span 2;
}

.post-card:hover {
  transform: scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.5s ease;
}

.post-card:hover .post-img {
  transform: scale(1.06);
}

/* Gradient overlay always visible at bottom */
.post-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 45%,
    rgba(7, 16, 30, 0.7) 100%
  );
  transition: background 0.35s ease;
}

.post-card:hover .post-overlay {
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(7, 16, 30, 0.88) 100%
  );
}

/* Footer: tag + caption */
.post-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.post-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}

.post-caption {
  font-family: var(--font-dm);
  font-size: 0.8rem;
  color: var(--color-white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

/* ── CTA section ─────────────────────────── */
.cta-section {
  padding: clamp(4rem, 7vw, 7rem) 0;
  background: var(--color-surface);
}

.cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-text {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.cta-stat {
  font-family: var(--font-mono);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin: 0;
}

.cta-desc {
  font-family: var(--font-dm);
  font-size: 1rem;
  color: var(--color-gray);
  margin: 0;
}

.cta-btn {
  display: inline-block;
  background: var(--color-green);
  color: #07101E;
  font-family: var(--font-dm);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.9rem 2rem;
  border-radius: 9999px;
  white-space: nowrap;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-btn:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 28px rgba(65, 145, 255, 0.35);
}

/* ── Responsive ─────────────────────────── */
@media (max-width: 900px) {
  .insta-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 220px;
  }
}

@media (max-width: 560px) {
  .insta-grid {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 180px;
    gap: 0.5rem;
  }

  .cta-inner {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>
