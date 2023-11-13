// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-primevue", "@pinia/nuxt", "@nuxtjs/supabase"],
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/lara-light-teal/theme.css",
  ],
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKETURL,
    },
  },
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
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ui: {
    icons: ["majesticons", "heroicons", "ph"],
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
