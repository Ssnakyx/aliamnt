<template>
  <main class="page-a-propos">
    <section class="hero">
      <div class="container" v-reveal.children>
        <span class="label">Qui sommes-nous</span>
        <h1 class="title">Une jeunesse africaine <em>engagée</em> pour la santé</h1>
        <p class="subtitle">
          ALIAMNT est une association de jeunes Africains déterminés à briser le cycle des maladies
          non transmissibles grâce à la prévention, l'éducation et la mobilisation communautaire.
        </p>
      </div>
    </section>

    <section class="about-section">
      <div class="container">
        <div class="about-grid" v-reveal.children>
          <div class="about-text">
            <h2>Notre histoire</h2>
            <p>
              Fondée au Niger en 2020, ALIAMNT est née d'un constat simple mais alarmant :
              les maladies non transmissibles tuent silencieusement des millions d'Africains,
              mais la prévention est quasi-inexistante pour les jeunes.
            </p>
            <p>
              Face à cette réalité, un groupe de jeunes professionnels de la santé et militants
              décide d'agir autrement — sur les réseaux sociaux d'abord, puis sur le terrain.
            </p>
            <p>
              Aujourd'hui, ALIAMNT est présente dans 3 pays africains et a sensibilisé plus de
              12 000 personnes. Notre ambition : couvrir toute l'Afrique francophone d'ici 2030.
            </p>
          </div>
          <div class="about-values">
            <div class="value-card" v-for="val in values" :key="val.titre">
              <span class="value-number">{{ val.num }}</span>
              <h3>{{ val.titre }}</h3>
              <p>{{ val.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="timeline-section">
      <div class="container">
        <span class="label">Notre parcours</span>
        <h2 class="section-title">De Niamey à <em>l'Afrique francophone</em></h2>
        <div class="timeline">
          <div class="timeline__line" aria-hidden="true" />
          <div
            v-for="(etape, i) in timeline"
            :key="etape.annee"
            class="timeline-item"
            :class="{ 'timeline-item--future': etape.futur, 'timeline-item--right': i % 2 === 1 }"
            v-reveal="{ y: 30 }"
          >
            <span class="timeline-dot" aria-hidden="true" />
            <div class="timeline-card">
              <span class="timeline-year">{{ etape.annee }}</span>
              <h3 class="timeline-titre">{{ etape.titre }}</h3>
              <p class="timeline-desc">{{ etape.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="team-section">
      <div class="container">
        <span class="label">L'équipe</span>
        <h2 class="section-title">Les visages derrière la mission</h2>
        <div class="team-grid" v-reveal.children>
          <div class="team-card" v-for="member in team" :key="member.nom">
            <div class="avatar" :style="{ background: member.couleur }">
              <span>{{ member.initiales }}</span>
            </div>
            <h3>{{ member.nom }}</h3>
            <span class="role">{{ member.role }}</span>
            <p>{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="partners-section">
      <div class="container">
        <span class="label">RECONNAISSANCES</span>
        <h2 class="section-title">Un réseau international <em>de confiance</em></h2>
        <p class="section-intro">
          ALIAMNT est officiellement membre du réseau NCD Alliance, la plus grande coalition mondiale
          dédiée à la lutte contre les maladies non transmissibles.
        </p>

        <div class="ncd-card" v-reveal>
          <div class="ncd-image-col">
            <img
              src="/Images/ncd_alliance.jpg"
              alt="ALIAMNT rejoint NCD Alliance"
              class="ncd-image"
              loading="lazy"
            />
          </div>
          <div class="ncd-content-col">
            <span class="ncd-logo-text">NCD Alliance</span>
            <h3 class="ncd-titre">ALIAMNT rejoint NCD Alliance</h3>
            <p class="ncd-desc">
              Cette reconnaissance place ALIAMNT sur l'agenda mondial de la lutte contre les MNT.
              Nous rejoignons un réseau de 2 000+ organisations dans 170 pays engagées à mettre
              les maladies non transmissibles au cœur des priorités de santé mondiales.
            </p>
            <span class="ncd-badge">Membre officiel depuis 2024</span>
            <a href="#" class="ncd-link">En savoir plus ↗</a>
          </div>
        </div>
      </div>
    </section>

    <section class="impact-section">
      <div class="container">
        <div class="impact-grid" v-reveal.children>
          <div class="impact-stat" v-for="stat in impactStats" :key="stat.label">
            <span class="impact-number">{{ stat.valeur }}</span>
            <span class="impact-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
interface Valeur { num: string; titre: string; desc: string }
interface Membre { nom: string; initiales: string; role: string; bio: string; couleur: string }
interface ImpactStat { valeur: string; label: string }
interface Etape { annee: string; titre: string; desc: string; futur?: boolean }

const timeline: Etape[] = [
  {
    annee: '2020',
    titre: 'Naissance à Niamey',
    desc: 'Un groupe de jeunes professionnels de santé lance ALIAMNT sur les réseaux sociaux, face au silence autour des MNT.',
  },
  {
    annee: '2021',
    titre: 'Du digital au terrain',
    desc: 'Premières campagnes de sensibilisation et de dépistage dans les quartiers et les écoles du Niger.',
  },
  {
    annee: '2022',
    titre: 'Expansion régionale',
    desc: 'Le Burkina Faso puis la Côte d\'Ivoire rejoignent le mouvement : ALIAMNT devient panafricaine.',
  },
  {
    annee: '2024',
    titre: 'Reconnaissance mondiale',
    desc: 'ALIAMNT devient membre officiel de NCD Alliance et dépasse les 12 000 personnes sensibilisées avec #NonAuPuff.',
  },
  {
    annee: '2030',
    titre: 'Le cap',
    desc: 'Couvrir toute l\'Afrique francophone avec un réseau de jeunes ambassadeurs de la prévention.',
    futur: true,
  },
]

const values: Valeur[] = [
  { num: '01', titre: 'Intégrité', desc: 'Nous agissons avec transparence et rigueur scientifique dans toutes nos communications.' },
  { num: '02', titre: 'Inclusion', desc: 'Notre action est pour tous les Africains, sans distinction de classe, genre ou région.' },
  { num: '03', titre: 'Innovation', desc: 'Nous utilisons les outils digitaux modernes pour rejoindre la jeunesse là où elle est.' },
]

const team: Membre[] = [
  { nom: 'Dr. Moussa Adamou', initiales: 'MA', role: 'Médecin-chef & Fondateur', bio: 'Médecin de santé publique spécialisé dans la prévention des MNT.', couleur: 'rgba(26,224,90,0.2)' },
  { nom: 'Fatima Zara', initiales: 'FZ', role: 'Directrice Communication', bio: 'Journaliste et activiste santé, spécialisée en communication digitale.', couleur: 'rgba(232,213,176,0.2)' },
  { nom: 'Ibrahim Sidi', initiales: 'IS', role: 'Coordinateur Terrain', bio: 'Responsable des campagnes de sensibilisation au Niger et Burkina Faso.', couleur: 'rgba(96, 165, 250, 0.2)' },
]

const impactStats: ImpactStat[] = [
  { valeur: '12 000+', label: 'personnes sensibilisées' },
  { valeur: '3', label: 'pays actifs' },
  { valeur: '50+', label: 'campagnes menées' },
  { valeur: '2 000+', label: 'organisations partenaires' },
]
</script>

<style scoped>
.page-a-propos { min-height: 100vh; padding-top: 80px; }

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
  max-width: 800px;
  margin: 0 auto;
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
  max-width: 600px;
  margin: 1.5rem auto 0;
  line-height: 1.7;
}

.about-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  background: var(--color-bg);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.about-text h2 {
  font-family: var(--font-playfair);
  font-size: 2rem;
  color: var(--color-white);
  margin-bottom: 1.5rem;
}

.about-text p {
  font-family: var(--font-dm);
  color: var(--color-gray);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about-values { display: flex; flex-direction: column; gap: 1.5rem; }

.value-card {
  background: var(--color-surface);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 2px solid var(--color-green);
}

.value-number {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-gray);
  letter-spacing: 0.1em;
}

.value-card h3 {
  font-family: var(--font-playfair);
  font-size: 1.125rem;
  color: var(--color-white);
  margin: 0.5rem 0 0.5rem;
}

.value-card p {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-gray);
  line-height: 1.6;
}

/* ── Timeline ── */
.timeline-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  background: var(--color-bg);
  text-align: center;
}

.timeline {
  position: relative;
  max-width: 760px;
  margin: 3.5rem auto 0;
  text-align: left;
}

.timeline__line {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  width: 1.5px;
  transform: translateX(-50%);
  background: linear-gradient(
    to bottom,
    rgba(65, 145, 255, 0.45) 0%,
    rgba(65, 145, 255, 0.18) 75%,
    transparent 100%
  );
}

.timeline-item {
  position: relative;
  width: 50%;
  padding-right: 2.5rem;
  margin-bottom: 2.25rem;
}

.timeline-item--right {
  margin-left: 50%;
  padding-right: 0;
  padding-left: 2.5rem;
}

.timeline-dot {
  position: absolute;
  top: 8px;
  right: -5.5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--color-green);
  box-shadow: 0 0 14px rgba(65, 145, 255, 0.6);
}

.timeline-item--right .timeline-dot {
  right: auto;
  left: -5.5px;
}

.timeline-item--future .timeline-dot {
  background: transparent;
  border: 1.5px dashed var(--color-green);
  box-shadow: none;
}

.timeline-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 14px;
  padding: 1.4rem 1.5rem;
  transition: border-color 0.3s, transform 0.4s var(--ease-expo);
}

.timeline-card:hover {
  border-color: rgba(65, 145, 255, 0.3);
  transform: translateY(-3px);
}

.timeline-item--future .timeline-card {
  border-style: dashed;
  background: transparent;
}

.timeline-year {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-green);
}

.timeline-titre {
  font-family: var(--font-playfair);
  font-size: 1.1rem;
  color: var(--color-white);
  margin: 0.4rem 0 0.45rem;
}

.timeline-desc {
  font-family: var(--font-dm);
  font-size: 0.85rem;
  color: var(--color-gray);
  line-height: 1.65;
  margin: 0;
}

@media (max-width: 640px) {
  .timeline__line { left: 6px; transform: none; }

  .timeline-item,
  .timeline-item--right {
    width: 100%;
    margin-left: 0;
    padding-left: 2rem;
    padding-right: 0;
  }

  .timeline-dot,
  .timeline-item--right .timeline-dot {
    left: 1px;
    right: auto;
  }
}

.team-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  background: var(--color-surface);
  text-align: center;
}

.section-title {
  font-family: var(--font-playfair);
  font-size: clamp(2rem, 4vw, 3rem);
  color: var(--color-white);
  margin-bottom: 3rem;
}
.section-title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.team-card {
  background: var(--color-bg);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  font-family: var(--font-playfair);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-white);
}

.team-card h3 {
  font-family: var(--font-playfair);
  font-size: 1.125rem;
  color: var(--color-white);
  margin-bottom: 0.25rem;
}

.role {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-green);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.75rem;
}

.team-card p {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
  line-height: 1.6;
}

/* ── Partners section ── */
.partners-section {
  padding: clamp(5rem, 8vw, 8rem) 0;
  background: var(--color-bg);
  text-align: center;
}

.section-intro {
  font-family: var(--font-dm);
  font-size: 1.05rem;
  color: var(--color-gray);
  max-width: 680px;
  margin: 0 auto 3.5rem;
  line-height: 1.7;
}

.ncd-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-surface);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  text-align: left;
}

.ncd-image-col {
  overflow: hidden;
}

.ncd-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
}

.ncd-content-col {
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.ncd-logo-text {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #4191FF;
  background: rgba(65,145,255,0.12);
  padding: 0.35rem 0.75rem;
  border-radius: 99px;
  width: fit-content;
}

.ncd-titre {
  font-family: var(--font-playfair);
  font-size: clamp(1.4rem, 2.5vw, 1.85rem);
  color: var(--color-white);
  line-height: 1.2;
  margin: 0;
}

.ncd-desc {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray);
  line-height: 1.75;
  margin: 0;
}

.ncd-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-green);
  background: rgba(26,224,90,0.1);
  border: 1px solid rgba(26,224,90,0.25);
  padding: 0.4rem 0.85rem;
  border-radius: 99px;
  width: fit-content;
}

.ncd-link {
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: #4191FF;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
  width: fit-content;
}
.ncd-link:hover { opacity: 0.75; }

/* ── Impact section ── */
.impact-section {
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: var(--color-surface);
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: rgba(255,255,255,0.07);
  border-radius: 16px;
  overflow: hidden;
}

.impact-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2.5rem 1.5rem;
  background: var(--color-surface);
  text-align: center;
}

.impact-number {
  font-family: var(--font-mono);
  font-size: clamp(2rem, 3.5vw, 3rem);
  color: #4191FF;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
}

.impact-label {
  font-family: var(--font-dm);
  font-size: 0.875rem;
  color: var(--color-gray);
  line-height: 1.4;
}

@media (max-width: 1024px) {
  .about-grid { grid-template-columns: 1fr; gap: 3rem; }
  .team-grid { grid-template-columns: 1fr; }
  .ncd-card { grid-template-columns: 1fr; }
  .ncd-image { height: 240px; }
  .ncd-content-col { padding: 2rem; }
  .impact-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 480px) {
  .impact-grid { grid-template-columns: repeat(2, 1fr); }
  .impact-stat { padding: 2rem 1rem; }
}
</style>
