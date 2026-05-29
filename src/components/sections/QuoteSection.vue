<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const quoteRef = ref<HTMLElement | null>(null)
const separatorRef = ref<HTMLElement | null>(null)
const attributionRef = ref<HTMLElement | null>(null)
const guillemetsRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!sectionRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 70%',
      once: true,
    },
  })

  tl.from(guillemetsRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
  })
    .from(
      quoteRef.value,
      {
        opacity: 0,
        clipPath: 'inset(0 0 100% 0)',
        y: 30,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.2',
    )
    .from(
      separatorRef.value,
      {
        scaleX: 0,
        transformOrigin: 'center',
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3',
    )
    .from(
      attributionRef.value,
      {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.2',
    )
})
</script>

<template>
  <section ref="sectionRef" class="quote-section">
    <div class="quote-bg" />
    <div class="container">
      <span ref="guillemetsRef" class="decorative-guillemets" aria-hidden="true">"</span>

      <blockquote class="quote-wrapper">
        <p ref="quoteRef" class="quote-text">
          La prévention vaut mille fois mieux que la guérison. En Afrique, chaque jeune informé devient un défenseur de la santé de sa communauté.
        </p>

        <div ref="separatorRef" class="quote-separator" />

        <footer ref="attributionRef" class="quote-attribution">
          — Dr. Moussa Adamou, Médecin-chef, ALIAMNT Niger
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<style scoped>
.quote-section {
  position: relative;
  background: var(--color-surface, #111611);
  padding: clamp(6rem, 10vw, 12rem) 1.5rem;
  overflow: hidden;
}

/* Subtle radial green glow in the background */
.quote-bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26, 224, 90, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

.container {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

/* Decorative opening guillemets */
.decorative-guillemets {
  display: block;
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-size: 8rem;
  line-height: 1;
  color: var(--color-green, #1ae05a);
  opacity: 0.3;
  margin-bottom: -2rem;
  position: relative;
  user-select: none;
}

/* Blockquote reset */
.quote-wrapper {
  margin: 0;
  padding: 0;
}

/* Main quote */
.quote-text {
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-style: italic;
  font-size: clamp(1.75rem, 3.5vw, 2.75rem);
  color: var(--color-white, #f5f0e8);
  line-height: 1.3;
  margin: 0;
  padding: 0;
}

/* Green separator line */
.quote-separator {
  width: 60px;
  height: 2px;
  background: var(--color-green, #1ae05a);
  margin: 2rem auto;
}

/* Attribution */
.quote-attribution {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.85rem;
  color: var(--color-gray, #6b7280);
  font-style: normal;
}
</style>
