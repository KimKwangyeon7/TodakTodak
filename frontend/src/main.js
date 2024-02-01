import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar';
import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'
// import './registerServiceWorker'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(setupCalendar, {})


app.mount('#app')

registerSW({ immediate: true })
