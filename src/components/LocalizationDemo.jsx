import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppTranslation } from '../i18n/translationHelpers';
import LanguageSwitcher from './LanguageSwitcher';
import { useDarkMode } from '../contexts/DarkModeProvider';

const LocalizationDemo = () => {
  const { t, i18n, currentLanguage, isRTL } = useAppTranslation();
  const { darkMode } = useDarkMode();
  const [count, setCount] = useState(5);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header with Language Switcher */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('localization.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('localization.subtitle')}
            </p>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Current Language Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            {t('localization.currentLanguage')}:
          </h3>
          <div className="flex items-center gap-4 text-blue-800 dark:text-blue-200">
            <span>Code: {currentLanguage}</span>
            <span>Direction: {isRTL ? 'RTL' : 'LTR'}</span>
            <span>Flag: {currentLanguage === 'ar' ? '🇸🇦' : '🇺🇸'}</span>
          </div>
        </div>

        {/* Basic Translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('localization.basicTranslations')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Common:</span>
                <span className="font-medium">{t('common.save')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Navigation:</span>
                <span className="font-medium">{t('navigation.dashboard')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Auth:</span>
                <span className="font-medium">{t('auth.login')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Dashboard:</span>
                <span className="font-medium">{t('dashboard.totalRequests')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Stock Requests:</span>
                <span className="font-medium">{t('stockRequests.title')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Settings:</span>
                <span className="font-medium">{t('settings.title')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parameterized Translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('localization.parameterizedTranslations')}
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                {t('localization.requestCount')}:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCount(Math.max(0, count - 1))}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  -
                </button>
                <span className="font-medium w-12 text-center">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm">
                {t('dashboard.lastRequests', { count })}
              </p>
              <p className="text-sm">
                {t('dashboard.createdBy', { name: 'John Doe' })}
              </p>
              <p className="text-sm">
                {t('dashboard.createdAt', { 
                  date: new Date().toLocaleDateString(), 
                  time: new Date().toLocaleTimeString() 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Status Translations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('localization.statusTranslations')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('stockRequests.priorities._title')}:
              </h4>
              {['urgent', 'high', 'normal', 'low'].map((priority) => (
                <div key={priority} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    priority === 'normal' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {t(`stockRequests.priorities.${priority}`)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                {t('stockRequests.statuses._title')}:
              </h4>
              {['pending', 'approved', 'dispatched', 'delivered', 'rejected'].map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    status === 'approved' ? 'bg-green-100 text-green-800' :
                    status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                    status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {t(`stockRequests.statuses.${status}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('localization.interactiveDemo')}
          </h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              {['en', 'ar'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentLanguage === lang
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang === 'ar' ? '🇸🇦 العربية' : '🇺🇸 English'}
                </button>
              ))}
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium mb-2">{t('stockRequests.form.title')}</h3>
              <div className="space-y-2 text-sm">
                <div>{t('stockRequests.form.priority')}: {t('stockRequests.priorities.normal')}</div>
                <div>{t('stockRequests.form.expectedDelivery')}: {new Date().toLocaleDateString()}</div>
                <div>{t('stockRequests.form.notes')}: {t('common.loading')}...</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  {t('stockRequests.form.submitRequest')}
                </button>
                <button className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-sm">
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalizationDemo;
