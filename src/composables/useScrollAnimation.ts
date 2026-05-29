import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  y?: number
  opacity?: number
  scale?: number
  stagger?: number
  duration?: number
  delay?: number
  start?: string
  clipPath?: boolean
}

export function useScrollAnimation() {
  const revealElement = (
    el: HTMLElement | HTMLElement[] | NodeListOf<Element>,
    options: ScrollAnimationOptions = {}
  ) => {
    const {
      y = 40,
      opacity = 0,
      scale = 1,
      stagger = 0.1,
      duration = 0.8,
      delay = 0,
      start = 'top 85%',
      clipPath = false,
    } = options

    const fromVars: gsap.TweenVars = { opacity, y, scale }
    if (clipPath) {
      fromVars.clipPath = 'inset(0 0 100% 0)'
    }

    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'expo.out',
      stagger,
    }
    if (clipPath) {
      toVars.clipPath = 'inset(0 0 0% 0)'
    }

    gsap.fromTo(el, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: Array.isArray(el) ? el[0] : el instanceof NodeList ? el[0] : el,
        start,
        once: true,
      },
    })
  }

  const revealSection = (sectionRef: Ref<HTMLElement | null>) => {
    if (!sectionRef.value) return
    const children = sectionRef.value.querySelectorAll('[data-reveal]')
    if (children.length === 0) {
      revealElement(sectionRef.value)
    } else {
      revealElement(Array.from(children) as HTMLElement[])
    }
  }

  const parallax = (el: HTMLElement, speed: number = 0.3) => {
    gsap.to(el, {
      yPercent: speed * -100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  return { revealElement, revealSection, parallax }
}
