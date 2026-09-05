<template>
  <section class="sec" id="maladies">
    <div class="wrap">
      <div class="sec-head reveal">
        <span class="label">Les Combats</span>
        <h2 class="sec-title">Neuf maladies <em>silencieuses</em></h2>
        <p class="pilier__desc" style="margin-top:1rem">
          Cliquez sur une maladie pour explorer ses causes, symptômes, moyens de prévention et les idées reçues à déconstruire.
        </p>
      </div>
      <div class="mal-grid">
        <article
          v-for="(m, i) in maladies"
          :key="m.id"
          class="mal reveal"
          :data-d="i % 3 || undefined"
          :style="{ '--c': m.couleur }"
          tabindex="0"
          role="button"
          :aria-label="`Détails sur ${m.nom}`"
          @click="open(m)"
          @keydown.enter.prevent="open(m)"
          @keydown.space.prevent="open(m)"
        >
          <div class="mal__icon" v-html="iconesMaladies[m.icone]"></div>
          <div class="mal__cat">{{ m.categorie }}</div>
          <h3 class="mal__name">{{ m.nom }}</h3>
          <p class="mal__hook">{{ m.accroche }}</p>
          <span class="mal__more">Explorer
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { maladies } from '@/data/maladies'
import { iconesMaladies } from '@/data/icones'
import { useMaladieModal } from '@/composables/useMaladieModal'

const { open } = useMaladieModal()
</script>
