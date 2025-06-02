<template>
  <div class="relative w-full hero-swiper-container bg-background-primary">
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
      class="myHeroSwiper h-[60vh] md:h-[45vh] lg:h-[45vh]"
    >
      <swiper-slide v-for="(slide, index) in combinedSlides" :key="index">
        <NuxtImg
          :src="slide.image ? slide.image : defaultImageSrc(slide.type)"
          :alt="slide.title || 'Slide image'"
          class="absolute inset-0 w-full h-full object-cover"
          draggable="false"
          densities="1x 2x"
          sizes="100vw md:100vw lg:100vw"
          format="webp"
          :preload="index === 0"
          :loading="index === 0 ? 'eager' : 'lazy'"
          :fetchpriority="index === 0 ? 'high' : 'auto'"
        />
        <div
          :class="[
            'absolute inset-0 bg-gradient-to-t to-transparent z-10',
            getGradientClasses(slide.type), // Dynamiczne klasy dla gradientu
          ]"
        ></div>

        <div class="container mx-auto h-full flex items-end">
          <div
            class="w-full z-20 p-6 sm:p-8 md:p-10 lg:p-12 text-left max-w-xl xl:max-w-2xl"
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
            <NuxtLink
              :to="slide.path"
              :class="[
                'bg-transparent text-white border-2 border-white font-semibold py-2.5 px-6 sm:py-3 sm:px-8 rounded-lg text-sm sm:text-base transition-all duration-300 inline-block shadow-md hover:shadow-lg',
                getButtonHoverClasses(slide.type), // Dynamiczne klasy dla przycisku
              ]"
            >
              Dowiedz się więcej
            </NuxtLink>
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
// import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, /* Navigation, */ Autoplay } from "swiper/modules";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

// Załóżmy, że to jest typ elementu zwracanego przez queryCollection
// Dostosuj go, jeśli Twoje dane mają inną strukturę
interface ContentItem {
  image?: string;
  title: string;
  description?: string;
  path: string;
  // 'type' zostanie dodany dynamicznie lub będzie częścią danych dla "mixed"
  [key: string]: any; // Pozwala na inne pola
}

type SlideType = "afera" | "biznes" | "sport" | "default";

interface Slide extends ContentItem {
  type: SlideType;
}

// --- Dostęp do aktualnej ścieżki ---
const route = useRoute();

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

// --- Zoptymalizowane pobieranie danych ---
// Używamy jednego useAsyncData, którego klucz zależy od ścieżki, aby zapewnić poprawne cache'owanie i odświeżanie.
const { data: fetchedContent, pending: isLoadingSlides } = await useAsyncData<{ items: ContentItem[], sourceType: SlideType | 'mixed' }>(
  `heroSlides-${route.path}`, // Klucz dynamiczny dla useAsyncData
  async () => {
    const currentPath = route.path;
    let items: ContentItem[] = [];
    let sourceType: SlideType | 'mixed' = 'default';

    if (currentPath.startsWith("/afery")) {
      items = await queryCollection("afery").limit(5).all();
      sourceType = "afera";
    } else if (currentPath.startsWith("/biznes")) {
      items = await queryCollection("biznes").limit(5).all();
      sourceType = "biznes";
    } else if (currentPath.startsWith("/sporty")) {
      items = await queryCollection("sporty").limit(5).all();
      sourceType = "sport";
    } else {
      // Strona główna lub inne ścieżki - pokazujemy mieszankę (np. po 1 najnowszym z każdej kategorii)
      const [aferyLeads, biznesLeads, sportyLeads] = await Promise.all([
        queryCollection("afery").limit(1).all(),
        queryCollection("biznes").limit(1).all(),
        queryCollection("sporty").limit(1).all(),
      ]);

      // Dodajemy 'type' bezpośrednio tutaj, ponieważ źródła są różne
      if (aferyLeads && aferyLeads.length > 0) items.push({ ...aferyLeads[0], type: "afera" });
      if (biznesLeads && biznesLeads.length > 0) items.push({ ...biznesLeads[0], type: "biznes" });
      if (sportyLeads && sportyLeads.length > 0) items.push({ ...sportyLeads[0], type: "sport" });
      sourceType = "mixed";
    }
    return { items: items || [], sourceType }; // Zwracamy pustą tablicę jeśli items jest null/undefined
  },
  {
    watch: [() => route.path], // Obserwuj zmiany ścieżki, aby automatycznie odświeżyć dane
  }
);

// --- Logika budowania slajdów na podstawie pobranych danych ---
const combinedSlides = computed<Slide[]>(() => {
  if (!fetchedContent.value || !fetchedContent.value.items) {
    return [];
  }

  const { items, sourceType } = fetchedContent.value;

  if (sourceType === "mixed") {
    // Dla 'mixed', typy zostały już dodane podczas pobierania danych
    return items as Slide[]; // Rzutujemy, zakładając, że struktura jest już poprawna
  } else {
    // Dla specyficznych kategorii ('afera', 'biznes', 'sport'), dodajemy 'type' do każdego elementu
    return items.map(item => ({
      ...item,
      type: sourceType as SlideType, // sourceType tutaj to 'afera', 'biznes' lub 'sport'
    }));
  }
});


// Funkcje pomocnicze getGradientClasses i getButtonHoverClasses pozostają bez zmian
const getGradientClasses = (type: SlideType): string => {
  switch (type) {
    case "afera":
      return "from-red-600/80 via-red-600/40";
    case "sport":
      return "from-sky-600/80 via-sky-600/40";
    case "biznes":
      return "from-accent/80 via-accent/40";
    default:
      return "from-accent/80 via-accent/40";
  }
};

const getButtonHoverClasses = (type: SlideType): string => {
  switch (type) {
    case "afera":
      return "hover:bg-red-600 hover:border-red-600 hover:text-white";
    case "sport":
      return "hover:bg-sky-600 hover:border-sky-600 hover:text-white";
    case "biznes":
      return "hover:bg-accent hover:border-accent hover:text-text-on-accent";
    default:
      return "hover:bg-accent hover:border-accent hover:text-text-on-accent";
  }
};

// --- Logika detekcji urządzenia mobilnego ---
const isMobile = ref(false);
let checkMobileHandler: (() => void) | null = null;

onMounted(() => {
  if (typeof window !== "undefined") {
    checkMobileHandler = () => {
      isMobile.value = window.innerWidth < 768;
    };
    checkMobileHandler();
    window.addEventListener("resize", checkMobileHandler);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined" && checkMobileHandler) {
    window.removeEventListener("resize", checkMobileHandler);
  }
});

// --- Logika wyboru domyślnego obrazka ---
const defaultImageSrc = (type: SlideType): string => {
  // Upewnij się, że obrazy istnieją w katalogu /public
  const basePath = "/images/"; // Ścieżka bazowa do obrazów w katalogu /public
  if (isMobile.value) {
    switch (type) {
      case "afera":
        return `${basePath}aferaMobile.png`;
      case "biznes":{
        console.log(`${basePath}biznesMobile.png`);
        
        return `${basePath}biznesMobile.png`;
      }
      case "sport":
        return `${basePath}sportMobile.png`;
      default:
        return `${basePath}aferaMobile.png`; // Domyślny mobilny
    }
  } else {
    switch (type) {
      case "afera":
        return `${basePath}AFERY.png`;
      case "biznes":
        return `${basePath}BIZNES.png`;
      case "sport":
        return `${basePath}SPORT.png`;
      default:
        return `${basePath}AFERY.png`; // Domyślny desktopowy
    }
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
