import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { createYmaps } from 'vue-yandex-maps';
import './style.css';

import App from './App.vue';
import router from './router';
import {getEnv} from "@/utils/env";

const yandexMapApiKey = getEnv('YANDEX_MAP_API_KEY')

const app = createApp(App);
app.use(createYmaps({
    apikey: 'c80aebac-faa1-423f-80f2-85abe138d4ef',
}));

app.use(createPinia());
app.use(router);

const authStore = useAuthStore();
authStore.loadState();

app.mount('#app');
