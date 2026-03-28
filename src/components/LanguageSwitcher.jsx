import React from "react";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../contexts/DarkModeProvider";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { darkMode } = useDarkMode();

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
    { code: "fa", name: "دری (Dari)", flag: "�🇫", dir: "rtl" },
    { code: "ps", name: "پښتو (Pashto)", flag: "🇦🇫", dir: "rtl" },
  ];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    // Update document direction for RTL support
    const selectedLanguage = languages.find(
      (lang) => lang.code === languageCode,
    );
    document.documentElement.dir = selectedLanguage?.dir || "ltr";
    document.documentElement.lang = languageCode;
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className={`appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${
          darkMode ? "text-white" : "text-gray-900"
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
      </div>
    </div>
  );
};

export default LanguageSwitcher;
