import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../contexts/DarkModeProvider";
import { useLoader } from "../contexts/LoaderProvider";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { darkMode } = useDarkMode();
  const { showLoader, hideLoader } = useLoader();
  const [isChanging, setIsChanging] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
    { code: "fa", name: "دری (Dari)", flag: "🇦🇫", dir: "rtl" },
    { code: "ps", name: "پښتو (Pashto)", flag: "🇦🇫", dir: "rtl" },
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
    <div className="relative">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isChanging}
        className={`appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer transition-all duration-200 ${
          darkMode ? "text-white" : "text-gray-900"
        } ${
          isChanging
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-gray-400 dark:hover:border-gray-500"
        }`}
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        {isChanging ? (
          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        ) : (
          <svg
            className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
