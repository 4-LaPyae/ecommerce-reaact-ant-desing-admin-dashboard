import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Initialize the i18next library with multiple plugins
i18n
	.use(Backend) // Use the HTTP backend for loading translation resources
	.use(LanguageDetector) // Use the browser language detector
	.use(initReactI18next) // Initialize i18next for React
	.init({
		lng: 'en',
		fallbackLng: 'en', // Set the fallback language to English
		debug: false, // Enable debug mode for development
		ns: ['form', 'validation', 'sidebar'], // Define namespaces for translations
		defaultNS: 'form', // Set the default namespace
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json', // Adjust the path for loading translation files
		},
	});

export default i18n