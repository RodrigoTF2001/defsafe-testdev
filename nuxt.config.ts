// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@pinia/nuxt'
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' 
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' 
    }
  },
  
  runtimeConfig: {
    public: {
      admin_email: process.env.ADMIN_EMAIL,
      user_email: process.env.USER_EMAILS,
    },
  }
})