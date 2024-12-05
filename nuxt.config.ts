// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL;
const siteName = "SnapShot";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    baseURL: baseURL,
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: siteName,
      link: [
        {
          rel: 'icon',
          href: baseURL + 'images/favicon.ico',
        },
        {
          as: 'font',
          href: '/fonts/Space_Mono/SpaceMono-Italic.ttf',
          type: 'font/ttf',
          crossorigin: 'anonymous',
          preload: true,
        },
        {
          as: 'font',
          href: '/fonts/Space_Mono/SpaceMono-Regular.ttf',
          type: 'font/ttf',
          crossorigin: 'anonymous',
          preload: true,
        },
        {
          as: 'font',
          href: '/fonts/Space_Mono/SpaceMono-Bold.ttf',
          type: 'font/ttf',
          crossorigin: 'anonymous',
          preload: true,
        },
        {
          as: 'font',
          href: '/fonts/Space_Mono/SpaceMono-BoldItalic.ttf',
          type: 'font/ttf',
          crossorigin: 'anonymous',
          preload: true,
        },
      ]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_fonts.scss" as *;' +
           '@use "@/assets/scss/_vars.scss" as *;' +
           '@use "@/assets/scss/_shared.scss" as *;'

        }
      }
    }
  },


})
