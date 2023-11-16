// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-primevue",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
  ],
  css: ["primevue/resources/themes/lara-light-teal/theme.css"],
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKETURL,
    },
  },
  devtools: { enabled: true },
  primevue: {
    options: {
      ripple: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      prefix: "Prime",
      include: "*",
    },
  },
  ui: {
    icons: ["majesticons", "heroicons", "ph"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/",
      exclude: [],
    },
  },
});
