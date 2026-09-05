<template>
  <section class="join" id="rejoindre">
    <div class="blob" aria-hidden="true"></div>
    <div class="wrap">
      <div class="join__inner reveal">
        <h2 class="join__title">Devenez un <span class="gradient-text">défenseur</span><br />de la santé</h2>
        <p class="join__sub">Chaque jeune informé devient un acteur du changement. Rejoignez le mouvement qui transforme la santé publique en Afrique.</p>
        <div class="join__cta">
          <RouterLink class="btn btn--primary" to="/contact#don">Faire un don
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </RouterLink>
          <RouterLink class="btn btn--outline" to="/rejoindre">Rejoindre l'association</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
