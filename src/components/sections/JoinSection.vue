<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()

const cardsColRef = ref<HTMLElement | null>(null)
const ctaColRef = ref<HTMLElement | null>(null)

interface JoinOption {
  key: string
  titre: string
  description: string
  labelBtn: string
  variant: 'solid' | 'outline'
  route: string
}

const joinOptions: JoinOption[] = [
  {
    key: 'benevole',
    titre: 'Bénévole',
    description: 'Rejoignez notre réseau de bénévoles sur le terrain et participez directement aux campagnes de prévention dans vos communautés.',
    labelBtn: 'Postuler →',
    variant: 'outline',
    route: '/contact?sujet=benevole',
  },
  {
    key: 'donateur',
    titre: 'Donateur',
    description: 'Votre contribution finance les campagnes de dépistage, les outils pédagogiques et la présence d\'ALIAMNT sur le terrain.',
    labelBtn: 'Faire un don →',
    variant: 'solid',
    route: '/contact?sujet=don',
  },
  {
    key: 'partenaire',
    titre: 'Partenaire',
    description: 'Institutions, entreprises et ONG : construisons ensemble des programmes de prévention à fort impact pour l\'Afrique.',
    labelBtn: 'Nous contacter →',
    variant: 'outline',
    route: '/contact?sujet=partenariat',
  },
]

function handleNav(route: string): void {
  router.push(route)
}

onMounted(() => {
  if (cardsColRef.value) {
    const cards = cardsColRef.value.querySelectorAll<HTMLElement>('.join-card')
    gsap.from(cards, {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardsColRef.value,
        start: 'top 80%',
        once: true,
      },
    })
  }

  if (ctaColRef.value) {
    gsap.from(ctaColRef.value, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ctaColRef.value,
        start: 'top 80%',
        once: true,
      },
    })
  }
})
</script>

<template>
  <section class="join-section">
    <div class="container">
      <!-- Left column: 3 join cards -->
      <div ref="cardsColRef" class="join-cards-col">
        <article
          v-for="option in joinOptions"
          :key="option.key"
          class="join-card"
        >
          <div class="join-card-icon-wrapper">
            <!-- Bénévole icon: open hand -->
            <svg
              v-if="option.key === 'benevole'"
              class="join-card-icon"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12V6a2 2 0 0 1 4 0v6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path d="M14 10V5a2 2 0 0 1 4 0v7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
              <path d="M18 10V8a2 2 0 0 1 4 0v6c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2a2 2 0 0 1 4 0v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
            <!-- Donateur icon: heart -->
            <svg
              v-else-if="option.key === 'donateur'"
              class="join-card-icon"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 24S3 16.5 3 9.5A6.5 6.5 0 0 1 14 5.5 6.5 6.5 0 0 1 25 9.5C25 16.5 14 24 14 24z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
            </svg>
            <!-- Partenaire icon: handshake -->
            <svg
              v-else
              class="join-card-icon"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 14l4-4 4 4-4 4-4-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
              <path d="M25 14l-4-4-4 4 4 4 4-4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" fill="none"/>
              <path d="M11 14h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M7 10l4-4 3 3 3-3 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            </svg>
          </div>

          <div class="join-card-content">
            <h3 class="join-card-titre">{{ option.titre }}</h3>
            <p class="join-card-desc">{{ option.description }}</p>
            <button
              class="join-card-btn"
              :class="`join-card-btn--${option.variant}`"
              type="button"
              @click="handleNav(option.route)"
            >
              {{ option.labelBtn }}
            </button>
          </div>
        </article>
      </div>

      <!-- Right column: CTA bloc -->
      <aside ref="ctaColRef" class="join-cta">
        <span class="cta-label">Ensemble</span>
        <h2 class="cta-title">Rejoignez le mouvement pour la santé africaine</h2>
        <p class="cta-desc">
          ALIAMNT fédère des citoyens, des professionnels de santé et des partenaires institutionnels autour d'une cause urgente : prévenir les maladies non transmissibles avant qu'elles ne frappent.
        </p>
        <button class="cta-btn" type="button" @click="handleNav('/rejoindre')">
          Je m'inscris
        </button>
        <p class="cta-members">500+ membres actifs</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.join-section {
  background: var(--color-bg, #0a0d0a);
  padding: clamp(5rem, 8vw, 8rem) 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* ---- Left column: join cards ---- */
.join-cards-col {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.join-card {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(65, 145, 255, 0.12);
  background: var(--color-surface);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
}

.join-card:hover {
  transform: translateY(-3px);
  border-color: rgba(65, 145, 255, 0.3);
}

.join-card-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(65, 145, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-green);
}

.join-card-icon {
  display: block;
}

.join-card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.join-card-titre {
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-white, #f5f0e8);
  margin: 0;
  line-height: 1.2;
}

.join-card-desc {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.875rem;
  color: var(--color-gray, #6b7280);
  line-height: 1.6;
  margin: 0;
}

/* Buttons */
.join-card-btn {
  align-self: flex-start;
  margin-top: 0.5rem;
  padding: 0.55rem 1.25rem;
  border-radius: 8px;
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
}

.join-card-btn--outline {
  background: transparent;
  color: var(--color-green, #1ae05a);
  border: 1.5px solid var(--color-green, #1ae05a);
}

.join-card-btn--outline:hover {
  background: rgba(26, 224, 90, 0.08);
}

.join-card-btn--solid {
  background: var(--color-green, #1ae05a);
  color: #0a0d0a;
  border: 1.5px solid var(--color-green, #1ae05a);
}

.join-card-btn--solid:hover {
  background: var(--color-green-dim);
  border-color: var(--color-green-dim);
  color: var(--color-white);
}

/* ---- Right column: CTA bloc ---- */
.join-cta {
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-subtle);
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: sticky;
  top: 6rem;
}

.cta-label {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-green, #1ae05a);
}

.cta-title {
  font-family: var(--font-playfair, 'Playfair Display', serif);
  font-size: clamp(1.75rem, 2.5vw, 2.5rem);
  font-weight: 700;
  color: var(--color-white, #f5f0e8);
  line-height: 1.2;
  margin: 0;
}

.cta-desc {
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 0.95rem;
  color: var(--color-gray, #6b7280);
  line-height: 1.7;
  margin: 0;
}

.cta-btn {
  width: 100%;
  padding: 1rem 2rem;
  border-radius: 12px;
  background: var(--color-green, #1ae05a);
  color: #0a0d0a;
  font-family: var(--font-dm, 'DM Sans', sans-serif);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;
  margin-top: 0.5rem;
}

.cta-btn:hover {
  background: var(--color-sand);
  box-shadow: 0 0 32px rgba(65, 145, 255, 0.35);
}

.cta-members {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.8rem;
  color: var(--color-gray, #6b7280);
  text-align: center;
  margin: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .join-cta {
    position: static;
  }
}

@media (max-width: 480px) {
  .join-card {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
