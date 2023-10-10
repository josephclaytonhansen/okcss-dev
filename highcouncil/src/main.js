import {createApp} from "vue";
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;
import "./style.css";
import App from "./App.vue";
createApp(App).mount("#app");