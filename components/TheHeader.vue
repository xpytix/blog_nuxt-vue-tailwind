<template>
  <header class="bg-background-secondary shadow-md sticky top-0 z-40">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <NuxtLink
        to="/"
        class="text-2xl font-bold text-primary hover:text-secondary transition-colors"
      >
        Moodzik.pl
      </NuxtLink>

      <nav class="hidden md:block">
        <ul class="flex space-x-4 lg:space-x-6 items-center">
          <li v-for="category in categories" :key="category.slug">
            <NuxtLink
              :to="`/${category.slug}`"
              class="text-text-secondary hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
              active-class="text-primary bg-primary/10"
            >
              {{ category.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="md:hidden">
        <button
          @click="toggleMobileMenu"
          class="text-text-primary focus:outline-none p-2 rounded-md hover:bg-primary/10"
          aria-label="Otwórz menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 z-50 bg-background-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-6"
      @click.self="closeMobileMenu"
      _comment="zamyka menu po kliknięciu na tło"
    >
      <button
        @click="closeMobileMenu"
        class="absolute top-4 right-4 text-text-primary focus:outline-none p-2 rounded-md hover:bg-primary/10"
        aria-label="Zamknij menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-7 h-7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <nav class="flex flex-col items-center space-y-6">
        <NuxtLink
          to="/"
          @click="closeMobileMenu"
          class="text-2xl text-text-primary hover:text-primary transition-colors"
          active-class="text-primary font-semibold"
        >
          Strona Główna
        </NuxtLink>
        <NuxtLink
          v-for="category in categories"
          :key="category.slug"
          :to="`/${category.slug}`"
          @click="closeMobileMenu"
          class="text-2xl text-text-primary hover:text-primary transition-colors"
          active-class="text-primary font-semibold"
        >
          {{ category.name }}
        </NuxtLink>
      </nav>
      <p class="mt-12 text-sm text-text-secondary">
        Moodzik &copy; {{ new Date().getFullYear() }}
      </p>
      <ThemeSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router"; // Import useRoute
import ThemeSwitcher from "./ThemeSwitcher.vue";
const categories = ref([
  { name: "Biznes", slug: "biznes" },
  { name: "Afery", slug: "afery" },
  { name: "Sport", slug: "sport" },
]);

const isMobileMenuOpen = ref(false);
const route = useRoute(); // Użyj useRoute do obserwowania zmian ścieżki

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Obserwuj zmiany w isMobileMenuOpen, aby zablokować/odblokować scrollowanie strony
watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    // Upewnij się, że kod działa tylko po stronie klienta
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

// Zamknij menu mobilne przy zmianie ścieżki (np. po kliknięciu linku w menu)
// Ta funkcjonalność jest już obsłużona przez @click="closeMobileMenu" na linkach w mobilnym menu,
// ale dodanie tego watchera jest dobrym zabezpieczeniem, jeśli linki byłyby dodawane inaczej.
watch(
  () => route.path,
  () => {
    if (isMobileMenuOpen.value) {
      closeMobileMenu();
    }
  }
);

// Opcjonalnie: Usuń blokadę scrolla, gdy komponent jest odmontowywany, a menu było otwarte
// import { onUnmounted } from 'vue';
// onUnmounted(() => {
//   if (process.client && isMobileMenuOpen.value) {
//     document.body.style.overflow = '';
//   }
// });
</script>

<style scoped>
/* Dodatkowe style, jeśli są potrzebne, np. dla bardziej zaawansowanych animacji */
/* Możesz dodać animacje wejścia/wyjścia dla menu mobilnego używając <Transition> z Vue */

/* Przykład dla `active-class` - Tailwind nie zawsze dobrze radzi sobie z dynamicznym łączeniem klas w `active-class` */
/* Jeśli `text-primary bg-primary/10` nie działa jak oczekiwano w active-class,
   możesz potrzebować bardziej złożonego bindowania klas lub niestandardowego CSS.
   Jednak dla prostych przypadków powinno być OK. */
.sticky {
  position: sticky;
}
</style>
