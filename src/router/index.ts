import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TransactionsView from '../views/TransactionsView.vue' // <-- Neu importieren

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/transactions', // <-- Unter dieser URL erreichbar
      name: 'transactions',
      component: TransactionsView, // <-- Verweist auf deine neue Datei
    },
  ],
})

export default router
