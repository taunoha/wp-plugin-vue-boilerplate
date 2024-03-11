import { createApp } from "vue";
import App from "./App.vue";
import i18n from "@/plugins/i18n";

import "./assets/main.scss";

const app = createApp(App);

app.use(i18n, window.{plugin}.str);
app.use(i18n, {plugin}.str);
app.mount("#{plugin-shortcode}");
