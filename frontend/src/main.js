import "./assets/main.css";

<<<<<<< HEAD
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { setupCalendar } from "v-calendar";
import { registerSW } from "virtual:pwa-register";
=======
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { setupCalendar } from 'v-calendar';
import { registerSW } from 'virtual:pwa-register'
>>>>>>> aa5d36e815f60e1aaaf8927b6596c340ca11dcf6
import { useMemberStore } from "@/stores/auth";

import App from "./App.vue";
import router from "./router";

// import './registerServiceWorker'

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(setupCalendar, {});
const memberStore = useMemberStore();
memberStore.initializeAuth();

app.mount("#app");

<<<<<<< HEAD
registerSW({ immediate: true });
=======
app.use(pinia)
app.use(router)
app.use(setupCalendar, {})

const memberStore = useMemberStore()
memberStore.initializeAuth()

app.mount('#app')


registerSW({ immediate: true })
>>>>>>> aa5d36e815f60e1aaaf8927b6596c340ca11dcf6
