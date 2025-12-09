import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import jquery from 'jquery'

window.$ = window.jQuery = jquery

const app = createApp(App)
app.use(router)
app.mount('#app')
