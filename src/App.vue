<template>
  <div id="app">
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

    <NavBar />

    <RouterView v-slot="{ Component, route }">
      <Transition :name="'page'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import Footer from '@/components/layout/Footer.vue'
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

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s var(--ease-expo);
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-green-dark, #0A5A22); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-green-dim); }
</style>
