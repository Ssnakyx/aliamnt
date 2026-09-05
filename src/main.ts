import { createApp } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'
import { setLenis } from './composables/useLenis'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Accessibilité : les utilisateurs qui demandent moins d'animations
// voient les tweens GSAP terminer quasi instantanément
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(50)
  gsap.defaults({ duration: 0.01 })
} else {
  // Smooth scroll inertiel (desktop) synchronisé avec ScrollTrigger
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(time => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // Permet aux composants (ex. modal) de mettre le scroll en pause
  setLenis(lenis)
}

const app = createApp(App)
app.use(router)
app.directive('reveal', vReveal)
app.mount('#app')
