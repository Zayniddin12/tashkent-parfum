// https://v3.nuxtjs.org/api/configuration/nuxt.config
import ru from './i18n/ru.json'
import uz from './i18n/uz.json'
import sr from './i18n/sr.json'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'canonical',
          href: 'https://toshkent-parfum.uz/',
        },
      ],
      title: 'Toshkent Parfum',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=0',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Сайт сетевого парфюмерного магазина Toshkent Parfum',
        },
        {
          name: 'description',
          content: 'Сайт сетевого парфюмерного магазина Toshkent Parfum',
        },
        {
          hid: 'og:image',
          name: 'image',
          property: 'og:image',
          content: '/og-image.png',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://tash-parfum.uz',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Toshkent Parfum',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=GT-NGK5KK64`, // Replace with your Google Analytics ID
          async: true,
        },
        {
          children: `window.dataLayer = window.dataLayer || []; 
          function gtag(){dataLayer.push(arguments);} 
          gtag('js', new Date()); 
          gtag('config', 'GT-NGK5KK64');`,
        },
      ],
    },
  },
  build: {
    transpile: ['vue-toastification', 'vue-demi'],
  },
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:3000', // Ensure this points to the correct server
    },
  },
  components: [
    { path: '~/components/', extensions: ['vue'] },
    {
      path: '~/components/Layout/Header',
      prefix: 'layout',
      extensions: ['vue'],
    },
  ],
  css: ['@/assets/styles/main.css', '@/assets/icomoon/style.css'],
  devServerHandlers: [],
  i18n: {
    locales: ['ru', 'uz', 'sr'],
    defaultLocale: 'ru',
    vueI18n: {
      fallbackLocale: 'ru',
      messages: {
        ru,
        uz,
        sr,
      },
    },

    // vueI18n: './i18n.config.ts', // if you are using custom path, default
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
      alwaysRedirect: true,
    },
  },
  image: {
    format: 'webp',
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxt/image-edge',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxtjs/i18n',
  ],
  robots: {
    rules: {
      UserAgent: '*',
      Allow: ['/offers', '/contact', '/models'],
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },
})
