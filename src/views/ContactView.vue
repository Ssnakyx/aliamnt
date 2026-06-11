<template>
  <main class="page-contact">
    <section class="hero">
      <div class="container" v-reveal.children>
        <span class="label">Contact</span>
        <h1 class="title">Parlons de <em>santé</em></h1>
        <p class="subtitle">
          Une question, un partenariat, une idée ? Nous sommes à l'écoute.
        </p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-layout" v-reveal.children>
          <div class="contact-info">
            <h2>Nous contacter</h2>
            <div class="info-item">
              <span class="info-label">Email</span>
              <a href="mailto:contact@aliamnt.org">contact@aliamnt.org</a>
            </div>
            <div class="info-item">
              <span class="info-label">Réseaux sociaux</span>
              <div class="social-links">
                <span>@aliamnt sur TikTok & Instagram</span>
              </div>
            </div>
            <div class="info-item">
              <span class="info-label">Pays actifs</span>
              <span>Niger · Burkina Faso · Côte d'Ivoire</span>
            </div>
          </div>

          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="nom">Nom complet</label>
              <input id="nom" v-model="form.nom" type="text" placeholder="Votre nom" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" v-model="form.email" type="email" placeholder="votre@email.com" required />
            </div>
            <div class="form-group">
              <label for="sujet">Sujet</label>
              <select id="sujet" v-model="form.sujet">
                <option value="">Choisir un sujet</option>
                <option value="partenariat">Partenariat</option>
                <option value="don">Don</option>
                <option value="benevole">Bénévolat</option>
                <option value="media">Média / Presse</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="form.message" rows="5" placeholder="Votre message..." required></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="submitted">
              {{ submitted ? 'Votre messagerie s\'ouvre… ✓' : 'Envoyer le message' }}
            </button>
            <p v-if="submitted" class="submit-note" role="status">
              Si rien ne s'ouvre, écrivez-nous directement à
              <a href="mailto:contact@aliamnt.org">contact@aliamnt.org</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const submitted = ref(false)
const form = reactive({ nom: '', email: '', sujet: '', message: '' })

const SUJETS_VALIDES = ['partenariat', 'don', 'benevole', 'media', 'autre']

const labelsSujet: Record<string, string> = {
  partenariat: 'Partenariat',
  don: 'Don',
  benevole: 'Bénévolat',
  media: 'Média / Presse',
  autre: 'Contact',
}

onMounted(() => {
  // Préselection du sujet via l'URL (ex: /contact?sujet=benevole)
  const sujet = String(route.query.sujet ?? '')
  if (SUJETS_VALIDES.includes(sujet)) form.sujet = sujet
})

function handleSubmit() {
  const sujetLabel = labelsSujet[form.sujet] ?? 'Contact'
  const subject = encodeURIComponent(`[${sujetLabel}] Message de ${form.nom}`)
  const body = encodeURIComponent(`${form.message}\n\n—\n${form.nom}\n${form.email}`)

  // Pas de backend : on ouvre le client mail du visiteur, pré-rempli
  window.location.href = `mailto:contact@aliamnt.org?subject=${subject}&body=${body}`

  submitted.value = true
  setTimeout(() => { submitted.value = false }, 6000)
}
</script>

<style scoped>
.page-contact { min-height: 100vh; padding-top: 80px; }

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
  max-width: 450px;
  margin: 1.5rem auto 0;
  line-height: 1.7;
}

.contact-section {
  padding: clamp(4rem, 6vw, 6rem) 0;
  background: var(--color-bg);
}

.contact-layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: 5rem;
  align-items: start;
}

.contact-info h2 {
  font-family: var(--font-playfair);
  font-size: 1.75rem;
  color: var(--color-white);
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 2rem;
}

.info-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 0.5rem;
}

.info-item a,
.info-item span {
  font-family: var(--font-dm);
  color: var(--color-gray);
  font-size: 0.95rem;
  transition: color 0.3s;
}
.info-item a:hover { color: var(--color-green); }

.contact-form { display: flex; flex-direction: column; gap: 1.5rem; }

.form-group { display: flex; flex-direction: column; gap: 0.5rem; }

.form-group label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-gray);
}

.form-group input,
.form-group select,
.form-group textarea {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.875rem 1rem;
  color: var(--color-white);
  font-family: var(--font-dm);
  font-size: 0.95rem;
  transition: border-color 0.3s;
  outline: none;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(26, 224, 90, 0.08);
}

.form-group input::placeholder,
.form-group textarea::placeholder { color: var(--color-gray); }

.form-group select { cursor: pointer; }
.form-group select option { background: var(--color-surface); }

.submit-btn {
  background: var(--color-green);
  color: #0A0D0A;
  border: none;
  border-radius: 9999px;
  padding: 1rem 2rem;
  font-family: var(--font-dm);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s, background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: scale(1.02);
  box-shadow: var(--shadow-green-sm);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-note {
  font-family: var(--font-dm);
  font-size: 0.82rem;
  color: var(--color-gray);
  margin: 0;
  text-align: center;
}

.submit-note a {
  color: var(--color-green);
  text-decoration: none;
}
.submit-note a:hover { text-decoration: underline; }

@media (max-width: 1024px) {
  .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
}
</style>
