// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@nuxt/image"],
  nitro: {
    prerender: {
      // Ignoruj ścieżki związane z Netlify Image CDN
      // Możesz użyć bardziej ogólnego wzorca, jeśli masz inne podobne problemy
      ignore: [
        '/.netlify/images' // Dodanie tego powinno pomóc
      ],
      // Opcjonalnie, jeśli crawlLinks powoduje problemy, można by go wyłączyć,
      // ale wtedy musisz jawnie zdefiniować wszystkie trasy do prerenderowania w 'routes'.
      // crawlLinks: false,
    }
  },
  image: {
    formats: ["avif", "webp", "jpeg", "png", "svg"],
    quality: 80,
    
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
  },
  tailwindcss: {
    cssPath: "~/assets/css/themes.css",
    configPath: "tailwind.config",
  },
  colorMode: {
    preference: "system", // Ustawienie początkowe, możesz też dać 'light'
    fallback: "light", // Jeśli 'system' nie może być określony
    classSuffix: "", // BARDZO WAŻNE: Zapewnia klasy .light i .dark
    // storageKey: 'nuxt-color-mode' // Domyślna nazwa klucza w localStorage
  },
  googleFonts: {
    // Konfiguracja dla google-fonts
    families: {
      Inter: [400, 500, 600, 700], // Wybierz potrzebne wagi
      "Dela Gothic One": [400], // Ta czcionka często ma tylko regularną wagę (400)
    },
    display: "swap", // Poprawia szybkość ładowania
    prefetch: true,
    preconnect: true,
    preload: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'pl', // Zachowujemy istniejące atrybuty HTML
      },
      title: 'Blog', // Zachowujemy istniejący tytuł
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'test' }, // Zachowujemy istniejący opis
        { name: 'robots', content: 'noindex, nofollow' } // DODANY TAG
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }], // Zachowujemy istniejący link do favicony
    },
  },
});
