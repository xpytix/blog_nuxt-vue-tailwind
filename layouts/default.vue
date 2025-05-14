<template>
  <div>
    <TheHeader />

    <main><slot></slot></main>

    <!-- <TheFooter /> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
main {
  background-color: antiquewhite;
}
</style>
