import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

export function useCursor() {
  const cursorX = ref(0)
  const cursorY = ref(0)
  const isVisible = ref(false)
  const isHovered = ref(false)
  const isClicking = ref(false)

  let cursorEl: HTMLElement | null = null
  let dotEl: HTMLElement | null = null

  const onMouseMove = (e: MouseEvent) => {
    if (!isVisible.value) isVisible.value = true
    gsap.to(cursorEl, {
      x: e.clientX - 20,
      y: e.clientY - 20,
      duration: 0.6,
      ease: 'expo.out',
    })
    gsap.to(dotEl, {
      x: e.clientX - 4,
      y: e.clientY - 4,
      duration: 0.15,
      ease: 'linear',
    })
  }

  const onMouseDown = () => { isClicking.value = true }
  const onMouseUp = () => { isClicking.value = false }
  const onMouseLeave = () => { isVisible.value = false }
  const onMouseEnter = () => { isVisible.value = true }

  const handleHoverIn = () => {
    isHovered.value = true
    gsap.to(cursorEl, { scale: 2, duration: 0.3, ease: 'expo.out' })
  }
  const handleHoverOut = () => {
    isHovered.value = false
    gsap.to(cursorEl, { scale: 1, duration: 0.3, ease: 'expo.out' })
  }

  onMounted(() => {
    cursorEl = document.getElementById('cursor-ring')
    dotEl = document.getElementById('cursor-dot')

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mouseup', onMouseUp)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
  })

  return { cursorX, cursorY, isVisible, isHovered, isClicking }
}
