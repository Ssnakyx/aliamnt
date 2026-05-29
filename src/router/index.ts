import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: () => import('@/views/AProposView.vue'),
    },
    {
      path: '/maladies',
      name: 'maladies',
      component: () => import('@/views/MaladiesView.vue'),
    },
    {
      path: '/maladies/:slug',
      name: 'maladie-detail',
      component: () => import('@/views/MaladieDetailView.vue'),
    },
    {
      path: '/campagnes',
      name: 'campagnes',
      component: () => import('@/views/CampagnesView.vue'),
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('@/views/MediaView.vue'),
    },
    {
      path: '/rejoindre',
      name: 'rejoindre',
      component: () => import('@/views/RejoindreView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
