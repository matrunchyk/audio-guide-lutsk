import {createApp} from 'vue';
import VueOOP from "vue-oop";
import App from './App.vue'
import { setI18n } from './i18n';
import './index.css';
import router from './router';

const app = createApp(App);
setI18n(app);
// @ts-ignore
app.use(VueOOP, {
    graphql: true,
    schemaUrl: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
    httpEndpoint: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
});
app.use(router);
app.mount('#app');
