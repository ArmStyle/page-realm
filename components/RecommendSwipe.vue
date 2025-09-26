<template>
  <SectionWrapper>
    <div class="flex items-center justify-between mb-3 md:mb-5">
      <div>
        <span class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {{ title }}
        </span>
        <p class="text-xs md:text-base text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
      </div>
      <NuxtLink 
        to="/novels" 
        class="text-sm md:text-base text-primary hover:text-primary-dark font-medium flex items-center gap-2 group"
      >
        ดูทั้งหมด
        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

      <!-- Swiper Container -->
      <div class="relative">
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="2"
          :slides-per-group="2"
          :space-between="16"
          :navigation="{
            nextEl: '.popular-novels-next',
            prevEl: '.popular-novels-prev',
          }"
          :breakpoints="{
            640: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 24,
            }
          }"
          class="popular-novels-swiper"
          @slide-change="onSlideChange"
        >
          <SwiperSlide 
            v-for="novel in novels" 
            :key="novel.id"
          >
            <div 
              class="card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              @click="navigateToNovel(novel.slug)"
            >
              <div class="aspect-[3/4] relative overflow-hidden">
                <img 
                  :src="novel.cover" 
                  :alt="novel.title" 
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                >
                
                <!-- New Badge -->
                <div v-if="novel.isNew" class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  ใหม่
                </div>
                
                <!-- Category Badge -->
                <div class="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                  {{ novel.category }}
                </div>
                
                <!-- Rating -->
                <div class="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                  ⭐{{ novel.rating }}
                </div>
                
                <!-- Gradient overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div class="p-3">
                <h3 class="font-bold text-sm text-gray-800 dark:text-white mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {{ novel.title }}
                </h3>
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  โดย {{ novel.author }}
                </p>
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    📖 {{ novel.chapters }}
                  </span>
                  <span class="flex items-center gap-1">
                    👁️ {{ novel.views }}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Navigation Buttons -->
        <button 
          class="popular-novels-prev absolute top-1/2 -left-6 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'hidden': isBeginning }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          class="popular-novels-next absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'hidden': isEnd }"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
  </SectionWrapper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// Props
const props = defineProps({
  title: {
    type: String,
    default: '🤩นิยายยอดฮิต...ติดใจ'
  },
  subtitle: {
    type: String,
    default: 'อ่านแล้วติดใจ'
  },
  novels: {
    type: Array,
    default: () => []
  }
})

// Reactive states for navigation buttons
const isBeginning = ref(true)
const isEnd = ref(false)

// Navigation function
const navigateToNovel = (slug) => {
  navigateTo(`/detail/${slug}`)
}

// Handle swiper events to update navigation button states
const onSlideChange = (swiper) => {
  isBeginning.value = swiper.isBeginning
  isEnd.value = swiper.isEnd
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hide scrollbar on mobile for cleaner look */
.popular-novels-swiper {
  padding-bottom: 10px;
}

/* Ensure proper spacing on smaller screens */
@media (max-width: 640px) {
  .popular-novels-prev,
  .popular-novels-next {
    display: none;
  }
}
</style>
