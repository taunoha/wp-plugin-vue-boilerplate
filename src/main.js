import { createApp } from 'vue';
import Root from './App.vue';
import i18n from '@/plugins/i18n';
import './assets/scss/main.scss';

const App = createApp(Root);

App.use(i18n);
App.mount('#ld-{plugin-shortcode}');
