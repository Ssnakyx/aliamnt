<template>
  <section class="hero" id="top">
    <div class="hero__blobs" aria-hidden="true">
      <div class="blob blob--1"></div>
      <div class="blob blob--2"></div>
      <div class="blob blob--3"></div>
    </div>
    <div class="hero__grid" aria-hidden="true"></div>
    <div class="dots" aria-hidden="true">
      <span v-for="(d, i) in dots" :key="i" class="dot" :style="d"></span>
    </div>

    <div class="hero__inner">
      <div class="hero__content">
        <div class="eyebrow">
          <span class="ping"></span>
          <span>Alliance contre les Maladies Non Transmissibles</span>
        </div>
        <h1 class="hero__title">
          <span class="line"><span>La santé,</span></span>
          <span class="line"><span>une priorité</span></span>
          <span class="line">
            <span class="kw">
              <Transition name="kwx">
                <span :key="word" class="kw__word">{{ word }}</span>
              </Transition>
            </span>
          </span>
        </h1>
        <p class="hero__sub">Sensibiliser, éduquer et mobiliser la jeunesse africaine face aux maladies silencieuses.</p>
        <div class="hero__cta">
          <RouterLink class="btn btn--primary" to="/evaluation">Évaluer mon risque santé
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </RouterLink>
          <RouterLink class="btn btn--outline" to="/campagnes">Découvrir nos actions</RouterLink>
        </div>
      </div>

      <div class="hero__visual" aria-hidden="true">
        <div class="vis-glow"></div>
        <div class="vis vis--b"><img src="/Images/campagne_puff_2.jpg" alt="" /></div>
        <div class="vis vis--a"><img src="/Images/habitude_6.jpg" alt="" /></div>
        <div class="vis vis--main">
          <img :src="`/Images/${cycle[cycleIndex][0]}`" alt="" :style="{ opacity: imgOpacity, transition: 'opacity .55s ease' }" />
          <div class="vis-badge"><i></i><span>{{ cycle[cycleIndex][1] }}</span></div>
        </div>
      </div>
    </div>

    <div class="ticker" aria-hidden="true">
      <div class="ticker__track">
        <span v-for="(t, i) in tickerItems" :key="i" class="ticker__item">{{ t }}<i></i></span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

/* dots décoratifs */
const dots = Array.from({ length: 18 }, (_, i) => {
  const s = i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5
  return {
    left: `${(i * 5.73 + 2.1) % 96}%`,
    top: `${(i * 13.17 + 3.4) % 89}%`,
    width: `${s}px`,
    height: `${s}px`,
    '--dl': `${(i * 0.61) % 5}s`,
    '--d': `${3.2 + (i % 5) * 0.6}s`,
  } as Record<string, string>
})

/* ticker (doublé pour la boucle) */
const base = ['Diabète', 'Hypertension', 'Obésité', 'Cancer', 'MNT', 'Prévention', 'Sensibilisation', 'Niger', 'Afrique', 'Santé Publique', 'Maladies chroniques', 'Mobilisation', 'Éducation']
const tickerItems = [...base, ...base]

/* mot-clé tournant */
const words = ['africaine.', 'urgente.', 'collective.', 'partagée.', 'vitale.', 'possible.']
const word = ref(words[0])
let wi = 0

/* image tournante */
const cycle: [string, string][] = [
  ['campagne_puff_1.jpg', '#NonAuPuff'],
  ['novembre_bleu.jpg', 'Novembre Bleu'],
  ['habitude_3.jpg', 'Habitudes Saines'],
  ['journee_soignants.jpg', 'Journée des Soignants'],
  ['octobre_rose.jpg', 'Octobre Rose'],
]
const cycleIndex = ref(0)
const imgOpacity = ref(1)

let wordTimer = 0
let imgTimer = 0

onMounted(() => {
  wordTimer = window.setInterval(() => {
    wi = (wi + 1) % words.length
    word.value = words[wi]
  }, 2600)

  imgTimer = window.setInterval(() => {
    imgOpacity.value = 0
    window.setTimeout(() => {
      cycleIndex.value = (cycleIndex.value + 1) % cycle.length
      imgOpacity.value = 1
    }, 350)
  }, 4500)
})

onUnmounted(() => {
  clearInterval(wordTimer)
  clearInterval(imgTimer)
})
</script>

<style scoped>
/* Les deux mots se superposent dans la même cellule de grille : un simple
   fondu (opacité) évite le scintillement du dégradé clippé sous transform 3D
   et la variation de largeur lors du changement de mot. */
/* site.css force `.hero__title .line>span{display:block}` (spécificité plus
   forte) : on rétablit l'inline-grid pour que les deux mots se superposent
   dans la même cellule au lieu de s'empiler verticalement. */
.hero__title .line > .kw {
  display: inline-grid;
  white-space: nowrap;
}
.kw__word {
  grid-area: 1 / 1;
  background: var(--grad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  padding-bottom: 0.08em;
  white-space: nowrap;
}
.kwx-enter-active,
.kwx-leave-active {
  transition: opacity 0.5s ease;
}
.kwx-enter-from,
.kwx-leave-to {
  opacity: 0;
}
</style>
