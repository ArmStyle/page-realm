export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://mistpageapi-production.up.railway.app/api',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'PageRealm'
    }
  },
  app: {
    head: {
      title: 'PageRealm - อ่านมังงะและนิยายออนไลน์',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'แพลตฟอร์มอ่านมังงะและนิยายออนไลน์ที่ดีที่สุด' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})