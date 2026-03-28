import React from 'react';
import { useTranslation } from 'react-i18next';

// Higher-order component for easy translation
export const withTranslation = (WrappedComponent) => {
  return (props) => {
    const { t, i18n } = useTranslation();
    
    return <WrappedComponent {...props} t={t} i18n={i18n} />;
  };
};

// Custom hook for translation with namespace support
export const useAppTranslation = (namespace = 'translation') => {
  const { t, i18n } = useTranslation(namespace);
  
  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    isRTL: i18n.language === 'ar',
    changeLanguage: i18n.changeLanguage,
  };
};

// Translation helper for common patterns
export const translateWithParams = (t, key, params = {}) => {
  return t(key, { ...params });
};

// Translation helper for plurals
export const translatePlural = (t, key, count, options = {}) => {
  return t(key, { count, ...options });
};

// Translation helper for dates
export const translateDate = (date, options = {}) => {
  const { i18n } = useTranslation();
  return new Intl.DateTimeFormat(i18n.language, options).format(date);
};

// Translation helper for numbers
export const translateNumber = (number, options = {}) => {
  const { i18n } = useTranslation();
  return new Intl.NumberFormat(i18n.language, options).format(number);
};

// Translation helper for currency
export const translateCurrency = (amount, currency = 'USD', options = {}) => {
  const { i18n } = useTranslation();
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency,
    ...options,
  }).format(amount);
};

export default withTranslation;
