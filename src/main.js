

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Importing from src/router/index.js
import './assets/my.css';
import './firebase' 

const app = createApp(App);
app.use(router);
app.mount("#app");
