import { ref } from 'vue'
import type { Maladie } from '@/types'
import { getLenis } from '@/composables/useLenis'

/** État partagé (singleton) du panneau de détail maladie. */
const current = ref<Maladie | null>(null)

export function useMaladieModal() {
  function open(maladie: Maladie) {
    current.value = maladie
    document.body.style.overflow = 'hidden'
    // Lenis intercepte la molette globalement : il faut le stopper pour que
    // le panneau (et plus tard la page) puissent défiler normalement.
    getLenis()?.stop()
  }
  function close() {
    current.value = null
    document.body.style.overflow = ''
    getLenis()?.start()
  }
  return { current, open, close }
}
