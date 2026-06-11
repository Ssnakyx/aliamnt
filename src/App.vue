<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>

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
</script>

<style>
@import '@/assets/styles/variables.css';
@import '@/assets/styles/reset.css';
@import '@/assets/styles/typography.css';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

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
