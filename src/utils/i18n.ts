import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appName: 'Know Where at LPNU',
      search: 'Search buildings, departments...',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
      english: 'English',
      ukrainian: 'Українська',
      feedback: 'Feedback',
      submit: 'Submit',
      cancel: 'Cancel',
      departments: 'Departments',
      institutes: 'Institutes',
      viewAll: 'View All',
      address: 'Address',
      workingHours: 'Working Hours',
      contacts: 'Contacts',
      buildRoute: 'Build Route',
      yourLocation: 'Your Location',
      permissionDenied: 'Location permission denied',
      permissionPrompt: 'Please allow location access for routing',
      feedbackForm: 'Feedback Form',
      feedbackName: 'Your Name',
      feedbackEmail: 'Your Email',
      feedbackMessage: 'Your Message',
      feedbackSuccess: 'Thank you for your feedback!',
      showMore: 'Show More',
      showLess: 'Show Less',
      noResults: 'No results found',
      loading: "Loading data",
      route: "Route",
      feedbackError: "An error occurred while sending.",
      geolocation: {
        title: "Location Access",
        message: "This app uses your location to build routes. Please allow access to your location in the browser settings.",
        notSupported: "Your browser does not support geolocation.",
        denied: "You denied the location access request. To allow it, change your browser settings.",
        genericError: "Error: {{error}}",
        waiting: "Waiting for location access...",
        allow: "Allow Access"
      }
    },
  },
  uk: {
    translation: {
      appName: 'Знаю де в НУЛП',
      search: 'Пошук корпусів, кафедр...',
      darkMode: 'Темна тема',
      lightMode: 'Світла тема',
      language: 'Мова',
      english: 'English',
      ukrainian: 'Українська',
      feedback: 'Зворотній зв\'язок',
      submit: 'Надіслати',
      cancel: 'Скасувати',
      departments: 'Кафедри',
      institutes: 'Інститути',
      viewAll: 'Переглянути всі',
      address: 'Адреса',
      workingHours: 'Графік роботи',
      contacts: 'Контакти',
      buildRoute: 'Побудувати маршрут',
      yourLocation: 'Ваше місцезнаходження',
      permissionDenied: 'Доступ до місцезнаходження відхилено',
      permissionPrompt: 'Будь ласка, дозвольте доступ до місцезнаходження для прокладання маршруту',
      feedbackForm: 'Форма зворотного зв\'язку',
      feedbackName: 'Ваше ім\'я',
      feedbackEmail: 'Ваша електронна пошта',
      feedbackMessage: 'Ваше повідомлення',
      feedbackSuccess: 'Дякуємо за ваш відгук!',
      showMore: 'Показати більше',
      showLess: 'Показати менше',
      noResults: 'Результатів не знайдено',
      loading: "Завантажуємо дані",
      route: "Маршрут",
      feedbackError: "Виникла помилка під час відправки.",
      geolocation: {
        title: "Доступ до геолокації",
        message: "Цей додаток використовує ваше місцезнаходження для побудови маршрутів. Будь ласка, дозвольте доступ до геолокації у налаштуваннях браузера.",
        notSupported: "Ваш браузер не підтримує геолокацію.",
        denied: "Ви відхилили запит на доступ до геолокації. Щоб дозволити, змініть налаштування браузера.",
        genericError: "Помилка: {{error}}",
        waiting: "Очікуємо доступ до геолокації...",
        allow: "Дати доступ"
      }
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uk',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
