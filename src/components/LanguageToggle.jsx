import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../contexts/DarkModeProvider";
import { useLoader } from "../contexts/LoaderProvider";

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { darkMode } = useDarkMode();
  const { showLoader, hideLoader } = useLoader();
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      flag: "🇺🇸",
      dir: "ltr",
    },
    { code: "fa", name: "Dari", nativeName: "دری", flag: "🇦🇫", dir: "rtl" },
    { code: "ps", name: "Pashto", nativeName: "پښتو", flag: "🇦🇫", dir: "rtl" },
  ];

  const handleLanguageChange = async (languageCode) => {
    if (isChanging || languageCode === i18n.language) return;

    setIsChanging(true);

    // Show loading state
    showLoader(i18n.t("loader.changingLanguage"), true);

    try {
      // Add a small delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Change language
      await i18n.changeLanguage(languageCode);

      // Update document direction for RTL support
      const selectedLanguage = languages.find(
        (lang) => lang.code === languageCode,
      );

      // Update document attributes
      document.documentElement.dir = selectedLanguage?.dir || "ltr";
      document.documentElement.lang = languageCode;

      // Update body direction for comprehensive RTL support
      document.body.dir = selectedLanguage?.dir || "ltr";

      // Add transition class for smooth layout changes
      document.body.classList.add("direction-transition");

      // Remove transition class after animation
      setTimeout(() => {
        document.body.classList.remove("direction-transition");
      }, 500);

      // Save to localStorage
      localStorage.setItem("i18nextLng", languageCode);
      localStorage.setItem("selectedDirection", selectedLanguage?.dir || "ltr");
    } catch (error) {
      console.error("Error changing language:", error);
    } finally {
      setIsChanging(false);
      hideLoader();
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
          {i18n.t("settings.selectLanguage")}
        </label>
        <div className="grid grid-cols-1 gap-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isChanging}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left relative overflow-hidden ${
                i18n.language === language.code
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
              } ${
                isChanging ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"
              }`}
            >
              {isChanging && i18n.language === language.code && (
                <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center">
                  <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{language.flag}</span>
                  <div>
                    <div
                      className={`font-medium ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {language.nativeName}
                    </div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {language.name}
                    </div>
                  </div>
                </div>
                {i18n.language === language.code && !isChanging && (
                  <div className="flex items-center">
                    <svg
                      className={`w-5 h-5 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div
                className={`text-xs mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {language.dir === "rtl" ? "RTL" : "LTR"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div
        className={`p-3 rounded-lg transition-all duration-300 ${
          darkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <div className="flex items-center space-x-2">
          <svg
            className={`w-4 h-4 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {i18n.t("settings.currentLanguage")}: {currentLanguage.nativeName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;
