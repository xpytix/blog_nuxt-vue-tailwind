<template>
    <div class="news-ticker-container bg-accent text-white flex items-center overflow-hidden whitespace-nowrap">
      <span 
        class="ticker-content py-2" 
        :style="{ animationDuration: speed }"
        aria-hidden="true" >
        {{ concatenatedItems }}
      </span>
      <span 
        class="ticker-content py-2" 
        :style="{ animationDuration: speed }"
        aria-live="off" >
        {{ concatenatedItems }}
      </span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    items: string[];
    speed?: string; // np. "20s", "30s" - kontroluje czas trwania jednego cyklu animacji
    separator?: string; // Separator między elementami tablicy
  }
  
  const props = withDefaults(defineProps<Props>(), {
    items: () => ['To jest domyślna wiadomość numer 1!', 'A to wiadomość numer 2!'], // Przykładowe dane
    speed: '30s', // Domyślna prędkość (czas trwania animacji)
    separator: ' \u2022 ', // Domyślny separator to punktor (•) otoczony spacjami
  });
  
  const concatenatedItems = computed(() => {
    if (!props.items || props.items.length === 0) {
      return 'Brak wiadomości do wyświetlenia... '; // Fallback + spacja na końcu dla płynności
    }
    // Dodajemy separator na końcu każdego elementu, w tym ostatniego, dla płynnego przejścia
    return [...props.items, ...props.items].map(item => `${item}${props.separator}`).join(' ');
  });
  
  </script>
  
  <style>
  /* Ważne: @keyframes najlepiej umieścić w globalnym pliku CSS lub w bloku <style> bez atrybutu 'scoped',
    aby animacja była poprawnie rozpoznawana. Jeśli jest w komponencie, <style> nie może być 'scoped'.
  */
  
  @keyframes marqueeEffect {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%); /* Przesuwa jeden pełny blok treści w lewo */
    }
  }
  
  .news-ticker-container {
    /* Kontener zapewnia, że widzimy tylko jeden "okienko" przewijającej się treści */
  }
  
  .ticker-content {
    display: inline-block; /* Umożliwia transformację i poprawne wymiary */
    animation: marqueeEffect linear infinite;
    /* animation-duration jest ustawiane dynamicznie przez :style="animationDuration" */
    /* padding-right: wartości separatora jest już w concatenatedItems */
  }
  </style>