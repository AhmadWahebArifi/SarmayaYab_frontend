import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Import translation files
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Load translations using http backend
  .use(HttpApi)
  .init({
    // Fallback language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes
    },

    // Backend configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Resources (fallback for development)
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },

    // Namespaces
    ns: ['translation'],
    defaultNS: 'translation',

    // React options
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added removed',
    },
  });

export default i18n;
