<template>
    <div class="bg-background-secondary w-full">
      <div class="pl-2 text-xs text-left text-text-secondary mb-1 tracking-wider uppercase">
        <h3>Reklama</h3>
      </div>
      <div 
        class="w-full min-h-[320px] sm:min-h-[320px] bg-background-primary flex items-center justify-center text-text-secondary  rounded-sm"
        aria-label="Miejsce na reklamę Google"
      >
        <span class="text-sm p-2">
          Miejsce na reklamę
          </span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Na razie komponent nie wymaga specjalnej logiki JavaScript.
  // W przyszłości można by dodać propsy do konfiguracji jednostki reklamowej,
  // np. ad-slot, ad-format, ad-responsive itp. oraz logikę do ładowania
  // i obsługi skryptu Google Ads (np. przez <ClientOnly> i hooki cyklu życia).
  </script>
  
  <style scoped>
  /* Możesz dodać tutaj dodatkowe, specyficzne style, jeśli zajdzie taka potrzeba. */
  .min-h-\[60px\] { /* Dla Tailwind JIT, jeśli nie rozpoznaje dynamicznych wartości */
    min-height: 60px;
  }
  .sm\:min-h-\[90px\] {  /* Dla Tailwind JIT */
    @media (min-width: 640px) {
      min-height: 90px;
    }
  }
  </style>