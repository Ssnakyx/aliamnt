import { ref, onMounted, type Ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useCounter(
  targetRef: Ref<HTMLElement | null>,
  target: number,
  duration: number = 2.5
) {
  const current = ref(0)
  const isAnimated = ref(false)

  onMounted(() => {
    if (!targetRef.value) return

    ScrollTrigger.create({
      trigger: targetRef.value,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (isAnimated.value) return
        isAnimated.value = true
        gsap.to(current, {
          value: target,
          duration,
          ease: 'power2.out',
          snap: { value: 1 },
          onUpdate: () => {},
        })
      },
    })
  })

  return { current }
}
