import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { maladies } from '@/data/maladies'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
  }
}

const SITE_NAME = 'ALIAMNT'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'La santé, une priorité africaine',
        description: "ALIAMNT — Association africaine de prévention des maladies non transmissibles. Sensibiliser, éduquer, mobiliser la jeunesse africaine.",
      },
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: () => import('@/views/AProposView.vue'),
      meta: {
        title: 'À propos',
        description: "Découvrez l'histoire, les valeurs et l'équipe d'ALIAMNT, association de jeunes Africains engagés contre les maladies non transmissibles.",
      },
    },
    {
      path: '/maladies',
      name: 'maladies',
      component: () => import('@/views/MaladiesView.vue'),
      meta: {
        title: 'Les maladies',
        description: 'Hypertension, diabète, AVC, cancer… Comprendre les 9 maladies non transmissibles qui frappent l\'Afrique pour mieux les prévenir.',
      },
    },
    {
      path: '/maladies/:slug',
      name: 'maladie-detail',
      component: () => import('@/views/MaladieDetailView.vue'),
      meta: { title: 'Maladie' },
    },
    {
      path: '/campagnes',
      name: 'campagnes',
      component: () => import('@/views/CampagnesView.vue'),
      meta: {
        title: 'Nos campagnes',
        description: 'De #NonAuPuff à Octobre Rose : découvrez les campagnes de sensibilisation menées par ALIAMNT et leur impact sur le terrain.',
      },
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('@/views/MediaView.vue'),
      meta: {
        title: 'Médias & publications',
        description: 'Nos publications, visuels de campagne et contenus éducatifs sur la santé, pensés pour la jeunesse africaine.',
      },
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('@/views/EvaluationView.vue'),
      meta: {
        title: 'Test Santé — Évalue ton risque',
        description: 'En 3 minutes, évalue ton exposition aux maladies non transmissibles et reçois des conseils de prévention personnalisés.',
      },
    },
    {
      path: '/rejoindre',
      name: 'rejoindre',
      component: () => import('@/views/RejoindreView.vue'),
      meta: {
        title: 'Rejoindre le mouvement',
        description: 'Bénévole, donateur ou partenaire : rejoignez ALIAMNT et devenez acteur de la prévention santé en Afrique.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: {
        title: 'Contact',
        description: 'Une question, un partenariat, une idée ? Contactez l\'équipe ALIAMNT.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page introuvable' },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // top instantané : Lenis gère le lissage, et la page entrante anime déjà son contenu
    return { top: 0 }
  },
})

router.afterEach((to) => {
  let title = to.meta.title
  let description = to.meta.description

  // Titre dynamique pour les pages maladie
  if (to.name === 'maladie-detail') {
    const maladie = maladies.find(m => m.slug === to.params.slug)
    if (maladie) {
      title = `${maladie.nom} — comprendre et prévenir`
      description = maladie.accroche
    }
  }

  document.title = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — La santé, une priorité africaine`

  if (description) {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', description)
  }
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute('content', document.title)
})

export default router
