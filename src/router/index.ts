import { createRouter, createWebHistory } from 'vue-router'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/login/callback', name: 'callback', component: LoginCallback },
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    {
      path: '/verlauf',
      name: 'verlauf',
      component: () => import('../views/VerlaufView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoryView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(navigationGuard)

export default router
