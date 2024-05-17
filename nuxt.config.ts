// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "nuxt-primevue",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
  ],
  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL,
    },
  },
  devtools: { enabled: true },
  primevue: {
    options: {
      ripple: true,
      unstyled: true,
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {
      prefix: "Prime",
      include: "*",
    },
  },
  // css: ["primevue/resources/themes/lara-light-teal/theme.css"],

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
