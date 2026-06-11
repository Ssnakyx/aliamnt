<template>
  <main class="page-media">

    <!-- Hero -->
    <section class="hero">
      <div class="container" v-reveal.children>
        <span class="hero-label">MÉDIAS &amp; PUBLICATIONS</span>
        <h1 class="hero-title">Nos contenus qui <em>impactent</em></h1>
        <p class="hero-subtitle">Retrouvez nos publications, campagnes et contenus éducatifs.</p>
      </div>
    </section>

    <!-- Instagram grid -->
    <section class="gallery-section">
      <div class="container">
        <!-- Filtres par tag -->
        <div class="tag-filters" role="group" aria-label="Filtrer par catégorie">
          <button
            v-for="tag in tags"
            :key="tag"
            type="button"
            class="tag-pill"
            :class="{ 'is-active': activeTag === tag }"
            @click="activeTag = tag"
          >
            {{ tag }}
          </button>
        </div>

        <TransitionGroup name="posts" tag="div" class="insta-grid">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="post-card"
            :class="{ 'post-card--tall': post.size === 'tall' && activeTag === 'Tout' }"
            tabindex="0"
            role="button"
            :aria-label="`Agrandir : ${post.caption}`"
            @click="openLightbox(post)"
            @keydown.enter.prevent="openLightbox(post)"
            @keydown.space.prevent="openLightbox(post)"
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
            <span class="post-zoom" aria-hidden="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3M11 8v6M8 11h6"/>
              </svg>
            </span>
          </article>
        </TransitionGroup>
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

    <!-- ── Lightbox ─────────────────────────── -->
    <Teleport to="body">
      <Transition name="lb">
        <div
          v-if="lightboxPost"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="lightboxPost.caption"
          @click.self="closeLightbox"
        >
          <button class="lb-close" type="button" aria-label="Fermer" @click="closeLightbox">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <button class="lb-nav lb-nav--prev" type="button" aria-label="Image précédente" @click.stop="lightboxStep(-1)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <figure class="lb-figure" @click.stop>
            <img :src="`/Images/${lightboxPost.image}`" :alt="lightboxPost.caption" class="lb-img" />
            <figcaption class="lb-caption">
              <span class="lb-tag" :style="{ color: lightboxPost.tagColor }">{{ lightboxPost.tag }}</span>
              <span class="lb-text">{{ lightboxPost.caption }}</span>
              <span class="lb-count">{{ lightboxIndex + 1 }} / {{ filteredPosts.length }}</span>
            </figcaption>
          </figure>

          <button class="lb-nav lb-nav--next" type="button" aria-label="Image suivante" @click.stop="lightboxStep(1)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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

/* ── Filtres ───────────────────────────────── */
const activeTag = ref('Tout')

const tags = computed(() => ['Tout', ...new Set(posts.map(p => p.tag))])

const filteredPosts = computed(() =>
  activeTag.value === 'Tout' ? posts : posts.filter(p => p.tag === activeTag.value),
)

/* ── Lightbox ──────────────────────────────── */
const lightboxPost = ref<InstaPost | null>(null)

const lightboxIndex = computed(() =>
  lightboxPost.value ? filteredPosts.value.findIndex(p => p.id === lightboxPost.value!.id) : -1,
)

function openLightbox(post: InstaPost) {
  lightboxPost.value = post
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxPost.value = null
  document.body.style.overflow = ''
}

function lightboxStep(delta: number) {
  if (!lightboxPost.value) return
  const list = filteredPosts.value
  const next = (lightboxIndex.value + delta + list.length) % list.length
  lightboxPost.value = list[next]
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxPost.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') lightboxStep(-1)
  else if (e.key === 'ArrowRight') lightboxStep(1)
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
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
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin: 0 0 1.25rem;
}
.hero-title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
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

/* ── Filtres ─────────────────────────────── */
.tag-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.tag-pill {
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

.tag-pill:hover { color: var(--color-white); border-color: rgba(65, 145, 255, 0.4); }

.tag-pill.is-active {
  color: #07101E;
  background: var(--color-green);
  border-color: var(--color-green);
  font-weight: 700;
}

.tag-pill:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

/* ── Instagram masonry grid ──────────────── */
.insta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 260px;
  gap: 0.75rem;
  position: relative; /* contient les cartes sortantes (position: absolute) */
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

.post-card:hover,
.post-card:focus-visible {
  transform: scale(1.02);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}

.post-card:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
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

/* Zoom hint */
.post-zoom {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(7, 16, 30, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.post-card:hover .post-zoom { opacity: 1; }

/* Transitions de filtre */
.posts-enter-active { transition: opacity 0.4s, transform 0.45s var(--ease-expo); }
.posts-leave-active { transition: opacity 0.15s; position: absolute; opacity: 0; }
.posts-enter-from { opacity: 0; transform: scale(0.96); }
.posts-leave-to { opacity: 0; }
.posts-move { transition: transform 0.45s var(--ease-expo); }

/* ── Lightbox ────────────────────────────── */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(4, 9, 18, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 4vw, 3rem);
}

.lb-figure {
  margin: 0;
  max-width: min(860px, 92vw);
  max-height: 86vh;
  display: flex;
  flex-direction: column;
}

.lb-img {
  max-width: 100%;
  max-height: calc(86vh - 70px);
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.7);
}

.lb-caption {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0.25rem 0;
}

.lb-tag {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}

.lb-text {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-white);
  flex: 1;
}

.lb-count {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-gray);
}

.lb-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s, transform 0.25s;
  z-index: 2;
}

.lb-close:hover { background: rgba(255, 255, 255, 0.12); transform: rotate(90deg); }

.lb-nav {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s;
  flex-shrink: 0;
  z-index: 2;
}

.lb-nav:hover { background: rgba(65, 145, 255, 0.2); border-color: var(--color-green); }

.lb-nav--prev { margin-right: clamp(0.5rem, 2vw, 1.5rem); }
.lb-nav--next { margin-left: clamp(0.5rem, 2vw, 1.5rem); }

.lb-close:focus-visible,
.lb-nav:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

.lb-enter-active { transition: opacity 0.3s; }
.lb-leave-active { transition: opacity 0.25s; }
.lb-enter-from, .lb-leave-to { opacity: 0; }

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

  .lb-nav { display: none; }
}
</style>
