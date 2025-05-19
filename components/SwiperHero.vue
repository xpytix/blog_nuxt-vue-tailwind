<template>
  <div class="relative w-full hero-swiper-container">
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
      class="myHeroSwiper h-[60vh] md:h-[75vh] lg:h-[calc(100vh-80px)]"
    >
      <swiper-slide v-for="(slide, index) in posts" :key="index">
        <div
          class="h-full w-full bg-cover bg-center relative"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div
            class="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/40 to-transparent z-10"
          ></div>

          <div
            class="absolute bottom-0 left-0 z-20 p-6 sm:p-8 md:p-10 lg:p-12 text-left max-w-xl xl:max-w-2xl"
          >
            <h2
              class="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3 md:mb-4 leading-tight text-text-on-accent drop-shadow-md"
            >
              {{ truncateWords(slide.title, titleWordLimit) }}
            </h2>
            <p
              v-if="slide.description"
              class="text-base sm:text-lg font-sans mb-5 md:mb-6 text-text-on-accent/90 drop-shadow-sm"
            >
              {{ truncateWords(slide.description, subtitleWordLimit) }}
            </p>
            <a
            :href="slide.path"
              class="bg-transparent hover:bg-accent text-white hover:text-text-on-accent border-2 border-white hover:border-accent font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 inline-block shadow-md hover:shadow-lg"
            >
              Dowiedz się więcej
            </a>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
  // ... (cała sekcja <script setup lang="ts"> pozostaje taka sama jak w poprzedniej odpowiedzi) ...
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';
  import 'swiper/css/autoplay';
  import { Pagination, Navigation, Autoplay } from 'swiper/modules';
  import { ref } from 'vue';

  const titleWordLimit = ref(7);
  const subtitleWordLimit = ref(15);

  const truncateWords = (text: string | undefined, limit: number): string => {
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const { data: posts } = await useAsyncData('blog', () => {
    return queryCollection('blog')
    .limit(3)
    .all()
})

  const modules = [Pagination, Navigation, Autoplay];
</script>

<style>
/* ... (style dla kontrolek Swipera pozostają bez zmian) ... */
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
  background: rgba(
    var(--color-text-primary-rgb, 200 200 200) / 0.25
  ) !important;
}

.hero-swiper-container
  .swiper-pagination-progressbar
  .swiper-pagination-progressbar-fill {
  background: rgb(var(--color-text-primary)) !important;
}
</style>
