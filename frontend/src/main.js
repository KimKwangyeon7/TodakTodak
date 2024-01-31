import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'
import './registerServiceWorker'


const app = createApp(App)

if ('serviceWorker' in navigator) {
    registerSW()
}

app.use(createPinia())
app.use(router)

app.mount('#app')

registerSW({ immediate: true })