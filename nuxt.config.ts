// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  tailwindcss: {
    // Opcjonalnie: jeśli Twój główny plik CSS nie jest w standardowej lokalizacji
    // lub nie nazywa się tailwind.css
    cssPath: "~/assets/css/themes.css", // Upewnij się, że to jest plik z dyrektywami @tailwind i zmiennymi motywów
    configPath: "tailwind.config", // Domyślna ścieżka do tailwind.config.js/ts
    // exposeConfig: false, // Domyślnie
    // injectPosition: 0, // Domyślnie
    // viewer: true, // Domyślnie w trybie dev
  }
});
