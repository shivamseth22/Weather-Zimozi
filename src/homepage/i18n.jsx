// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../langJson/en.json';
import esTranslation from '../langJson/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes strings
    },
  });

export default i18n;
