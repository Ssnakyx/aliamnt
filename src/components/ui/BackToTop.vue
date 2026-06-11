<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > window.innerHeight * 1.2
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="btt">
    <button
      v-if="visible"
      class="back-to-top"
      type="button"
      aria-label="Revenir en haut de page"
      @click="scrollTop"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 14V4M9 4L4 9M9 4l5 5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: rgba(12, 24, 40, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  color: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s var(--ease-expo), border-color 0.3s, box-shadow 0.3s;
}

.back-to-top:hover {
  transform: translateY(-3px);
  border-color: var(--color-green);
  box-shadow: var(--shadow-green-sm);
}

.back-to-top:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 3px;
}

.btt-enter-active,
.btt-leave-active {
  transition: opacity 0.3s, transform 0.3s var(--ease-expo);
}

.btt-enter-from,
.btt-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
