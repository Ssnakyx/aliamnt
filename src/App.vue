<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>

    <div
      id="cursor-ring"
      :class="['cursor-ring', { 'is-visible': cursor.isVisible.value, 'is-hovered': cursor.isHovered.value, 'is-clicking': cursor.isClicking.value }]"
      aria-hidden="true"
    ></div>
    <div
      id="cursor-dot"
      :class="['cursor-dot', { 'is-visible': cursor.isVisible.value }]"
      aria-hidden="true"
    ></div>

    <ScrollProgress />
    <NavBar />

    <div id="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="'page'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </div>

    <Footer />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollProgress from '@/components/ui/ScrollProgress.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import { useCursor } from '@/composables/useCursor'

const cursor = useCursor()
</script>

<style>
@import '@/assets/styles/variables.css';
@import '@/assets/styles/reset.css';
@import '@/assets/styles/typography.css';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom Cursor */
.cursor-ring {
  position: fixed;
  width: 40px;
  height: 40px;
  border: 1.5px solid rgba(26, 224, 90, 0.7);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s, border-color 0.3s;
  mix-blend-mode: difference;
  will-change: transform;
}

.cursor-ring.is-visible { opacity: 1; }
.cursor-ring.is-hovered {
  border-color: var(--color-green);
  background: rgba(26, 224, 90, 0.08);
}
.cursor-ring.is-clicking { transform: scale(0.85) !important; }

.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-green);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
  will-change: transform;
}
.cursor-dot.is-visible { opacity: 1; }

/* Hide custom cursor on touch/mobile */
@media (pointer: coarse) {
  .cursor-ring,
  .cursor-dot { display: none !important; }
}

/* Page transitions — fondu + montée + dé-flou */
.page-enter-active {
  transition: opacity 0.5s ease, transform 0.55s var(--ease-expo), filter 0.5s ease;
}
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(18px);
  filter: blur(8px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  filter: blur(4px);
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-green-dark, #0A5A22); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-green-dim); }

/* Text selection */
::selection {
  background: rgba(65, 145, 255, 0.35);
  color: var(--color-white);
}

/* Skip link (accessibilité clavier) */
.skip-link {
  position: fixed;
  top: -100px;
  left: 1rem;
  z-index: 300;
  background: var(--color-green);
  color: #07101E;
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.65rem 1.25rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: top 0.3s var(--ease-expo);
}
.skip-link:focus-visible { top: 1rem; }

/* Reduced motion : neutralise les animations CSS décoratives */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .cursor-ring,
  .cursor-dot { display: none !important; }
}
</style>
