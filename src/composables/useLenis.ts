import type Lenis from 'lenis'

/** Référence partagée vers l'instance Lenis (null si reduced-motion). */
let instance: Lenis | null = null

export function setLenis(l: Lenis | null) {
  instance = l
}

export function getLenis(): Lenis | null {
  return instance
}
