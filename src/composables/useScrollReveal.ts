import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Révélation au scroll façon design ALIAMNT : ajoute la classe `.show`
 * aux éléments `.reveal` quand ils entrent dans le viewport.
 *
 * Un seul appel global (dans App.vue) suffit : un MutationObserver capte
 * les nouveaux `.reveal` ajoutés au changement de page.
 */
export function useScrollReveal() {
  let io: IntersectionObserver | null = null
  let mo: MutationObserver | null = null

  onMounted(() => {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show')
            io?.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    const observeAll = (root: ParentNode = document) => {
      root.querySelectorAll('.reveal:not(.show)').forEach((el) => io?.observe(el))
    }
    observeAll()

    // Capte les éléments .reveal ajoutés lors de la navigation entre pages
    mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches?.('.reveal')) io?.observe(node)
          node.querySelectorAll?.('.reveal:not(.show)').forEach((el) => io?.observe(el))
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    io?.disconnect()
    mo?.disconnect()
    io = null
    mo = null
  })
}
