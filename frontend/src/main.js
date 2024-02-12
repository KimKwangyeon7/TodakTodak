import "./assets/main.css";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { setupCalendar } from 'v-calendar';
import { registerSW } from 'virtual:pwa-register'
import { useMemberStore } from "@/stores/auth";

import App from "./App.vue";
import router from "./router";

// import './registerServiceWorker'

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);

app.use(pinia)
app.use(router)
app.use(setupCalendar, {})

const memberStore = useMemberStore()
memberStore.initializeAuth()

app.mount('#app')


registerSW({ immediate: true })
