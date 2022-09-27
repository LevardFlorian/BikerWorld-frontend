import { createApp } from "vue";
import 'reset-css';
import App from "./App.vue";
// on importe notre router
import customRouter from './router.js';
import store from './store.js';


const app = createApp(App);
// on utilise le router défini dans router.js
// avec app.use on rend le router accessible partout dans l'application
app.use(customRouter);
app.use(store);
app.mount("#app");