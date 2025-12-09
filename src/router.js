import { createRouter, createWebHistory } from 'vue-router'
import Game from './components/Game.vue'
import TermsAndConditions from './components/TermsAndConditions.vue'

const routes = [
  { path: '/', component: Game },
  { path: '/terms', component: TermsAndConditions },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
