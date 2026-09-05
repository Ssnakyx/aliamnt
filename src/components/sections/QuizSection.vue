<template>
  <section class="sec quiz-sec" id="test">
    <div class="blob" aria-hidden="true"></div>
    <div class="wrap">
      <div class="sec-head reveal" style="text-align:center;margin:0 auto 3rem">
        <span class="label">Test Santé — 2 minutes, anonyme</span>
        <h2 class="sec-title">Évalue ton <em>risque MNT</em></h2>
      </div>

      <div class="quiz reveal" data-d="1">
        <!-- Questions -->
        <template v-if="step < questions.length">
          <div class="quiz__top">
            <span class="quiz__count">Question {{ step + 1 }} / {{ questions.length }}</span>
            <span class="quiz__count">{{ pct }}%</span>
          </div>
          <div class="quiz__bar"><div class="quiz__fill" :style="{ width: pct + '%' }"></div></div>
          <div :key="step" class="quiz__anim">
            <h3 class="quiz__q">{{ current.q }}</h3>
            <p v-if="current.h" class="quiz__hint">{{ current.h }}</p>
            <div class="quiz__opts">
              <button
                v-for="(o, j) in current.o"
                :key="j"
                class="quiz__opt"
                @click="choose(j)"
              ><i></i>{{ o.label }}</button>
            </div>
            <div class="quiz__nav">
              <button class="quiz__back" :disabled="step === 0" @click="back">← Précédent</button>
            </div>
          </div>
        </template>

        <!-- Résultats -->
        <div v-else class="quiz__result quiz__anim">
          <h3>{{ anyEleve ? 'Quelques points méritent ton attention.' : 'Beau profil — continue comme ça.' }}</h3>
          <p>Ton domaine à surveiller en priorité : <b :style="{ color: top.c }">{{ top.nom }}</b>.</p>
          <div v-for="d in results" :key="d.id" class="dom">
            <div class="dom__head">
              <span class="dom__name">{{ d.nom }}</span>
              <span class="dom__lvl" :style="{ background: LVC[d.lv] + '22', color: LVC[d.lv] }">{{ LV[d.lv] }}</span>
            </div>
            <div class="dom__track">
              <div class="dom__bar" :style="{ width: (barsReady ? Math.max(6, Math.round(d.ratio * 100)) : 0) + '%', background: d.c }"></div>
            </div>
            <p class="dom__tip">{{ d.conseils[d.lv] }}</p>
          </div>
          <p class="quiz__disclaimer">⚠ Cet outil de sensibilisation ne remplace en aucun cas un diagnostic médical. En cas de doute, parles-en à un professionnel de santé.</p>
          <button class="btn btn--outline quiz__restart" @click="restart">↺ Refaire le test</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

type DomId = 'cardio' | 'metabolisme' | 'dependances' | 'mental'
type Level = 'faible' | 'modere' | 'eleve'

interface Domain {
  id: DomId
  nom: string
  c: string
  conseils: Record<Level, string>
}

interface Question {
  q: string
  h?: string
  o: { label: string; p: Partial<Record<DomId, number>> }[]
}

const DOM: Domain[] = [
  { id: 'cardio', nom: 'Cœur & tension', c: '#FF4444', conseils: {
    faible: 'Ton cœur te dit merci. Continue à bouger, limite le sel et fais contrôler ta tension une fois par an.',
    modere: "Quelques signaux à surveiller. Réduis le sel (moins de 5g/jour, attention aux cubes), bouge 30 min par jour et fais mesurer ta tension.",
    eleve: "Ton profil cumule plusieurs facteurs cardiovasculaires. L'hypertension est silencieuse : fais contrôler ta tension rapidement, c'est souvent gratuit en centre de santé.",
  } },
  { id: 'metabolisme', nom: 'Métabolisme', c: '#F59E0B', conseils: {
    faible: 'Ton équilibre alimentaire et ton activité protègent ton métabolisme. Garde le rythme.',
    modere: "Ton métabolisme encaisse, mais à crédit. Remplace une boisson sucrée par de l'eau chaque jour et bouge davantage.",
    eleve: "Ton risque de diabète de type 2 est réel. 70% des diabétiques africains s'ignorent — un test de glycémie est rapide et peut tout changer.",
  } },
  { id: 'dependances', nom: 'Tabac & dépendances', c: '#8B5CF6', conseils: {
    faible: "Tu tiens tête à l'industrie du tabac. Continue à refuser la première taffe — c'est la plus importante.",
    modere: "La nicotine s'installe vite, même « de temps en temps ». C'est maintenant qu'arrêter est le plus facile.",
    eleve: "La dépendance est là, et chaque puff augmente ton risque de cancer et d'AVC. Un accompagnement multiplie tes chances d'arrêter.",
  } },
  { id: 'mental', nom: 'Sommeil & mental', c: '#06B6D4', conseils: {
    faible: 'Ton sommeil et ton équilibre mental sont des fondations solides. Protège-les.',
    modere: 'Nuits courtes ou stress fréquent : ton mental fatigue en silence. Fixe une heure de coucher et coupe les écrans 30 min avant.',
    eleve: 'Ton mental tire la sonnette d\'alarme. En parler à un proche ou un professionnel est un acte de force, pas de honte.',
  } },
]

const questions: Question[] = [
  { q: 'Quel âge as-tu ?', o: [
    { label: 'Moins de 18 ans', p: {} }, { label: '18 – 25 ans', p: {} },
    { label: '26 – 35 ans', p: { cardio: 1, metabolisme: 1 } },
    { label: '36 – 50 ans', p: { cardio: 2, metabolisme: 2 } },
    { label: 'Plus de 50 ans', p: { cardio: 3, metabolisme: 3 } } ] },
  { q: 'Tabac, puff, chicha… où en es-tu ?', h: 'Sois honnête, le test est anonyme — rien ne quitte ton appareil.', o: [
    { label: 'Jamais touché', p: {} }, { label: "J'ai déjà essayé", p: { dependances: 1 } },
    { label: 'Occasionnellement', p: { dependances: 2, cardio: 1 } },
    { label: 'Régulièrement', p: { dependances: 3, cardio: 2 } } ] },
  { q: 'Ton activité physique chaque semaine ?', h: "Sport, marche rapide, vélo… au moins 30 min d'affilée.", o: [
    { label: '4 fois ou plus', p: {} }, { label: '2 à 3 fois', p: { metabolisme: 1 } },
    { label: 'Une fois', p: { cardio: 1, metabolisme: 2 } },
    { label: 'Presque jamais', p: { cardio: 2, metabolisme: 3 } } ] },
  { q: 'Sodas, jus industriels, boissons énergisantes ?', o: [
    { label: 'Rarement', p: {} }, { label: 'Quelques-uns par semaine', p: { metabolisme: 1 } },
    { label: 'Un par jour', p: { metabolisme: 2, dependances: 1 } },
    { label: 'Plusieurs par jour', p: { metabolisme: 3, dependances: 2 } } ] },
  { q: 'Des fruits et légumes dans ton assiette ?', o: [
    { label: 'Tous les jours', p: {} }, { label: 'Souvent', p: { metabolisme: 1 } },
    { label: 'Rarement', p: { metabolisme: 2, cardio: 1 } },
    { label: 'Presque jamais', p: { metabolisme: 2, cardio: 1 } } ] },
  { q: 'Et le sel ?', h: 'Cubes d\'assaisonnement, plats très salés, resaler avant de goûter…', o: [
    { label: 'Je fais attention', p: {} }, { label: 'Niveau moyen', p: { cardio: 1 } },
    { label: "J'aime quand c'est bien salé", p: { cardio: 3 } } ] },
  { q: 'Ton sommeil en semaine, ça ressemble à quoi ?', o: [
    { label: '7 à 9h, régulières', p: {} }, { label: '5 à 7h', p: { mental: 1 } },
    { label: 'Moins de 5h', p: { mental: 3, metabolisme: 1 } },
    { label: "Je m'endors à 2–3h en scrollant", p: { mental: 3, metabolisme: 1 } } ] },
  { q: "Combien d'heures assis·e ou sur écrans par jour ?", o: [
    { label: 'Moins de 4h', p: {} }, { label: '4 à 7h', p: { metabolisme: 1, mental: 1 } },
    { label: '8h ou plus', p: { metabolisme: 2, mental: 2 } } ] },
  { q: 'Stress, anxiété ou déprime ces derniers mois ?', o: [
    { label: 'Rarement', p: {} }, { label: 'Parfois', p: { mental: 1 } },
    { label: 'Souvent', p: { mental: 2, cardio: 1 } },
    { label: 'En permanence', p: { mental: 3, cardio: 1 } } ] },
  { q: 'Hypertension, diabète ou drépanocytose dans ta famille ?', h: 'Parents, frères et sœurs, grands-parents.', o: [
    { label: 'Non', p: {} }, { label: 'Je ne sais pas', p: { cardio: 1, metabolisme: 1 } },
    { label: 'Oui, un cas', p: { cardio: 1, metabolisme: 1 } },
    { label: 'Oui, plusieurs cas', p: { cardio: 2, metabolisme: 2 } } ] },
  { q: 'Ta tension ou ta glycémie, vérifiées pour la dernière fois… ?', o: [
    { label: 'Cette année', p: {} }, { label: "Il y a plus d'un an", p: { cardio: 1, metabolisme: 1 } },
    { label: 'Jamais', p: { cardio: 2, metabolisme: 2 } } ] },
]

const LV: Record<Level, string> = { faible: 'Faible', modere: 'Modéré', eleve: 'Élevé' }
const LVC: Record<Level, string> = { faible: '#10B981', modere: '#F59E0B', eleve: '#FF4444' }

// Score maximum par domaine (meilleure option de chaque question)
const maxP: Record<DomId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
questions.forEach((q) => {
  const best: Record<DomId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
  q.o.forEach((o) => {
    ;(Object.keys(o.p) as DomId[]).forEach((k) => {
      if ((o.p[k] ?? 0) > best[k]) best[k] = o.p[k] ?? 0
    })
  })
  ;(Object.keys(best) as DomId[]).forEach((k) => (maxP[k] += best[k]))
})

const step = ref(0)
const answers = ref<number[]>([])
const barsReady = ref(false)

const current = computed(() => questions[step.value])
const pct = computed(() => Math.round((step.value / questions.length) * 100))

function choose(j: number) {
  answers.value[step.value] = j
  step.value++
  if (step.value >= questions.length) triggerBars()
}
function back() {
  if (step.value > 0) step.value--
}
function restart() {
  step.value = 0
  answers.value = []
  barsReady.value = false
}
function triggerBars() {
  barsReady.value = false
  nextTick(() => setTimeout(() => (barsReady.value = true), 60))
}

interface Result extends Domain { ratio: number; lv: Level }

const results = computed<Result[]>(() => {
  const score: Record<DomId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
  questions.forEach((q, i) => {
    const p = q.o[answers.value[i]]?.p ?? {}
    ;(Object.keys(p) as DomId[]).forEach((k) => (score[k] += p[k] ?? 0))
  })
  return DOM.map((d) => {
    const ratio = maxP[d.id] ? score[d.id] / maxP[d.id] : 0
    const lv: Level = ratio <= 0.33 ? 'faible' : ratio <= 0.66 ? 'modere' : 'eleve'
    return { ...d, ratio, lv }
  })
})

const top = computed(() => [...results.value].sort((a, b) => b.ratio - a.ratio)[0])
const anyEleve = computed(() => results.value.some((d) => d.lv === 'eleve'))
</script>
