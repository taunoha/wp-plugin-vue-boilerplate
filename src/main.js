import { createApp } from "vue";
import App from "./App.vue";
import { getConfig } from "@wordpress/interactivity";
import { setLocaleData } from "@/utils/i18n";

import "./assets/scss/main.scss";

const translations = getConfig("{plugin-shortcode}").translations;

setLocaleData(translations);

const app = createApp(App);

app.mount("#{plugin-shortcode}");
