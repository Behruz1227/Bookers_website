import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import uz from './i18n/uz.json';
import ru from './i18n/ru.json';
import en from './i18n/en.json';

// Tarjima resurslari
const resources = {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  };

i18n
  .use(LanguageDetector) // Brauzer tilini aniqlash uchun
  .use(initReactI18next) // React integratsiyasi uchun
  .init({
    resources,
    fallbackLng: 'uz', // Standart til
    interpolation: {
      escapeValue: false, // XSS hujumlarini oldini olish uchun
    },
  });

export default i18n;
