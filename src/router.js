import { createRouter, createWebHistory } from 'vue-router'
import Game from './components/Game.vue'
import HelloWorld from './components/HelloWorld.vue'
import Practice from './components/practice.vue'
import TermsAndConditions from './components/TermsAndConditions.vue'

const routes = [
  { path: '/', component:HelloWorld},
  { path: '/game', component: Game },
  { path: '/index',component: Practice, props:{charsets:"FJGHRUTYCMVNB"} },
  { path: '//middle',component: Practice, props:{charsets:"DEIKX,"} },
  { path: '/ring',component: Practice, props:{charsets:"LOPSW."} },
  { path: '/little',component: Practice, props:{charsets:"AZQ"} },
  { path: '/terms', component: TermsAndConditions },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router