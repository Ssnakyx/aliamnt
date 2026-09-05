<template>
  <div
    class="modal"
    :class="{ open: !!current }"
    role="dialog"
    aria-modal="true"
    :aria-hidden="current ? 'false' : 'true'"
    @keydown.esc="close"
  >
    <div class="modal__scrim" @click="close"></div>
    <div v-if="current" class="modal__panel" data-lenis-prevent :style="{ '--mc': current.couleur }">
      <button class="modal__close" aria-label="Fermer" @click="close">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>

      <div class="modal__hero">
        <div class="modal__icon" v-html="icon"></div>
        <div class="modal__cat">{{ current.categorie }}</div>
        <h3 class="modal__name">{{ current.nom }}</h3>
        <p class="modal__hook">{{ current.accroche }}</p>
      </div>

      <div class="modal__statbar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="4" />
        </svg>
        <p>{{ current.statistiquesAfrique }}</p>
      </div>

      <div class="modal__body">
        <div class="modal__block">
          <h4><i></i>Causes</h4>
          <ul class="modal__list"><li v-for="(c, i) in current.causes" :key="i">{{ c }}</li></ul>
        </div>
        <div class="modal__block">
          <h4><i></i>Symptômes</h4>
          <ul class="modal__list"><li v-for="(s, i) in current.symptomes" :key="i">{{ s }}</li></ul>
        </div>
        <div class="modal__block">
          <h4><i></i>Prévention</h4>
          <ul class="modal__list"><li v-for="(p, i) in current.prevention" :key="i">{{ p }}</li></ul>
        </div>
        <div class="modal__block">
          <h4><i></i>Idées reçues</h4>
          <div v-for="(my, i) in current.mythes" :key="i" class="myth">
            <div class="myth__m"><b>Mythe</b><span>{{ my.mythe }}</span></div>
            <div class="myth__r"><b>Réalité</b><span>{{ my.realite }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useMaladieModal } from '@/composables/useMaladieModal'
import { iconesMaladies } from '@/data/icones'

const { current, close } = useMaladieModal()

const icon = computed(() => (current.value ? iconesMaladies[current.value.icone] ?? '' : ''))

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && current.value) close()
}

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// Réinitialise le scroll du panneau à chaque ouverture
watch(current, () => {
  const panel = document.querySelector('.modal__panel') as HTMLElement | null
  if (panel) panel.scrollTop = 0
})
</script>
