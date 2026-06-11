<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const QUOTE =
  'La prévention vaut mille fois mieux que la guérison. En Afrique, chaque jeune informé devient un défenseur de la santé de sa communauté.'

/* Mots à mettre en évidence (dégradé) une fois révélés */
const HIGHLIGHTS = new Set(['prévention', 'défenseur'])

const words = QUOTE.split(' ').map(text => ({
  text,
  highlight: HIGHLIGHTS.has(text.toLowerCase().replace(/[.,]/g, '')),
}))

const sectionRef = ref<HTMLElement | null>(null)
const quoteRef = ref<HTMLElement | null>(null)
const attributionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value || !quoteRef.value) return

  const wordEls = quoteRef.value.querySelectorAll<HTMLElement>('.qword')

  /* Révélation mot à mot, pilotée par le scroll (scrub) */
  gsap.fromTo(
    wordEls,
    { opacity: 0.1 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.6,
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 72%',
        end: 'center 42%',
        scrub: 0.4,
      },
    },
  )

  if (attributionRef.value) {
    gsap.fromTo(
      attributionRef.value,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'center 55%',
          once: true,
        },
      },
    )
  }
})
</script>

<template>
  <section ref="sectionRef" class="quote-section">
    <div class="quote-bg" aria-hidden="true" />
    <div class="container">
      <span class="quote-eyebrow">Notre conviction</span>

      <blockquote class="quote-wrapper">
        <p ref="quoteRef" class="quote-text" :aria-label="QUOTE">
          <span
            v-for="(word, i) in words"
            :key="i"
            class="qword"
            :class="{ 'qword--accent': word.highlight }"
            aria-hidden="true"
          >{{ word.text }}&nbsp;</span>
        </p>

        <footer ref="attributionRef" class="quote-attribution">
          <span class="attribution-line" aria-hidden="true" />
          Dr. Moussa Adamou — Médecin-chef, ALIAMNT Niger
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.quote-section {
  position: relative;
  background: var(--color-bg);
  padding: clamp(7rem, 13vw, 14rem) 1.5rem;
  overflow: hidden;
}

.quote-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(65, 145, 255, 0.06) 0%, transparent 70%);
  pointer-events: none;
}

.container {
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
}

.quote-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: 2.5rem;
}

.quote-wrapper {
  margin: 0;
  padding: 0;
}

.quote-text {
  font-family: var(--font-playfair);
  font-weight: 500;
  font-size: clamp(1.75rem, 4.2vw, 3.4rem);
  color: var(--color-white);
  line-height: 1.22;
  letter-spacing: -0.02em;
  margin: 0;
}

.qword {
  display: inline-block;
  will-change: opacity;
}

.qword--accent {
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.quote-attribution {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-gray);
  font-style: normal;
  margin-top: 3rem;
}

.attribution-line {
  display: inline-block;
  width: 44px;
  height: 1px;
  background: var(--gradient-accent);
}
</style>
