// components/ThemeSwitcher.vue
<template>
  <div class="theme-switcher p-4">
    <label for="color-mode-select" class="mr-2 text-text-secondary"
      >Motyw:</label
    >
    <select
      id="color-mode-select"
      v-model="colorMode.preference"
      class="p-2 rounded border bg-background-secondary border-border-theme text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <option value="system">Systemowy</option>
      <option value="light">Jasny</option>
      <option value="dark">Ciemny</option>
    </select>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
</script>
