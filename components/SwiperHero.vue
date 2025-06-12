<template>
  <div class="relative w-full hero-swiper-container bg-background-primary">
    <swiper :loop="true" :pagination="{
      type: 'progressbar',
    }" :modules="modules" :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }" class="myHeroSwiper h-[60vh] md:h-[45vh] lg:h-[65vh]">
      <swiper-slide v-for="(slide, index) in slides" :key="index">
        <NuxtImg :src="slide.image" :alt="slide.title || 'Slide image'"
          class="absolute inset-0 w-full h-full object-cover object-center" draggable="false" densities="1x 2x"
          sizes="100vw md:100vw lg:100vw" format="webp" :preload="index === 0" :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'" />
        <div v-if="slide.path" :class="[
          'absolute inset-0 bg-gradient-to-t to-transparent z-10',
          getGradientClasses(slide.path), // Dynamiczne klasy dla gradientu
        ]"></div>

        <div class="container mx-auto h-full flex items-end">
          <div class="w-full z-20 p-6 sm:p-8 md:p-10 lg:p-12 text-left max-w-xl xl:max-w-2xl">
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 md:mb-4 leading-tight text-text-on-accent drop-shadow-md">
              {{ truncateWords(slide.title, titleWordLimit) }}
            </h2>
            <p v-if="slide.description"
              class="text-base sm:text-lg font-sans mb-5 md:mb-6 text-text-on-accent/90 drop-shadow-sm">
              {{ truncateWords(slide.description, subtitleWordLimit) }}
            </p>
            <NuxtLink :to="slide.path" v-if="slide.path" :class="[
              'bg-transparent text-white border-2 border-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 inline-block shadow-md hover:shadow-lg',
              getButtonHoverClasses(slide.path), // Dynamiczne klasy dla przycisku
            ]">
              Dowiedz się więcej
            </NuxtLink>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Pagination, Autoplay } from "swiper/modules";
import type { Article } from "~/types/article";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import "swiper/css/autoplay";
const titleWordLimit = ref(7);
const subtitleWordLimit = ref(15);

const props = defineProps<{
  slides: Article[] | [];
}>();

const getGradientClasses = (path: string): string => {
  if (path.startsWith("/afery")) {
    return "from-red-600/80 via-red-600/40";
  } else if (path.startsWith("/sporty")) {
    return "from-sky-600/80 via-sky-600/40";
  } else if (path.startsWith("/biznes")) {
    return "from-accent/80 via-accent/40";
  } else {
    return "from-accent/80 via-accent/40";
  }
};

const getButtonHoverClasses = (path: string): string => {
  if (path.startsWith("/afery")) {
    return "hover:bg-red-600 hover:border-red-600 hover:text-white";
  } else if (path.startsWith("/sporty")) {
    return "hover:bg-sky-600 hover:border-sky-600 hover:text-white";
  } else if (path.startsWith("/biznes")) {
    return "hover:bg-accent hover:border-accent hover:text-text-on-accent";
  } else {
    return "hover:bg-accent hover:border-accent hover:text-text-on-accent";
  }
};

const truncateWords = (text: string | undefined, limit: number): string => {
  if (!text) {
    return "";
  }
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};

const modules = [Pagination, Autoplay];
</script>

<style>
/* Style CSS pozostają bez zmian */
.hero-swiper-container .swiper-button-next,
.hero-swiper-container .swiper-button-prev {
  color: rgb(var(--color-accent));
  transition: opacity 0.3s ease;
  background-color: rgba(var(--color-background-primary-rgb, 26 26 26) / 0.3);
  padding: 0.5rem;
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  top: 50%;
  transform: translateY(-50%);
}

.hero-swiper-container .swiper-button-next:hover,
.hero-swiper-container .swiper-button-prev:hover {
  opacity: 0.7;
}

.hero-swiper-container .swiper-button-next::after,
.hero-swiper-container .swiper-button-prev::after {
  font-size: 2rem !important;
  font-weight: 800 !important;
}

.hero-swiper-container .swiper-pagination-progressbar {
  position: absolute !important;
  top: auto !important;
  bottom: 0 !important;
  left: 0;
  right: 0;
  width: 100%;
  height: 5px !important;
  background: rgba(var(--color-text-primary-rgb, 200 200 200) / 0.25) !important;
}

.hero-swiper-container .swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: rgb(var(--color-text-primary)) !important;
}
</style>
