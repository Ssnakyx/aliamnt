<template>
  <footer class="footer">
    <div class="wrap">
      <div class="footer__top">
        <div class="footer__brand">
          <RouterLink to="/" class="brand">
            <span class="brand__mark"><img src="/Images/logo.jpg" alt="ALIAMNT" /></span>
            <span class="brand__name">ALI<span>AMNT</span></span>
          </RouterLink>
          <p>Alliance contre les maladies non transmissibles. Sensibiliser, éduquer et mobiliser la jeunesse africaine.</p>
        </div>

        <div class="footer__col">
          <h4>Naviguer</h4>
          <ul>
            <li><RouterLink to="/maladies">Maladies</RouterLink></li>
            <li><RouterLink to="/campagnes">Campagnes</RouterLink></li>
            <li><RouterLink to="/a-propos">À propos</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Agir</h4>
          <ul>
            <li><RouterLink to="/contact#don">Faire un don</RouterLink></li>
            <li><RouterLink to="/rejoindre">Devenir bénévole</RouterLink></li>
            <li><RouterLink to="/evaluation">Test santé</RouterLink></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Suivre</h4>
          <ul>
            <li><a href="https://www.instagram.com/aliamnt_" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.tiktok.com/@aliamnt_" target="_blank" rel="noopener">TikTok</a></li>
            <li><a href="#" rel="noopener">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <span>© {{ year }} ALIAMNT — Alliance contre les MNT</span>
        <span class="mono">Niger · Burkina Faso · Côte d'Ivoire</span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()
</script>
