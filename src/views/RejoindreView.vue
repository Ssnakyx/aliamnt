<template>
  <main class="page-rejoindre">
    <section class="hero">
      <div class="container" v-reveal.children>
        <span class="label">Rejoindre ALIAMNT</span>
        <h1 class="title">Devenez acteur du <em>changement</em></h1>
        <p class="subtitle">
          Que vous soyez étudiant, professionnel de santé, créateur de contenu ou simple citoyen engagé —
          il y a une place pour vous dans notre mouvement.
        </p>
      </div>
    </section>

    <section class="options-section">
      <div class="container">
        <div class="options-grid" v-reveal.children>
          <div class="option-card" v-for="opt in options" :key="opt.titre">
            <span class="option-number">{{ opt.num }}</span>
            <div class="option-icon" v-html="opt.svg"></div>
            <h2>{{ opt.titre }}</h2>
            <p>{{ opt.description }}</p>
            <ul>
              <li v-for="avantage in opt.avantages" :key="avantage">{{ avantage }}</li>
            </ul>
            <RouterLink :to="opt.lien" class="option-cta">{{ opt.cta }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Option {
  num: string
  titre: string
  description: string
  avantages: string[]
  cta: string
  lien: string
  svg: string
}

const options: Option[] = [
  {
    num: '01',
    titre: 'Bénévole',
    description: 'Rejoignez nos équipes terrain pour les campagnes de sensibilisation et les événements.',
    avantages: ['Participer aux campagnes', 'Formation santé publique', 'Réseau de professionnels', 'Certificat de bénévolat'],
    cta: 'Postuler comme bénévole →',
    lien: '/contact?sujet=benevole',
    svg: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  },
  {
    num: '02',
    titre: 'Donateur',
    description: 'Soutenez financièrement nos campagnes et permettez-nous d\'étendre notre impact.',
    avantages: ['Impact direct mesurable', 'Rapports d\'impact', 'Déduction fiscale éligible', 'Mention sur nos supports'],
    cta: 'Faire un don →',
    lien: '/contact?sujet=don',
    svg: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  },
  {
    num: '03',
    titre: 'Partenaire',
    description: 'Institutions, entreprises, médias — collaborez avec nous pour amplifier l\'impact.',
    avantages: ['Visibilité partenariale', 'Co-création de contenu', 'Accès aux données d\'impact', 'Réseau africain santé'],
    cta: 'Nous contacter →',
    lien: '/contact?sujet=partenariat',
    svg: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8h6"/><path d="M19 5v6"/><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11z"/></svg>',
  },
]
</script>

<style scoped>
.page-rejoindre { min-height: 100vh; padding-top: 80px; }

.hero {
  padding: clamp(5rem, 10vw, 10rem) 0;
  background: var(--color-surface);
  text-align: center;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 4rem);
}

.label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 1.5rem;
}

.title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--color-white);
  letter-spacing: -0.02em;
  line-height: 1.1;
}
.title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.subtitle {
  font-family: var(--font-dm);
  font-size: 1.125rem;
  color: var(--color-gray);
  max-width: 580px;
  margin: 1.5rem auto 0;
  line-height: 1.7;
}

.options-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  background: var(--color-bg);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.option-card {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: border-color 0.4s, transform 0.4s var(--ease-expo);
}

.option-card:hover {
  border-color: rgba(26, 224, 90, 0.25);
  transform: translateY(-6px);
}

.option-number {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-gray);
  margin-bottom: 1.5rem;
}

.option-icon {
  color: var(--color-green);
  margin-bottom: 1.5rem;
}

.option-card h2 {
  font-family: var(--font-playfair);
  font-size: 1.5rem;
  color: var(--color-white);
  margin-bottom: 0.75rem;
}

.option-card > p {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray);
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.option-card ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex: 1;
}

.option-card li {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
  padding-left: 1.25rem;
  position: relative;
}

.option-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-green);
  font-size: 0.75rem;
}

.option-cta {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-green);
  font-weight: 500;
  transition: opacity 0.3s;
}
.option-cta:hover { opacity: 0.75; }

@media (max-width: 1024px) {
  .options-grid { grid-template-columns: 1fr; max-width: 540px; margin: 0 auto; }
}
</style>
