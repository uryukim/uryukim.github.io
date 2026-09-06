// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/content',
    '@vueuse/motion/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  icon: {
    clientBundle: { scan: true },
    serverBundle: false,
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  nitro: {
    preset: 'github-pages',
  },
})
