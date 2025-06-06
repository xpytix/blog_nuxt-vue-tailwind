<template>
  <div class="relative w-full content-swiper-container my-8 not-prose">
    <swiper
      :loop="true"
      :pagination="{
        type: 'progressbar',
      }"
      :modules="modules"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      class="myContentSwiper aspect-video rounded-md shadow-md"
    >
      <swiper-slide v-for="(image, index) in props.items" :key="index">
        <NuxtImg
          :src="image"
          :alt="'Slide image ' + (index + 1)"
          class="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          densities="1x 2x"
          sizes="100vw sm:70vw md:600px lg:700px"
          format="webp"
          :preload="index === 0"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
        <div
          v-if="route.path"
          :class="[
            'absolute inset-0 bg-gradient-to-t to-transparent z-10',
            getGradientClasses(route.path), // Dynamiczne klasy dla gradientu
          ]"
        ></div>
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

const route = useRoute();
console.log(route.path);

const props = defineProps<{
  items: string[];
}>();
console.log(props.items);

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


const modules = [Pagination, Autoplay];
</script>

<style>
/* ZMIANA: Wszystkie selektory zostały zaktualizowane z '.hero-swiper-container' na '.content-swiper-container' */
.content-swiper-container .swiper-button-next,
.content-swiper-container .swiper-button-prev {
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

.content-swiper-container .swiper-button-next:hover,
.content-swiper-container .swiper-button-prev:hover {
  opacity: 0.7;
}

.content-swiper-container .swiper-button-next::after,
.content-swiper-container .swiper-button-prev::after {
  font-size: 2rem !important;
  font-weight: 800 !important;
}

.content-swiper-container .swiper-pagination-progressbar {
  position: absolute !important;
  top: auto !important;
  bottom: 0 !important;
  left: 0;
  right: 0;
  width: 100%;
  height: 5px !important;
  background: rgba(
    var(--color-text-primary-rgb, 200 200 200) / 0.25
  ) !important;
}

.content-swiper-container
  .swiper-pagination-progressbar
  .swiper-pagination-progressbar-fill {
  background: rgb(var(--color-text-primary)) !important;
}
</style>