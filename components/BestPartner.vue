<template>
  <div
    class="container mx-auto px-4 pt-6"
    role="complementary"
    aria-labelledby="partner-label-teaser"
  >
    <div class="
      flex items-center
      bg-background-primary 
      border border-accent rounded-lg shadow-lg 
      p-4 sm:p-6 
      relative bg-gradient-to-t from-accent/15 to-transparent 
      dark:from-accent/55 dark:to-accent/5
      ">
      <div class="w-1/4 flex-shrink-0 flex justify-center items-center">
        <a
          v-if="partnerLink"
          :href="partnerLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block transform hover:scale-105 transition-transform duration-300"
          :aria-label="`Link do strony partnera: ${partnerName || altText || 'Partner'}`"
        >
          <img
            :src="logoUrl"
            :alt="altText"
            class="h-12 sm:h-14 md:h-16 object-contain w-auto max-w-full"
          />
        </a>
        <div v-else class="inline-block">
          <img
            :src="logoUrl"
            :alt="altText"
            class="h-12 sm:h-14 md:h-16 object-contain w-auto max-w-full"
          />
        </div>
      </div>

      <div class="w-px bg-border-theme bg-primary  self-stretch mx-4 sm:mx-6" aria-hidden="true"></div>

      <div class="text-left flex-1">
        <span
          id="partner-label-teaser"
          class="block text-xs sm:text-sm uppercase tracking-wider text-accent" 
        >
          {{ label }}
        </span>
        <p v-if="partnerName" class="text-lg sm:text-xl md:text-2xl font-bold text-primary leading-tight mt-1">
          {{ partnerName }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  logoUrl: string;
  partnerName?: string;
  altText?: string;
  partnerLink?: string;
  label?: string;
}

withDefaults(defineProps<Props>(), {
  altText: 'Logo Partnera',
  label: 'Miejsce dla Głównego Partner Moodzik.pl',
  // partnerName: 'Moodzik.pl', 
});
</script>

<style scoped>
/* Dodatkowe style nie powinny być potrzebne */
</style>