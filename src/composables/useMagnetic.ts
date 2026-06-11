import { onMounted, onUnmounted, type Ref } from 'vue'
import gsap from 'gsap'

/**
 * Effet magnétique : les éléments suivent légèrement le curseur
 * et reviennent en place avec un ressort élastique.
 */
export function useMagnetic(containerRef: Ref<HTMLElement | null>, selector: string, strength = 0.3) {
  let els: HTMLElement[] = []

  const onMove = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const onLeave = (e: MouseEvent) => {
    gsap.to(e.currentTarget as HTMLElement, {
      x: 0,
      y: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  onMounted(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!containerRef.value) return
    els = Array.from(containerRef.value.querySelectorAll<HTMLElement>(selector))
    els.forEach(el => {
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
    })
  })

  onUnmounted(() => {
    els.forEach(el => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    })
  })
}
