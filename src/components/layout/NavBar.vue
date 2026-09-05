<template>
  <header class="nav" :class="{ scrolled: isScrolled }" role="banner">
    <div class="nav__inner">
      <RouterLink to="/" class="brand" aria-label="ALIAMNT — Accueil" @click="menuOpen = false">
        <span class="brand__mark"><img src="/Images/logo.jpg" alt="ALIAMNT" /></span>
        <span class="brand__name">ALI<span>AMNT</span></span>
      </RouterLink>

      <nav aria-label="Navigation principale">
        <ul class="nav__links" :class="{ open: menuOpen }">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              class="nav__link"
              :class="{ current: isCurrent(link.to) }"
              :to="link.to"
              @click="menuOpen = false"
            >{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <RouterLink to="/contact#don" class="nav__cta" @click="menuOpen = false">Faire un don</RouterLink>
      <button
        class="burger"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        type="button"
        @click="menuOpen = !menuOpen"
      ><span></span><span></span><span></span></button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Maladies', to: '/maladies' },
  { label: 'Campagnes', to: '/campagnes' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
]

function isCurrent(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

function onScroll() {
  // Sur les pages intérieures, la barre reste opaque dès le chargement
  isScrolled.value = window.scrollY > 40 || route.path !== '/'
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
/* Menu mobile déroulant (les classes .nav* viennent de site.css) */
@media (max-width: 980px) {
  .nav__links.open {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(5, 10, 19, 0.96);
    backdrop-filter: blur(16px);
    padding: 1.4rem var(--container);
    gap: 1.1rem;
    border-bottom: 1px solid var(--border-subtle);
  }
}
</style>
