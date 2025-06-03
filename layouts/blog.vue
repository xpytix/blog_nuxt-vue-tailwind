<template>
  <div
    class="bg-background-secondary text-text-primary min-h-screen transition-colors duration-300 ease-in-out"
  >
    <TheHeader />

    <NuxtPage :key="$route.fullPath" />

    <TheFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style></style>
