import { LogLevel } from '@sentry/types/dist/loglevel';
import {createApp} from 'vue';
import VueOOP from "vue-oop";
import VueGtag from "vue-gtag";
import App from './App.vue'
import { setI18n } from './i18n';
import './index.css';
import router from './router';
import './registerServiceWorker';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App);

setI18n(app);

// @ts-ignore
app.use(VueOOP, {
    graphql: true,
    schemaUrl: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
    httpEndpoint: process.env.VUE_APP_API_ENDPOINT_GRAPHQL,
});

app.use(VueGtag, {
  config: { id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID || '' }
});

Sentry.init({
  app,
  debug: process.env.VUE_APP_SENTRY_DSN,
  logLevel: LogLevel.Debug,
  dsn: process.env.VUE_APP_SENTRY_DSN || "",
  beforeSend: (event, hint) => {
    if (process.env.VUE_APP_SENTRY_DEBUG && hint) {
      setTimeout(() => console.error(hint.originalException || hint.syntheticException), 0);
    }
    return event;
  },
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: [process.env.VUE_APP_DOMAIN_NAME || '', /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(router);
app.mount('#app');
