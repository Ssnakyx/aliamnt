import type { Directive } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface RevealOptions {
  y?: number
  delay?: number
  duration?: number
  stagger?: number
  start?: string
  blur?: boolean
}

const TWEEN_KEY = Symbol('reveal-tween')

interface RevealElement extends HTMLElement {
  [TWEEN_KEY]?: gsap.core.Tween
}

/**
 * v-reveal — révélation au scroll façon Apple : montée + fondu + dé-flou.
 *
 *   <div v-reveal>…</div>                  → révèle l'élément
 *   <div v-reveal.children>…</div>         → révèle ses enfants en cascade
 *   <div v-reveal="{ delay: 0.2, y: 60 }"> → options
 */
export const vReveal: Directive<RevealElement, RevealOptions | undefined> = {
  mounted(el, binding) {
    const {
      y = 44,
      delay = 0,
      duration = 1,
      stagger = 0.09,
      start = 'top 86%',
      blur = true,
    } = binding.value ?? {}

    const targets: Element[] | HTMLElement = binding.modifiers.children
      ? Array.from(el.children)
      : el

    const from: gsap.TweenVars = { opacity: 0, y }
    const to: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      stagger: binding.modifiers.children ? stagger : 0,
      clearProps: 'filter,transform',
      scrollTrigger: { trigger: el, start, once: true },
    }

    if (blur) {
      from.filter = 'blur(12px)'
      to.filter = 'blur(0px)'
    }

    el[TWEEN_KEY] = gsap.fromTo(targets, from, to)
  },

  unmounted(el) {
    // Évite l'accumulation de ScrollTriggers orphelins entre les pages
    el[TWEEN_KEY]?.scrollTrigger?.kill()
    el[TWEEN_KEY]?.kill()
    delete el[TWEEN_KEY]
  },
}
