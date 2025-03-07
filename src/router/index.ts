import { createRouter, createWebHistory } from 'vue-router'
import config from '@/config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('../views/MessageView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/spa',
      name: 'spa',
      component: () => import('../views/SpaView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/HomeView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = config.siteName
  next()
})

export default router
