import ru from './i18n/ru.json'
import uz from './i18n/uz.json'
import sr from './i18n/sr.json'
export default defineI18nConfig(nuxt => ({
    legacy: false,
    fallbackLocale: 'ru',
    locale: 'ru',
    messages: {
        ru,
        uz,
        sr,
    }
}))