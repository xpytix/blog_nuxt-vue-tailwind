<template>
    <div 
      class="w-full py-8 px-4 my-6 bg-background-secondary rounded-xl shadow-lg text-center"
      role="complementary"
      aria-labelledby="partner-label-fullwidth"
    >
      <span 
        id="partner-label-fullwidth" 
        class="block text-sm uppercase tracking-wider text-text-secondary mb-4"
      >
        {{ label }}
      </span>
      
      <div class="flex justify-center">
        <a 
          v-if="partnerLink" 
          :href="partnerLink" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="inline-block transform hover:scale-105 transition-transform duration-300"
          :aria-label="`Link do strony partnera: ${altText || 'Główny Partner'}`"
        >
          <img 
            :src="logoUrl" 
            :alt="altText" 
            class="h-16 max-w-xs object-contain mx-auto" 
            _comment="Większe logo: h-16 (64px), max-w-xs (320px)"
          />
        </a>
        <div v-else class="inline-block">
          <img 
            :src="logoUrl" 
            :alt="altText" 
            class="h-16 max-w-xs object-contain mx-auto"
          />
        </div>
      </div>
  
      <p v-if="partnerName" class="mt-3 text-xs text-text-secondary">
        {{ partnerName }}
      </p>
  
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    logoUrl: string;
    partnerName?: string; // Dodano opcjonalną nazwę partnera
    altText?: string;
    partnerLink?: string;
    label?: string;
  }
  
  withDefaults(defineProps<Props>(), {
    altText: 'Logo Głównego Partnera',
    label: 'Główny Partner:',
    partnerName: '', // Domyślnie puste
  });
  </script>
  
  <style scoped>
  /* max-w-xs to Tailwind class (max-width: 20rem; /* 320px * /) */
  /* h-16 to Tailwind class (height: 4rem; /* 64px * /) */
  /* Nie są potrzebne dodatkowe style CSS, jeśli Tailwind jest poprawnie skonfigurowany. */
  </style>