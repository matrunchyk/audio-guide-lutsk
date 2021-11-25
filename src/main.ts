import {createApp} from 'vue';
import VueOOP from "vue-oop";
import VueGtag from "vue-gtag";
import App from './App.vue'
import { setI18n } from './i18n';
import './index.css';
import router from './router';
import './registerServiceWorker';

const app = createApp(App);
setI18n(app);
// @ts-ignore
app.use(VueOOP, {
    graphql: true,
    schemaUrl: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
    httpEndpoint: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
});
// @ts-ignore
app.use(VueGtag, {
  config: { id: "UA-2918085-54" }
});
app.use(router);
app.mount('#app');
