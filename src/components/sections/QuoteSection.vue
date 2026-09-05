<template>
  <section ref="sec" class="quote" id="conviction">
    <div class="wrap">
      <span class="label quote__eyebrow">Notre conviction</span>
      <blockquote class="quote__text">
        <span
          v-for="(w, i) in words"
          :key="i"
          class="qword"
          :class="{ accent: w.accent, lit: i < lit }"
        >{{ w.text }} </span>
      </blockquote>
      <div class="quote__by">— <b>L'équipe ALIAMNT</b>, Alliance contre les MNT</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const text = 'La prévention vaut mille fois mieux que la guérison. En Afrique, chaque jeune informé devient un défenseur de la santé de sa communauté.'
const hl = new Set(['prévention', 'défenseur'])
const words = text.split(' ').map((t) => ({
  text: t,
  accent: hl.has(t.toLowerCase().replace(/[.,]/g, '')),
}))

const sec = ref<HTMLElement | null>(null)
const lit = ref(0)

function update() {
  if (!sec.value) return
  const r = sec.value.getBoundingClientRect()
  const vh = window.innerHeight
  const start = vh * 0.78
  const end = vh * 0.32
  const p = Math.min(Math.max((start - r.top) / (start - end), 0), 1)
  lit.value = Math.floor(p * words.length)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})
onUnmounted(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>
