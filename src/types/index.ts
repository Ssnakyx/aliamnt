export interface Maladie {
  id: string
  slug: string
  nom: string
  icone: string
  accroche: string
  description: string
  causes: string[]
  symptomes: string[]
  prevention: string[]
  statistiquesAfrique: string
  couleur: string
  mythes: { mythe: string; realite: string }[]
}

export interface Campagne {
  id: string
  titre: string
  description: string
  date: string
  reach: number
  tag: string
  couleurTag: string
  image: string
  images?: string[]
}

export interface StatCle {
  valeur: number
  suffix: string
  label: string
  description: string
  icone: string
}

export interface PilierMission {
  id: string
  titre: string
  description: string
  icone: string
}

export interface NavLink {
  label: string
  to: string
}
