<template>
  <main>
    <section class="phero">
      <div class="phero__blobs" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
      </div>
      <div class="wrap phero__inner">
        <div class="phero__crumb">
          <RouterLink to="/">Accueil</RouterLink><span>/</span><span style="color:var(--gray-light)">Maladies</span>
        </div>
        <h1 class="phero__title">Neuf maladies <span class="gradient-text">silencieuses</span></h1>
        <p class="phero__lead">
          Les maladies non transmissibles tuent en silence, souvent sans symptômes jusqu'au point critique.
          Comprendre, c'est déjà se protéger. Cliquez sur une maladie pour explorer ses causes, symptômes,
          moyens de prévention et les idées reçues à déconstruire.
        </p>
        <div class="phero__meta" role="tablist" aria-label="Filtrer par catégorie">
          <button
            v-for="c in categories"
            :key="c"
            class="chip"
            :class="{ active: active === c }"
            @click="active = c"
          >{{ c }}</button>
        </div>
      </div>
    </section>

    <section class="sec" style="padding-top:1rem">
      <div class="wrap">
        <div class="mlist">
          <button
            v-for="m in filtered"
            :key="m.id"
            class="mrow reveal"
            :style="{ '--c': m.couleur }"
            :aria-label="`Détails sur ${m.nom}`"
            @click="open(m)"
          >
            <span class="mrow__ic" v-html="iconesMaladies[m.icone]"></span>
            <span>
              <span class="mrow__cat">{{ m.categorie }}</span>
              <span class="mrow__name">{{ m.nom }}</span>
            </span>
            <span class="mrow__hook">{{ m.accroche }}</span>
            <span class="mrow__go">
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </button>
        </div>
      </div>
    </section>

    <section class="join">
      <div class="blob" aria-hidden="true"></div>
      <div class="wrap">
        <div class="join__inner reveal">
          <h2 class="join__title">Connais-tu ton <span class="gradient-text">risque</span> ?</h2>
          <p class="join__sub">Un test anonyme de 2 minutes pour évaluer ton exposition aux maladies non transmissibles et recevoir des conseils adaptés.</p>
          <div class="join__cta">
            <RouterLink class="btn btn--primary" to="/evaluation">Faire le test santé
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </RouterLink>
            <RouterLink class="btn btn--outline" to="/campagnes">Voir nos campagnes</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { maladies } from '@/data/maladies'
import { iconesMaladies } from '@/data/icones'
import { useMaladieModal } from '@/composables/useMaladieModal'

const { open } = useMaladieModal()

const categories = ['Toutes', ...Array.from(new Set(maladies.map((m) => m.categorie)))]
const active = ref('Toutes')

const filtered = computed(() =>
  active.value === 'Toutes' ? maladies : maladies.filter((m) => m.categorie === active.value),
)
</script>
