/**
 * Test Santé ALIAMNT — évaluation du risque MNT.
 *
 * Chaque réponse attribue des points de risque à un ou plusieurs domaines.
 * Le score d'un domaine est normalisé par le maximum atteignable, puis
 * traduit en niveau (faible / modéré / élevé) avec des conseils adaptés.
 *
 * ⚠ Outil de sensibilisation, en aucun cas un diagnostic médical.
 */

export type DomaineId = 'cardio' | 'metabolisme' | 'dependances' | 'mental'
export type NiveauRisque = 'faible' | 'modere' | 'eleve'

export interface QuizOption {
  label: string
  points: Partial<Record<DomaineId, number>>
}

export interface QuizQuestion {
  id: string
  question: string
  precision?: string
  options: QuizOption[]
}

export interface DomaineInfo {
  id: DomaineId
  nom: string
  couleur: string
  maladies: string[]
  conseils: Record<NiveauRisque, string>
}

export const domaines: DomaineInfo[] = [
  {
    id: 'cardio',
    nom: 'Cœur & tension',
    couleur: '#FF4444',
    maladies: ['hypertension', 'avc', 'maladies-cardiaques'],
    conseils: {
      faible: 'Ton cœur te dit merci. Continue à bouger, à limiter le sel et fais contrôler ta tension une fois par an pour garder cette avance.',
      modere: 'Quelques signaux à surveiller. Réduis le sel (vise moins de 5g/jour, attention aux cubes d\'assaisonnement), bouge 30 minutes par jour et fais mesurer ta tension dans les prochains mois.',
      eleve: 'Ton profil cumule plusieurs facteurs de risque cardiovasculaire. L\'hypertension est silencieuse : fais contrôler ta tension rapidement — c\'est gratuit dans beaucoup de centres de santé — et parle de tes habitudes à un soignant.',
    },
  },
  {
    id: 'metabolisme',
    nom: 'Métabolisme',
    couleur: '#F59E0B',
    maladies: ['diabete', 'obesite'],
    conseils: {
      faible: 'Ton équilibre alimentaire et ton activité protègent ton métabolisme. Garde le rythme : c\'est la meilleure assurance contre le diabète.',
      modere: 'Ton métabolisme encaisse, mais à crédit. Remplace une boisson sucrée par de l\'eau chaque jour, cuisine plus de produits locaux et bouge davantage : de petits gestes qui changent tout.',
      eleve: 'Boissons sucrées, sédentarité ou alimentation déséquilibrée : ton risque de diabète de type 2 est réel. 70% des diabétiques africains s\'ignorent — un test de glycémie est rapide et peut tout changer.',
    },
  },
  {
    id: 'dependances',
    nom: 'Tabac & dépendances',
    couleur: '#8B5CF6',
    maladies: ['tabac-puff', 'cancer'],
    conseils: {
      faible: 'Tu tiens tête à l\'industrie du tabac, qui cible massivement la jeunesse africaine. Continue à refuser la première taffe — c\'est la plus importante.',
      modere: 'La nicotine s\'installe vite, même avec une puff « de temps en temps ». C\'est maintenant qu\'arrêter est le plus facile. Remplace le geste par le sport et parles-en autour de toi.',
      eleve: 'La dépendance est déjà là, et chaque cigarette ou puff augmente ton risque de cancer et d\'AVC. Tu n\'es pas seul·e : un accompagnement multiplie tes chances d\'arrêter. Contacte-nous ou parles-en à un soignant.',
    },
  },
  {
    id: 'mental',
    nom: 'Sommeil & mental',
    couleur: '#06B6D4',
    maladies: ['sante-mentale'],
    conseils: {
      faible: 'Ton sommeil et ton équilibre mental sont des fondations solides. Protège-les : ce sont eux qui tiennent tout le reste.',
      modere: 'Nuits courtes, scroll tardif ou stress fréquent : ton mental fatigue en silence. Fixe une heure de coucher, coupe les écrans 30 minutes avant et parle de ce qui te pèse à quelqu\'un de confiance.',
      eleve: 'Ton mental tire la sonnette d\'alarme. Ce n\'est ni une faiblesse ni une malédiction : c\'est une question de santé. En parler à un proche ou un professionnel est un acte de force, pas de honte.',
    },
  },
]

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'age',
    question: 'Quel âge as-tu ?',
    options: [
      { label: 'Moins de 18 ans', points: {} },
      { label: '18 – 25 ans', points: {} },
      { label: '26 – 35 ans', points: { cardio: 1, metabolisme: 1 } },
      { label: '36 – 50 ans', points: { cardio: 2, metabolisme: 2 } },
      { label: 'Plus de 50 ans', points: { cardio: 3, metabolisme: 3 } },
    ],
  },
  {
    id: 'tabac',
    question: 'Tabac, puff, chicha… où en es-tu ?',
    precision: 'Sois honnête, le test est anonyme — rien ne quitte ton appareil.',
    options: [
      { label: 'Jamais touché', points: {} },
      { label: "J'ai déjà essayé", points: { dependances: 1 } },
      { label: 'Occasionnellement', points: { dependances: 2, cardio: 1 } },
      { label: 'Régulièrement', points: { dependances: 3, cardio: 2 } },
    ],
  },
  {
    id: 'sport',
    question: 'Ton activité physique chaque semaine ?',
    precision: 'Sport, marche rapide, vélo… au moins 30 minutes d\'affilée.',
    options: [
      { label: '4 fois ou plus', points: {} },
      { label: '2 à 3 fois', points: { metabolisme: 1 } },
      { label: 'Une fois', points: { cardio: 1, metabolisme: 2 } },
      { label: 'Presque jamais', points: { cardio: 2, metabolisme: 3 } },
    ],
  },
  {
    id: 'boissons',
    question: 'Sodas, jus industriels, boissons énergisantes ?',
    options: [
      { label: 'Rarement', points: {} },
      { label: 'Quelques-uns par semaine', points: { metabolisme: 1 } },
      { label: 'Un par jour', points: { metabolisme: 2, dependances: 1 } },
      { label: 'Plusieurs par jour', points: { metabolisme: 3, dependances: 2 } },
    ],
  },
  {
    id: 'fruits',
    question: 'Des fruits et légumes dans ton assiette ?',
    options: [
      { label: 'Tous les jours', points: {} },
      { label: 'Souvent', points: { metabolisme: 1 } },
      { label: 'Rarement', points: { metabolisme: 2, cardio: 1 } },
      { label: 'Presque jamais', points: { metabolisme: 2, cardio: 1 } },
    ],
  },
  {
    id: 'sel',
    question: 'Et le sel ?',
    precision: 'Cubes d\'assaisonnement, plats très salés, resaler avant de goûter…',
    options: [
      { label: 'Je fais attention', points: {} },
      { label: 'Niveau moyen', points: { cardio: 1 } },
      { label: "J'aime quand c'est bien salé", points: { cardio: 3 } },
    ],
  },
  {
    id: 'sommeil',
    question: 'Ton sommeil en semaine, ça ressemble à quoi ?',
    options: [
      { label: '7 à 9h, régulières', points: {} },
      { label: '5 à 7h', points: { mental: 1 } },
      { label: 'Moins de 5h', points: { mental: 3, metabolisme: 1 } },
      { label: "Je m'endors à 2–3h en scrollant", points: { mental: 3, metabolisme: 1 } },
    ],
  },
  {
    id: 'ecrans',
    question: 'Combien d\'heures assis·e ou sur les écrans par jour ?',
    options: [
      { label: 'Moins de 4h', points: {} },
      { label: '4 à 7h', points: { metabolisme: 1, mental: 1 } },
      { label: '8h ou plus', points: { metabolisme: 2, mental: 2 } },
    ],
  },
  {
    id: 'stress',
    question: 'Stress, anxiété ou déprime ces derniers mois ?',
    options: [
      { label: 'Rarement', points: {} },
      { label: 'Parfois', points: { mental: 1 } },
      { label: 'Souvent', points: { mental: 2, cardio: 1 } },
      { label: 'En permanence', points: { mental: 3, cardio: 1 } },
    ],
  },
  {
    id: 'famille',
    question: 'Hypertension, diabète ou drépanocytose dans ta famille proche ?',
    precision: 'Parents, frères et sœurs, grands-parents.',
    options: [
      { label: 'Non', points: {} },
      { label: 'Je ne sais pas', points: { cardio: 1, metabolisme: 1 } },
      { label: 'Oui, un cas', points: { cardio: 1, metabolisme: 1 } },
      { label: 'Oui, plusieurs cas', points: { cardio: 2, metabolisme: 2 } },
    ],
  },
  {
    id: 'depistage',
    question: 'Ta tension ou ta glycémie, vérifiées pour la dernière fois… ?',
    options: [
      { label: 'Cette année', points: {} },
      { label: 'Il y a plus d\'un an', points: { cardio: 1, metabolisme: 1 } },
      { label: 'Jamais', points: { cardio: 2, metabolisme: 2 } },
    ],
  },
]

/** Maximum de points atteignable par domaine (déduit des questions). */
export function maxPointsParDomaine(): Record<DomaineId, number> {
  const max: Record<DomaineId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
  for (const q of quizQuestions) {
    const best: Record<DomaineId, number> = { cardio: 0, metabolisme: 0, dependances: 0, mental: 0 }
    for (const opt of q.options) {
      for (const [d, pts] of Object.entries(opt.points) as [DomaineId, number][]) {
        if (pts > best[d]) best[d] = pts
      }
    }
    for (const d of Object.keys(max) as DomaineId[]) max[d] += best[d]
  }
  return max
}

export function niveauDepuisRatio(ratio: number): NiveauRisque {
  if (ratio <= 0.33) return 'faible'
  if (ratio <= 0.66) return 'modere'
  return 'eleve'
}

export const labelNiveau: Record<NiveauRisque, string> = {
  faible: 'Faible',
  modere: 'Modéré',
  eleve: 'Élevé',
}
