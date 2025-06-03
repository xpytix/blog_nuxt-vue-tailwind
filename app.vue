<template>
  <div class="h-full">
    <NuxtLayout>
      <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Nie jest konieczne importowanie useRoute(), ponieważ $route jest dostępne w szablonie.
// Jeśli jednak potrzebowałbyś obiektu route w logice <script setup> dla innych celów,
// możesz go odkomentować:
// const route = useRoute();
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* background-color: black; */ /* Poprawiona składnia CSS, jeśli to było zamierzone tło. */
                                /* Pamiętaj, że to ustawi czarne tło dla WSZYSTKICH elementów, */
                                /* co może nie być pożądane i nadpisywać style z Tailwind/themes.css. */
                                /* Rozważ usunięcie tego, jeśli tło ma być kontrolowane przez klasy Tailwind i themes.css. */
}
</style>