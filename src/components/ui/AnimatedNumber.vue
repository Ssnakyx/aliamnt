<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

interface Props {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  prefix: '',
  duration: 2.5,
  decimals: 0,
})

const displayValue = ref<string>(
  props.decimals > 0 ? (0).toFixed(props.decimals) : '0',
)
const containerRef = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null
let tweenObj: { value: number } | null = null
let hasAnimated = false

function formatValue(val: number): string {
  return props.decimals > 0 ? val.toFixed(props.decimals) : String(Math.round(val))
}

function startAnimation(): void {
  if (hasAnimated) return
  hasAnimated = true

  tweenObj = { value: 0 }

  gsap.to(tweenObj, {
    value: props.target,
    duration: props.duration,
    ease: 'power2.out',
    onUpdate() {
      displayValue.value = formatValue(tweenObj!.value)
    },
    onComplete() {
      displayValue.value = formatValue(props.target)
    },
  })
}

onMounted(() => {
  if (!containerRef.value) return

  observer = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          startAnimation()
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.3 },
  )

  observer.observe(containerRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <span ref="containerRef" class="animated-number">
    <span class="animated-number__prefix" v-if="prefix">{{ prefix }}</span
    ><span class="animated-number__value">{{ displayValue }}</span
    ><span class="animated-number__suffix" v-if="suffix">{{ suffix }}</span>
  </span>
</template>

<style scoped>
.animated-number {
  display: inline-flex;
  align-items: baseline;
  font-family: 'Space Mono', monospace;
  white-space: nowrap;
  line-height: 1;
}

.animated-number__prefix,
.animated-number__value,
.animated-number__suffix {
  font-family: inherit;
  line-height: inherit;
}
</style>
