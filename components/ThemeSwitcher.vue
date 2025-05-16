<template>
  <div class="theme-switcher">
    <select id="color-mode-select" v-model="colorMode.preference"
      class="p-2 rounded border bg-background-secondary border-border-theme text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
      <option value="light">Jasny</option>
      <option value="dark">Ciemny</option>
    </select>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
console.log(colorMode.preference);
</script>

<style scoped>
.theme-switcher select {
  min-width: 110px;
  /* Możesz dostosować */
}
</style>
