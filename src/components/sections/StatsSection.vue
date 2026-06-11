<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { statsData } from '@/data/stats'
import type { StatCle } from '@/types'

gsap.registerPlugin(ScrollTrigger)

// ── Animated number sub-component ─────────────────────────────────────────
const AnimatedNumber = defineComponent({
  props: {
    target: { type: Number, required: true },
    suffix: { type: String, default: '' },
  },
  setup(props) {
    const displayVal = ref(0)
    const elRef = ref<HTMLElement | null>(null)

    onMounted(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.to(displayVal, {
              value: props.target,
              duration: 2.5,
              ease: 'power2.out',
              snap: { value: 1 },
            })
            observer.disconnect()
          }
        },
        { threshold: 0.3 },
      )
      if (elRef.value) observer.observe(elRef.value)
    })

    return () =>
      h(
        'span',
        { ref: elRef, class: 'stat__number' },
        `${Math.round(displayVal.value)}${props.suffix}`,
      )
  },
})

// ── Stat cards refs for GSAP reveal ───────────────────────────────────────
const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionEl.value) return
  const cards = sectionEl.value.querySelectorAll<HTMLElement>('.stat-card')
  gsap.fromTo(
    cards,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top 80%',
        once: true,
      },
    },
  )
})

// ── Icon lookup ─────────────────────────────────────────────────────────
type IconName = StatCle['icone']

const icons: Record<IconName, string> = {
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M19.5 17.5c0-1.933-1.567-3.5-3.5-3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.75"/>
    <path d="M3 19.5c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
  </svg>`,

  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 3L4 6.5v5C4 15.418 7.582 19.755 12 21c4.418-1.245 8-5.582 8-9.5v-5L12 3z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.75"/>
    <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M3 12h18" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M3.5 8h17M3.5 16h17" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
  </svg>`,

  flag: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M5 21V5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
    <path d="M5 5h10.5l-2 4.5 2 4.5H5" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/>
  </svg>`,
}
</script>

<template>
  <section ref="sectionEl" class="stats">
    <div class="stats__inner">
      <div class="stats__grid">
        <div
          v-for="stat in statsData"
          :key="stat.label"
          class="stat-card"
        >
          <span
            class="stat__icon"
            v-html="icons[stat.icone] ?? icons['flag']"
            aria-hidden="true"
          />
          <div class="stat__value-row">
            <AnimatedNumber :target="stat.valeur" :suffix="stat.suffix" />
          </div>
          <p class="stat__label">{{ stat.label }}</p>
          <p class="stat__description">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border-subtle);
  padding-block: clamp(5.5rem, 9vw, 9rem);
}

.stats__inner {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1.5rem, 5vw, 4rem);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
}

/* ── Card ── */
.stat-card {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-left: 1.5rem;
  border-left: 1px solid var(--color-border-subtle);
}

.stat__icon {
  display: flex;
  color: var(--color-green);
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.stat__value-row {
  margin-top: 1rem;
  line-height: 1;
}

/* Applied via defineComponent render fn — need global reach within scoped */
:deep(.stat__number) {
  font-family: var(--font-playfair);
  font-size: clamp(2.75rem, 5.5vw, 4.5rem);
  letter-spacing: -0.03em;
  font-weight: 600;
  white-space: nowrap;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.stat__label {
  font-family: var(--font-dm);
  font-size: 1rem;
  color: var(--color-white);
  font-weight: 600;
  margin: 0;
  margin-top: 0.5rem;
}

.stat__description {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
  margin: 0;
  margin-top: 0.25rem;
  line-height: 1.5;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(2.5rem, 5vw, 3.5rem);
  }
}

@media (max-width: 480px) {
  .stats__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
