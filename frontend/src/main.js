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

<<<<<<< HEAD
app.use(pinia)
app.use(router)
app.use(setupCalendar, {})
=======
app.use(pinia);
app.use(router);
app.use(setupCalendar, {});
>>>>>>> dc236b114173158445046248e288320843a14931

const memberStore = useMemberStore()
memberStore.initializeAuth()

app.mount('#app')


registerSW({ immediate: true })
