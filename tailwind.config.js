// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
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
      colors: { // Ta sekcja pozostaje taka sama, ponieważ odwołuje się do zmiennych CSS
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'background-primary': 'rgb(var(--color-background-primary) / <alpha-value>)',
        'background-secondary': 'rgb(var(--color-background-secondary) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        // 'text-accent' nie jest już potrzebny, jeśli --color-text-accent było var(--color-primary)
        // a teraz --color-accent jest samodzielnym kolorem. Jeśli chcesz osobny kolor tekstu
        // dla elementów akcentowanych, zdefiniuj --color-text-on-accent.
        'text-on-primary': 'rgb(var(--color-text-on-primary) / <alpha-value>)',
        'text-on-accent': 'rgb(var(--color-text-on-accent) / <alpha-value>)',
        'border-theme': 'rgb(var(--border-color) / <alpha-value>)',
      },
      fontFamily: { // Dodajemy nowe rodziny fontów
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'], // Używamy zmiennej CSS jako pierwszej
        heading: ['var(--font-heading)', '"Dela Gothic One"', 'sans-serif'] // Używamy zmiennej CSS
      }
    },
  },
  plugins: [],
}