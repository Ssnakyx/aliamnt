<template>
  <section class="stats" aria-label="Chiffres clés">
    <div class="wrap">
      <div class="stats__grid">
        <div
          v-for="(s, i) in stats"
          :key="i"
          ref="cells"
          class="stat reveal"
          :data-d="i || undefined"
        >
          <div class="stat__num">{{ s.display }}</div>
          <div class="stat__label">{{ s.label }}</div>
          <div class="stat__desc">{{ s.desc }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, onUnmounted } from 'vue'

interface Stat {
  to: number
  suffix: string
  label: string
  desc: string
  display: string
}

const stats = reactive<Stat[]>([
  { to: 12000, suffix: '+', label: 'Personnes sensibilisées', desc: 'À travers nos campagnes terrain et digitales', display: '0' },
  { to: 9, suffix: '', label: 'Maladies couvertes', desc: 'Du diabète à la santé mentale', display: '0' },
  { to: 3, suffix: '', label: 'Pays actifs', desc: "Niger, Burkina Faso, Côte d'Ivoire", display: '0' },
  { to: 50, suffix: '+', label: 'Campagnes menées', desc: 'Terrain, digital et médias', display: '0' },
])

const cells = ref<HTMLElement[]>([])
let io: IntersectionObserver | null = null

function fmt(n: number) {
  return n >= 1000 ? Math.round(n).toLocaleString('fr-FR') : String(Math.round(n))
}

function animate(stat: Stat) {
  const dur = 1600
  const t0 = performance.now()
  function tick(t: number) {
    const p = Math.min((t - t0) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    stat.display = fmt(stat.to * eased) + stat.suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const i = cells.value.indexOf(e.target as HTMLElement)
        if (i >= 0) animate(stats[i])
        io?.unobserve(e.target)
      })
    },
    { threshold: 0.4 },
  )
  cells.value.forEach((c) => io?.observe(c))
})

onUnmounted(() => io?.disconnect())
</script>
