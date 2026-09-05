<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>

    <div class="grain" aria-hidden="true"></div>
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
    <MaladieModal />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollProgress from '@/components/ui/ScrollProgress.vue'
import BackToTop from '@/components/ui/BackToTop.vue'
import MaladieModal from '@/components/ui/MaladieModal.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

useScrollReveal()
</script>

<style>
@import '@/assets/styles/variables.css';
@import '@/assets/styles/reset.css';
@import '@/assets/styles/typography.css';
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
/* Système de design ALIAMNT — importé en dernier pour primer sur les bases */
@import '@/assets/styles/site.css';

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
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--blue-dark); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--blue-dim); }

/* Skip link (accessibilité clavier) */
.skip-link {
  position: fixed;
  top: -100px;
  left: 1rem;
  z-index: 300;
  background: var(--blue);
  color: #050A13;
  font-family: var(--font-body);
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
}
</style>
