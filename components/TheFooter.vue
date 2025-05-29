<template>
    <footer class="bg-background-secondary border-t border-border-theme text-text-secondary">
      <div class="container mx-auto px-4 py-8 text-center sm:text-left">
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div class="text-sm">
            &copy; {{ new Date().getFullYear() }} Moodzik.pl. Wszelkie prawa zastrzeżone.
          </div>
  
          <!-- <div class="flex space-x-4">
            <a href="#" class="hover:text-primary transition-colors" aria-label="Facebook">
              <Icon name="mdi:facebook" size="20" />
            </a>
            <a href="#" class="hover:text-primary transition-colors" aria-label="Instagram">
              <Icon name="mdi:instagram" size="20" />
            </a>
            <a href="#" class="hover:text-primary transition-colors" aria-label="Twitter">
              <Icon name="mdi:twitter" size="20" />
            </a>
          </div> -->
  
        </div>
  
        <div class="mt-6 pt-6 border-t border-border-theme/50 text-xs text-center text-text-secondary/70">
          <NuxtLink to="/polityka-prywatnosci" class="hover:text-primary transition-colors">Polityka Prywatności</NuxtLink>
          <span class="mx-2">|</span>
          <NuxtLink to="/regulamin" class="hover:text-primary transition-colors">Regulamin</NuxtLink>
        </div>
  
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  // Jeśli używasz nuxt-icon, powinien być auto-importowany.
  // W przeciwnym razie musiałbyś zaimplementować komponent Icon lub użyć SVG.
  
  // import Icon from '~/components/Icon.vue'; // Przykład, jeśli masz własny komponent ikon
  </script>
  
  <style scoped>
  /* Możesz dodać dodatkowe style specyficzne dla stopki, jeśli potrzebujesz */
  footer a {
    /* Możesz dodać tu wspólne style dla linków w stopce, np. podkreślenie przy hover */
  }
  </style>