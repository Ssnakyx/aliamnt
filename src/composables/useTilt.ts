import { type Ref, onMounted, onUnmounted } from 'vue'

export function useTilt(containerRef: Ref<HTMLElement | null>, selector: string) {
  let els: HTMLElement[] = []
  let isTouchDevice = false

  const onMove = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.transition = 'box-shadow 0.25s, border-color 0.25s'
    el.style.transform = `perspective(900px) rotateX(${(y - 0.5) * -9}deg) rotateY(${(x - 0.5) * 9}deg) translateZ(8px)`
    const g = el.querySelector<HTMLElement>('.card-glare')
    if (g) {
      g.style.opacity = '1'
      g.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.07) 0%, transparent 58%)`
    }
  }

  const onLeave = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement
    el.style.transition = 'transform 0.65s cubic-bezier(.16,1,.3,1), box-shadow 0.25s, border-color 0.25s'
    el.style.transform = ''
    const g = el.querySelector<HTMLElement>('.card-glare')
    if (g) g.style.opacity = '0'
  }

  onMounted(() => {
    isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice || !containerRef.value) return
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
