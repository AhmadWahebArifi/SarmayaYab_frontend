import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

// Import translation files
import enTranslations from "./locales/en.json";
import faTranslations from "./locales/fa.json";
import psTranslations from "./locales/ps.json";

// Language configuration with directions
const languages = {
  en: { name: "English", dir: "ltr" },
  fa: { name: "دری (Dari)", dir: "rtl" },
  ps: { name: "پښتو (Pashto)", dir: "rtl" },
};

// Function to set document direction
const setDocumentDirection = (languageCode) => {
  const language = languages[languageCode] || languages.en;
  document.documentElement.dir = language.dir;
  document.documentElement.lang = languageCode;
  document.body.dir = language.dir;

  // Add no-transition class temporarily
  document.body.classList.add("no-transition");

  // Remove it after a short delay to prevent initial load animations
  setTimeout(() => {
    document.body.classList.remove("no-transition");
  }, 100);
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Load translations using http backend
  .use(HttpApi)
  .init({
    // Fallback language
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    // Detection options
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },

    // Interpolation
    interpolation: {
      escapeValue: false, // React already escapes
    },

    // Backend configuration
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    // Resources (fallback for development)
    resources: {
      en: {
        translation: enTranslations,
      },
      fa: {
        translation: faTranslations,
      },
      ps: {
        translation: psTranslations,
      },
    },

    // Namespaces
    ns: ["translation"],
    defaultNS: "translation",

    // React options
    react: {
      useSuspense: false,
      bindI18n: "languageChanged",
      bindI18nStore: "added removed",
    },
  });

// Set initial direction
setDocumentDirection(i18n.language);

// Listen for language changes
i18n.on("languageChanged", (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
