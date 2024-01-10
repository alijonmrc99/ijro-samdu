import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationUzbek from './common/translation/uz/translation.json'
import translationRussian from './common/translation/ru/translation.json'
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    uz: {
        translation: translationUzbek,
    },
    ru: {
        translation: translationRussian
    }
}
export const lang: string = localStorage.getItem("i18nextLng") || "uz";
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // fallbackLng: 'uz',
        debug: false,
        resources,
        // lng: 'uz'
    })

i18next.changeLanguage(lang)

export default i18next;