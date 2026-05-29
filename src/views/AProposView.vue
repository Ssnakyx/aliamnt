<template>
  <main class="page-a-propos">
    <section class="hero">
      <div class="container">
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
        <div class="about-grid">
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

    <section class="team-section">
      <div class="container">
        <span class="label">L'équipe</span>
        <h2 class="section-title">Les visages derrière la mission</h2>
        <div class="team-grid">
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

        <div class="ncd-card">
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
        <div class="impact-grid">
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
.title em { color: var(--color-green); font-style: italic; }

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
.section-title em { color: #4191FF; font-style: italic; }

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
