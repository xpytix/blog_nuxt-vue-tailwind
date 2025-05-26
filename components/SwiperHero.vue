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
      <swiper-slide v-for="(slide, index) in combinedSlides" :key="index">
        <div
          class="h-full w-full bg-cover bg-center relative"
          :style="{ backgroundImage: `url(${slide.image ? slide.image : '/images/biznes-placeholder.jpg'})` }"
        >
          <div
            :class="[
              'absolute inset-0 bg-gradient-to-t to-transparent z-10',
              getGradientClasses(slide.type) // Dynamiczne klasy dla gradientu
            ]"
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
              :class="[
                'bg-transparent text-white border-2 border-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 inline-block shadow-md hover:shadow-lg',
                getButtonHoverClasses(slide.type) // Dynamiczne klasy dla przycisku
              ]"
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
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation"; // Jeśli nie używasz, można usunąć
import "swiper/css/autoplay";
import { Pagination, /* Navigation, */ Autoplay } from "swiper/modules"; // Navigation zakomentowane, jeśli nieużywane
import { ref, computed } from "vue";
import { useRoute } from 'vue-router'; // Import useRoute

const titleWordLimit = ref(7);
const subtitleWordLimit = ref(15);

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

type SlideType = 'afera' | 'biznes' | 'sport' | 'default';

interface Slide {
  image?: string;
  title: string;
  description?: string;
  path: string;
  type: SlideType;
}

// --- Dostęp do aktualnej ścieżki ---
const route = useRoute();

// --- Sprawdzenie aktualnej ścieżki ---
const isAferyPath = computed(() => route.path.startsWith('/afery'));
const isBiznesPath = computed(() => route.path.startsWith('/biznes'));
const isSportyPath = computed(() => route.path.startsWith('/sporty')); // Załóżmy, że ścieżka to /sporty

// --- Pobieranie danych ---
// Pobieramy do 5 elementów dla każdej kategorii, aby mieć co wyświetlać na stronach kategorii
const { data: aferyData } = await useAsyncData("aferyCollection", () => {
  return queryCollection("afery").limit(5).all();
});

const { data: biznesData } = await useAsyncData("biznesCollection", () => {
  return queryCollection("biznes").limit(5).all(); // Zwiększono limit
});

const { data: sportyData } = await useAsyncData("sportyCollection", () => {
  return queryCollection("sporty").limit(5).all(); // Zwiększono limit
});

// --- Logika budowania slajdów ---
const combinedSlides = computed<Slide[]>(() => {
  const slides: Slide[] = [];

  if (isAferyPath.value) {
    // Jesteśmy na ścieżce /afery, pokazujemy tylko afery
    if (aferyData.value) {
      aferyData.value.forEach(item => {
        slides.push({ ...item, type: 'afera' });
      });
    }
  } else if (isBiznesPath.value) {
    // Jesteśmy na ścieżce /biznes, pokazujemy tylko biznes
    if (biznesData.value) {
      biznesData.value.forEach(item => {
        slides.push({ ...item, type: 'biznes' });
      });
    }
  } else if (isSportyPath.value) {
    // Jesteśmy na ścieżce /sporty, pokazujemy tylko sporty
    if (sportyData.value) {
      sportyData.value.forEach(item => {
        slides.push({ ...item, type: 'sport' });
      });
    }
  } else {
    // Na innych ścieżkach (np. strona główna) - pokazujemy mieszankę
    if (aferyData.value && aferyData.value.length > 0) {
      slides.push({ ...aferyData.value[0], type: 'afera' });
    }
    if (biznesData.value && biznesData.value.length > 0) {
      slides.push({ ...biznesData.value[0], type: 'biznes' });
    }
    if (sportyData.value && sportyData.value.length > 0) {
      slides.push({ ...sportyData.value[0], type: 'sport' });
    }
  }
  return slides;
});

// Funkcje pomocnicze getGradientClasses i getButtonHoverClasses pozostają bez zmian
const getGradientClasses = (type: SlideType): string => {
  switch (type) {
    case 'afera':
      return 'from-red-600/80 via-red-600/40';
    case 'sport':
      return 'from-sky-600/80 via-sky-600/40';
    case 'biznes': // Dodajemy case dla 'biznes', jeśli ma mieć inny kolor niż default
                 // Jeśli 'biznes' ma używać 'accent', to ten case jest opcjonalny
                 // i wystarczy default. Dla spójności, jeśli 'biznes' to 'accent':
      return 'from-accent/80 via-accent/40'; // Zakładamy, że biznes używa domyślnego 'accent'
    default:
      return 'from-accent/80 via-accent/40';
  }
};

const getButtonHoverClasses = (type: SlideType): string => {
  switch (type) {
    case 'afera':
      return 'hover:bg-red-600 hover:border-red-600 hover:text-white';
    case 'sport':
      return 'hover:bg-sky-600 hover:border-sky-600 hover:text-white';
    case 'biznes': // Analogicznie dla przycisku biznes
      return 'hover:bg-accent hover:border-accent hover:text-text-on-accent'; // Zakładamy, że biznes używa domyślnego 'accent'
    default:
      return 'hover:bg-accent hover:border-accent hover:text-text-on-accent';
  }
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