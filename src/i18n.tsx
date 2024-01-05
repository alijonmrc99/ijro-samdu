import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationUzbek from './common/translation/uz/translation.json'
import translationRussian from './common/translation/ru/translation.json'

const resources = {
    uz: {
        translation: translationUzbek,
    },
    ru: {
        translation: translationRussian
    }
}
i18next
    .use(initReactI18next)
    .init({
        debug: false,
        resources,
        lng: 'uz'
    })

export default i18next;