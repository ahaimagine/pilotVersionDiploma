import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation';
import ukTranslation from './locales/uk/translation';

// Get saved language from localStorage or use browser language or default to Ukrainian
const savedLanguage = localStorage.getItem('language') || 
  (navigator.language.startsWith('uk') ? 'uk' : 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      uk: {
        translation: ukTranslation
      }
    },
    lng: savedLanguage,
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;