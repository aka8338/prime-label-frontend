import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en', // Default language
    debug: false, // Enable debugging in development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Avoid issues with Suspense
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Load translation files from the public folder
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'], // Cache the selected language in localStorage and cookies
    },
    cache: {
      enabled: true, // Enable caching of translations
      prefix: 'i18next_res_',
      expirationTime: 24 * 60 * 60 * 1000, // Cache translations for 24 hours
    },
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn(`Missing translation for ${key} in ${lng}`);
    },
  });

export default i18n;
