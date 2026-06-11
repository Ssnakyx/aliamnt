<template>
  <main class="page-eval">
    <div class="eval-blob eval-blob--1" aria-hidden="true" />
    <div class="eval-blob eval-blob--2" aria-hidden="true" />

    <!-- ════════ PHASE 1 — INTRO ════════ -->
    <section v-if="phase === 'intro'" class="eval-intro">
      <div class="container container--narrow" v-reveal.children="{ start: 'top 100%' }">
        <span class="eval-label">Test Santé · ALIAMNT</span>
        <h1 class="eval-title">
          3 minutes pour savoir où <em>tu en es.</em>
        </h1>
        <p class="eval-sub">
          Les maladies non transmissibles avancent en silence : 11 questions sur tes habitudes
          pour évaluer ton exposition et recevoir des conseils de prévention personnalisés.
        </p>

        <ul class="intro-points" role="list">
          <li><span class="point-dot" aria-hidden="true" />11 questions, 3 minutes</li>
          <li><span class="point-dot" aria-hidden="true" />100% anonyme — rien ne quitte ton appareil</li>
          <li><span class="point-dot" aria-hidden="true" />4 domaines de risque analysés</li>
        </ul>

        <button class="btn-start" type="button" @click="startQuiz">
          Commencer le test
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <p class="intro-disclaimer">
          Cet outil de sensibilisation ne remplace pas un avis médical.
        </p>
      </div>
    </section>

    <!-- ════════ PHASE 2 — QUESTIONS ════════ -->
    <section v-else-if="phase === 'quiz'" class="eval-quiz">
      <div class="container container--narrow">
        <!-- Progress -->
        <div class="quiz-progress">
          <div class="quiz-progress__meta">
            <span class="quiz-progress__count">
              Question {{ current + 1 }} <span class="quiz-progress__total">/ {{ quizQuestions.length }}</span>
            </span>
            <button
              v-if="current > 0"
              class="quiz-back"
              type="button"
              @click="prevQuestion"
            >
              ← Précédent
            </button>
          </div>
          <div class="quiz-progress__track" role="progressbar" :aria-valuenow="current + 1" :aria-valuemin="1" :aria-valuemax="quizQuestions.length">
            <div
              class="quiz-progress__bar"
              :style="{ width: `${((current + (answers[current] !== null ? 1 : 0)) / quizQuestions.length) * 100}%` }"
            />
          </div>
        </div>

        <!-- Question -->
        <Transition :name="direction === 'next' ? 'q-next' : 'q-prev'" mode="out-in">
          <div :key="current" class="quiz-question">
            <h2 class="quiz-question__text">{{ currentQuestion.question }}</h2>
            <p v-if="currentQuestion.precision" class="quiz-question__precision">
              {{ currentQuestion.precision }}
            </p>

            <div class="quiz-options" role="group" :aria-label="currentQuestion.question">
              <button
                v-for="(opt, i) in currentQuestion.options"
                :key="opt.label"
                type="button"
                class="quiz-option"
                :class="{ 'is-selected': answers[current] === i }"
                @click="selectOption(i)"
              >
                <span class="quiz-option__radio" aria-hidden="true" />
                <span class="quiz-option__label">{{ opt.label }}</span>
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <!-- ════════ PHASE 3 — RÉSULTATS ════════ -->
    <section v-else class="eval-results">
      <div class="container">
        <div class="results-head">
          <span class="eval-label">Tes résultats</span>
          <h1 class="results-title">Ton profil prévention</h1>
        </div>

        <!-- Score global + domaines -->
        <div class="results-grid">
          <!-- Gauge -->
          <div class="score-card">
            <svg class="score-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="score-ring__track" cx="60" cy="60" r="52" />
              <circle
                class="score-ring__fill"
                cx="60" cy="60" r="52"
                :style="{
                  strokeDashoffset: ringOffset,
                  stroke: scoreColor,
                }"
              />
            </svg>
            <div class="score-center">
              <span class="score-value" :style="{ color: scoreColor }">{{ displayedScore }}</span>
              <span class="score-max">/ 100</span>
            </div>
            <p class="score-caption">Score prévention</p>
            <p class="score-verdict">{{ verdict }}</p>
          </div>

          <!-- Domain bars -->
          <div class="domains-card">
            <h2 class="domains-title">Risque par domaine</h2>
            <div
              v-for="result in resultats"
              :key="result.domaine.id"
              class="domain-row"
            >
              <div class="domain-row__head">
                <span class="domain-row__name">{{ result.domaine.nom }}</span>
                <span
                  class="domain-row__level"
                  :style="{ color: couleurNiveau[result.niveau], borderColor: couleurNiveau[result.niveau] }"
                >
                  {{ labelNiveau[result.niveau] }}
                </span>
              </div>
              <div class="domain-row__track">
                <div
                  class="domain-row__bar"
                  :style="{
                    width: barsRevealed ? `${Math.max(result.pct, 4)}%` : '0%',
                    background: couleurNiveau[result.niveau],
                  }"
                />
              </div>
            </div>
            <p class="domains-note">
              Plus la barre est courte, mieux c'est. Un niveau élevé signale des habitudes à
              corriger en priorité — pas une maladie.
            </p>
          </div>
        </div>

        <!-- Conseils -->
        <div class="advice-section">
          <h2 class="advice-heading">Tes priorités, dans l'ordre</h2>
          <div class="advice-grid">
            <article
              v-for="(result, i) in resultatsTries"
              :key="result.domaine.id"
              class="advice-card"
              :style="{ '--accent': result.domaine.couleur }"
            >
              <div class="advice-card__top">
                <span class="advice-card__rank">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="advice-card__domain">{{ result.domaine.nom }}</span>
                <span
                  class="advice-card__chip"
                  :style="{ color: couleurNiveau[result.niveau] }"
                >● {{ labelNiveau[result.niveau] }}</span>
              </div>
              <p class="advice-card__text">{{ result.domaine.conseils[result.niveau] }}</p>
              <div class="advice-card__links">
                <RouterLink
                  v-for="slug in result.domaine.maladies"
                  :key="slug"
                  :to="`/maladies/${slug}`"
                  class="advice-link"
                >
                  {{ nomMaladie(slug) }} →
                </RouterLink>
              </div>
            </article>
          </div>
        </div>

        <!-- Actions -->
        <div class="results-actions">
          <button class="btn-share" type="button" @click="shareResults">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>
            </svg>
            {{ shared ? 'Copié !' : 'Partager mon score' }}
          </button>
          <button class="btn-restart" type="button" @click="restart">Refaire le test</button>
          <RouterLink to="/rejoindre" class="btn-join">Agir avec ALIAMNT</RouterLink>
        </div>

        <p class="results-disclaimer">
          Ce test est un outil de sensibilisation fondé sur les grands facteurs de risque des MNT.
          Il ne constitue pas un diagnostic : seul un professionnel de santé peut évaluer ta situation réelle.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import {
  quizQuestions,
  domaines,
  maxPointsParDomaine,
  niveauDepuisRatio,
  labelNiveau,
  type DomaineId,
  type NiveauRisque,
} from '@/data/quiz'
import { maladies } from '@/data/maladies'

type Phase = 'intro' | 'quiz' | 'results'

const phase = ref<Phase>('intro')
const current = ref(0)
const direction = ref<'next' | 'prev'>('next')
const answers = ref<(number | null)[]>(Array(quizQuestions.length).fill(null))
const barsRevealed = ref(false)
const displayedScore = ref(0)
const shared = ref(false)

const currentQuestion = computed(() => quizQuestions[current.value])

const couleurNiveau: Record<NiveauRisque, string> = {
  faible: '#34D399',
  modere: '#F59E0B',
  eleve: '#EF4444',
}

/* ── Navigation ──────────────────────────────────────── */
function startQuiz() {
  phase.value = 'quiz'
  current.value = 0
  window.scrollTo({ top: 0 })
}

function selectOption(i: number) {
  answers.value[current.value] = i
  // courte pause pour voir la sélection, puis suite
  window.setTimeout(() => {
    if (current.value < quizQuestions.length - 1) {
      direction.value = 'next'
      current.value++
    } else {
      showResults()
    }
  }, 280)
}

function prevQuestion() {
  if (current.value === 0) return
  direction.value = 'prev'
  current.value--
}

function restart() {
  answers.value = Array(quizQuestions.length).fill(null)
  barsRevealed.value = false
  displayedScore.value = 0
  shared.value = false
  phase.value = 'intro'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/* ── Calcul des résultats ────────────────────────────── */
interface ResultatDomaine {
  domaine: (typeof domaines)[number]
  points: number
  max: number
  pct: number
  niveau: NiveauRisque
}

const resultats = computed<ResultatDomaine[]>(() => {
  const totals: Record<DomaineId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
  answers.value.forEach((answer, qi) => {
    if (answer === null) return
    const pts = quizQuestions[qi].options[answer].points
    for (const [d, p] of Object.entries(pts) as [DomaineId, number][]) {
      totals[d] += p
    }
  })
  const max = maxPointsParDomaine()
  return domaines.map(domaine => {
    const points = totals[domaine.id]
    const ratio = max[domaine.id] > 0 ? points / max[domaine.id] : 0
    return {
      domaine,
      points,
      max: max[domaine.id],
      pct: Math.round(ratio * 100),
      niveau: niveauDepuisRatio(ratio),
    }
  })
})

const resultatsTries = computed(() =>
  [...resultats.value].sort((a, b) => b.pct - a.pct || b.points - a.points),
)

/** Score prévention : 100 = aucune exposition détectée. */
const score = computed(() => {
  const totalPts = resultats.value.reduce((s, r) => s + r.points, 0)
  const totalMax = resultats.value.reduce((s, r) => s + r.max, 0)
  return totalMax > 0 ? Math.round(100 - (totalPts / totalMax) * 100) : 100
})

const scoreColor = computed(() => {
  if (score.value >= 67) return '#34D399'
  if (score.value >= 34) return '#F59E0B'
  return '#EF4444'
})

const verdict = computed(() => {
  if (score.value >= 80) return 'Solide. Tes habitudes te protègent — continue et fais-toi dépister régulièrement.'
  if (score.value >= 60) return 'Bon profil, avec quelques habitudes à ajuster avant qu\'elles ne s\'installent.'
  if (score.value >= 40) return 'Ton mode de vie expose ta santé. La bonne nouvelle : 80% des MNT sont évitables.'
  return 'Plusieurs signaux d\'alerte cumulés. Chaque habitude changée compte — commence par ta priorité n°1 ci-dessous.'
})

/* ── Gauge SVG ───────────────────────────────────────── */
const CIRCUMFERENCE = 2 * Math.PI * 52

const ringOffset = computed(() => {
  const filled = barsRevealed.value ? displayedScore.value / 100 : 0
  return CIRCUMFERENCE * (1 - filled)
})

function showResults() {
  phase.value = 'results'
  window.scrollTo({ top: 0 })
  nextTick(() => {
    barsRevealed.value = true
    gsap.fromTo(
      displayedScore,
      { value: 0 },
      { value: score.value, duration: 1.6, ease: 'power3.out', snap: { value: 1 } },
    )
    gsap.fromTo(
      '.advice-card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'expo.out', delay: 0.4 },
    )
  })
}

/* ── Divers ──────────────────────────────────────────── */
function nomMaladie(slug: string): string {
  return maladies.find(m => m.slug === slug)?.nom ?? slug
}

async function shareResults() {
  const text = `J'ai fait le Test Santé ALIAMNT : score prévention ${score.value}/100. Et toi, tu en es où face aux maladies silencieuses ? ${window.location.origin}/evaluation`
  if (navigator.share) {
    try {
      await navigator.share({ title: 'Test Santé ALIAMNT', text })
      return
    } catch {
      /* utilisateur a annulé — fallback presse-papier */
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    shared.value = true
    window.setTimeout(() => { shared.value = false }, 2500)
  } catch {
    /* presse-papier indisponible (contexte non sécurisé) */
  }
}
</script>

<style scoped>
/* ════════ Page ════════ */
.page-eval {
  min-height: 100vh;
  padding-top: 80px;
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

.eval-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.eval-blob--1 {
  width: clamp(400px, 55vw, 800px);
  height: clamp(400px, 55vw, 800px);
  top: -15%;
  right: -20%;
  background: radial-gradient(circle, rgba(65, 145, 255, 0.09) 0%, transparent 65%);
}

.eval-blob--2 {
  width: clamp(300px, 40vw, 600px);
  height: clamp(300px, 40vw, 600px);
  bottom: -10%;
  left: -15%;
  background: radial-gradient(circle, rgba(147, 197, 253, 0.06) 0%, transparent 65%);
}

.container {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 5vw, 3rem);
}

.container--narrow { max-width: 720px; }

.eval-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-green);
  display: block;
  margin-bottom: 1.25rem;
}

/* ════════ Intro ════════ */
.eval-intro {
  min-height: calc(100vh - 80px);
  min-height: calc(100svh - 80px);
  display: flex;
  align-items: center;
  padding: 4rem 0;
}

.eval-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 0 0 1.5rem;
}

.eval-title em {
  font-style: normal;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.eval-sub {
  font-family: var(--font-dm);
  font-size: clamp(1rem, 1.8vw, 1.2rem);
  color: var(--color-gray-light);
  line-height: 1.7;
  max-width: 560px;
  margin: 0 0 2rem;
}

.intro-points {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  margin: 0 0 2.5rem;
  padding: 0;
}

.intro-points li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-dm);
  font-size: 0.95rem;
  color: var(--color-gray-light);
}

.point-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-green);
  flex-shrink: 0;
}

.btn-start {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--color-green);
  color: #07101E;
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.95rem 2.25rem;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s;
}

.btn-start:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 32px rgba(65, 145, 255, 0.4);
}

.btn-start:focus-visible {
  outline: 2px solid var(--color-sand);
  outline-offset: 3px;
}

.intro-disclaimer {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-gray);
  margin-top: 1.5rem;
  letter-spacing: 0.04em;
}

/* ════════ Quiz ════════ */
.eval-quiz {
  min-height: calc(100vh - 80px);
  min-height: calc(100svh - 80px);
  display: flex;
  align-items: center;
  padding: 4rem 0 6rem;
}

.eval-quiz .container { width: 100%; }

.quiz-progress { margin-bottom: clamp(2.5rem, 5vw, 4rem); }

.quiz-progress__meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.85rem;
}

.quiz-progress__count {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-white);
  letter-spacing: 0.06em;
}

.quiz-progress__total { color: var(--color-gray); }

.quiz-back {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-gray);
  background: none;
  border: none;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: color 0.25s;
  padding: 0.25rem 0;
}

.quiz-back:hover { color: var(--color-green); }

.quiz-progress__track {
  height: 3px;
  border-radius: 9999px;
  background: rgba(65, 145, 255, 0.12);
  overflow: hidden;
}

.quiz-progress__bar {
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(90deg, var(--color-green), var(--color-sand));
  transition: width 0.45s var(--ease-expo);
}

.quiz-question__text {
  font-family: var(--font-playfair);
  font-size: clamp(1.5rem, 3.5vw, 2.4rem);
  font-weight: 700;
  color: var(--color-white);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 0.6rem;
}

.quiz-question__precision {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-gray);
  margin: 0 0 1.5rem;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 1.75rem;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 14px;
  padding: 1.05rem 1.4rem;
  cursor: pointer;
  transition: border-color 0.25s, background 0.25s, transform 0.3s var(--ease-expo);
}

.quiz-option:hover {
  border-color: rgba(65, 145, 255, 0.4);
  transform: translateX(4px);
}

.quiz-option:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

.quiz-option.is-selected {
  border-color: var(--color-green);
  background: rgba(65, 145, 255, 0.1);
}

.quiz-option__radio {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid var(--color-gray);
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.25s;
}

.quiz-option.is-selected .quiz-option__radio {
  border-color: var(--color-green);
}

.quiz-option.is-selected .quiz-option__radio::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--color-green);
}

.quiz-option__label {
  font-family: var(--font-dm);
  font-size: 0.98rem;
  color: var(--color-white);
  line-height: 1.4;
}

/* Transitions questions */
.q-next-enter-active, .q-prev-enter-active { transition: opacity 0.35s, transform 0.4s var(--ease-expo); }
.q-next-leave-active, .q-prev-leave-active { transition: opacity 0.2s, transform 0.25s ease-in; }
.q-next-enter-from { opacity: 0; transform: translateX(40px); }
.q-next-leave-to   { opacity: 0; transform: translateX(-30px); }
.q-prev-enter-from { opacity: 0; transform: translateX(-40px); }
.q-prev-leave-to   { opacity: 0; transform: translateX(30px); }

/* ════════ Résultats ════════ */
.eval-results { padding: clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 7rem); }

.results-head { text-align: center; margin-bottom: clamp(2.5rem, 5vw, 4rem); }

.results-title {
  font-family: var(--font-playfair);
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 700;
  color: var(--color-white);
  letter-spacing: -0.025em;
  margin: 0;
}

.results-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.25rem;
  margin-bottom: clamp(3rem, 6vw, 4.5rem);
}

/* Score card */
.score-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.score-ring {
  width: 180px;
  height: 180px;
  transform: rotate(-90deg);
}

.score-ring__track {
  fill: none;
  stroke: rgba(65, 145, 255, 0.1);
  stroke-width: 7;
}

.score-ring__fill {
  fill: none;
  stroke-width: 7;
  stroke-linecap: round;
  stroke-dasharray: 326.7;
  /* pas de transition sur dashoffset : GSAP anime la valeur image par image */
  transition: stroke 0.5s;
}

.score-center {
  position: absolute;
  top: calc(2.5rem + 90px);
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.score-value {
  font-family: var(--font-mono);
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}

.score-max {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-gray);
}

.score-caption {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gray);
  margin: 1.25rem 0 0.75rem;
}

.score-verdict {
  font-family: var(--font-dm);
  font-size: 0.92rem;
  color: var(--color-gray-light);
  line-height: 1.65;
  margin: 0;
}

/* Domains card */
.domains-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: 24px;
  padding: 2.25rem 2.25rem 1.75rem;
}

.domains-title {
  font-family: var(--font-playfair);
  font-size: 1.2rem;
  color: var(--color-white);
  margin: 0 0 1.75rem;
}

.domain-row { margin-bottom: 1.4rem; }

.domain-row__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.domain-row__name {
  font-family: var(--font-dm);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--color-white);
}

.domain-row__level {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid;
  border-radius: 9999px;
  padding: 0.22rem 0.65rem;
}

.domain-row__track {
  height: 6px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.domain-row__bar {
  height: 100%;
  border-radius: 9999px;
  transition: width 1.2s var(--ease-expo);
}

.domains-note {
  font-family: var(--font-dm);
  font-size: 0.8rem;
  color: var(--color-gray);
  line-height: 1.6;
  margin: 1.5rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border-subtle);
}

/* Conseils */
.advice-heading {
  font-family: var(--font-playfair);
  font-size: clamp(1.5rem, 3vw, 2.1rem);
  color: var(--color-white);
  letter-spacing: -0.02em;
  margin: 0 0 1.75rem;
}

.advice-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.advice-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-left: 3px solid var(--accent);
  border-radius: 18px;
  padding: 1.75rem;
  opacity: 0;
}

.advice-card__top {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.advice-card__rank {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-gray);
}

.advice-card__domain {
  font-family: var(--font-playfair);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-white);
  flex: 1;
}

.advice-card__chip {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.advice-card__text {
  font-family: var(--font-dm);
  font-size: 0.9rem;
  color: var(--color-gray-light);
  line-height: 1.7;
  margin: 0 0 1.25rem;
}

.advice-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.advice-link {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--color-green);
  text-decoration: none;
  background: rgba(65, 145, 255, 0.08);
  border: 1px solid rgba(65, 145, 255, 0.18);
  border-radius: 9999px;
  padding: 0.35rem 0.8rem;
  transition: background 0.25s, border-color 0.25s;
}

.advice-link:hover {
  background: rgba(65, 145, 255, 0.16);
  border-color: var(--color-green);
}

/* Actions */
.results-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: clamp(3rem, 6vw, 4.5rem);
}

.btn-share,
.btn-restart,
.btn-join {
  font-family: var(--font-dm);
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.8rem 1.75rem;
  border-radius: 9999px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s var(--ease-expo), box-shadow 0.3s, border-color 0.3s, color 0.3s, background 0.3s;
}

.btn-share {
  background: var(--color-green);
  color: #07101E;
  border: none;
}
.btn-share:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-green-sm);
}

.btn-restart {
  background: transparent;
  color: var(--color-gray-light);
  border: 1.5px solid var(--color-border);
}
.btn-restart:hover { color: var(--color-white); border-color: var(--color-green); }

.btn-join {
  background: transparent;
  color: var(--color-green);
  border: 1.5px solid rgba(65, 145, 255, 0.35);
}
.btn-join:hover { background: rgba(65, 145, 255, 0.08); border-color: var(--color-green); }

.results-disclaimer {
  font-family: var(--font-dm);
  font-size: 0.78rem;
  color: var(--color-gray);
  line-height: 1.6;
  text-align: center;
  max-width: 560px;
  margin: 2.5rem auto 0;
}

/* ════════ Responsive ════════ */
@media (max-width: 900px) {
  .results-grid { grid-template-columns: 1fr; }
  .advice-grid { grid-template-columns: 1fr; }
}
</style>
