import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/plugins/i18n';

import './assets/main.scss';

const app = createApp(App);

app.use(i18n, ld_{plugin-shortcode}.str);
app.mount('#app');
