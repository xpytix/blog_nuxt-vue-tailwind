// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // <--- TO JEST KLUCZOWE DLA INTEGRACJI Z @nuxtjs/color-mode
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./error.vue",
    ],
    theme: {
      extend: {
        colors: {
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          'background-primary': 'rgb(var(--color-background-primary) / <alpha-value>)',
          'background-secondary': 'rgb(var(--color-background-secondary) / <alpha-value>)',
          'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
          'text-accent': 'rgb(var(--color-text-accent) / <alpha-value>)',
          'text-on-primary': 'rgb(var(--color-text-on-primary) / <alpha-value>)',
          'text-on-accent': 'rgb(var(--color-text-on-accent) / <alpha-value>)',
          'border-theme': 'rgb(var(--border-color) / <alpha-value>)',
        },
      },
    },
    plugins: [],
  }