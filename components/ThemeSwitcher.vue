<template>
  <div class="theme-switcher">
    <button
      @click="toggleTheme"
      type="button"
      title="Zmień motyw"
      class="p-2 md:p-3 rounded-xl border border-border-theme bg-bg-main hover:bg-bg-secondary text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition-colors duration-200"
      aria-label="Przełącz motyw"
    >
      <ClientOnly>
        <span v-if="colorMode.value === 'dark'">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </span>
        <template #fallback>
          <span class="h-5 w-5"></span>
        </template>
      </ClientOnly>
    </button>
  </div>
</template>

<script setup>
// Upewnij się, że useColorMode jest poprawnie zaimportowane, jeśli jest to wymagane przez Twoją wersję Nuxt
// W Nuxt 3 jest zazwyczaj auto-importowane.
const colorMode = useColorMode();

function toggleTheme() {
  if (colorMode.value === 'dark') {
    colorMode.preference = 'light';
  } else {
    colorMode.preference = 'dark';
  }
}
</script>

<style scoped>
.theme-switcher button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* Usunąłem stałą szerokość/wysokość, aby padding kontrolował rozmiar,
     ale możesz je przywrócić, jeśli preferujesz stały rozmiar przycisku.
     np. width: 40px; height: 40px; */
}

/* Dodatkowy styl dla spójności fallbacku, jeśli go używasz */
.theme-switcher button .h-5.w-5 { /* Celuje w fallback span, jeśli ma te klasy */
  display: inline-block; /* Aby zapewnić, że zajmuje miejsce */
}
</style>