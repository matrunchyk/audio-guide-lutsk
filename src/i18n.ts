import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from './i18n/messages';

export const setI18n = (app: App<Element>) => {
    const langFromStorage = localStorage.getItem('languageSelected');
    let lang = 'uk';

    if (langFromStorage) {
        lang = langFromStorage;
    }

    const i18n = createI18n({
        locale: lang,
        fallbackLocale: 'uk',
        messages,
        silentFallbackWarn: true,
        globalInjection: true,
    });

    app.use(i18n);
};
