<template>
  <div class="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
    <!-- Cover Image -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img 
        :src="item.cover" 
        :alt="item.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      >
      
      <!-- Type Badge -->
      <div class="absolute top-1 left-1">
        <span :class="getTypeBadgeClass(item.type)" class="px-1.5 py-0.5 rounded-full text-xs font-medium">
          {{ getTypeIcon(item.type) }}
        </span>
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-1 right-1">
        <span :class="getStatusBadgeClass(item.status)" class="px-1.5 py-0.5 rounded-full text-xs font-medium">
          {{ getStatusIcon(item.status) }}
        </span>
      </div>
      
      <!-- Rating -->
      <div class="absolute bottom-1 left-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-1">
        <svg class="w-2.5 h-2.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span class="text-white text-xs font-medium">{{ item.rating }}</span>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-2 sm:p-3">
      <!-- Title -->
      <NuxtLink :to="`/detail/${item.slug || item.id}`">
        <h3 class="font-semibold text-gray-800 dark:text-white text-xs sm:text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors leading-tight cursor-pointer">
          {{ item.title }}
        </h3>
      </NuxtLink>
      
      <!-- Author -->
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">
        {{ item.author }}
      </p>
      
      <!-- Stats - Condensed -->
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span class="flex items-center gap-1">
          👁️ {{ formatNumber(item.views) }}
        </span>
        <span class="flex items-center gap-1">
          📚 {{ item.chapters }}
        </span>
      </div>
      
      <!-- Last Update - Only show on hover or larger screens -->
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-2 hidden sm:block">
        {{ formatDate(item.lastUpdate) }}
      </p>
      
      <!-- Action Button - Smaller -->
      <div class="flex gap-1">
        <NuxtLink 
          :to="`/detail/${item.slug || item.id}`"
          class="flex-1 text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-1.5 rounded-md transition-colors text-xs font-medium"
        >
          รายละเอียด
        </NuxtLink>
        <NuxtLink 
          :to="`/read/${item.slug || item.id}`"
          class="flex-1 text-center bg-primary hover:bg-primary-dark text-white py-1.5 rounded-md transition-colors text-xs font-medium"
        >
          อ่าน
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/th'

dayjs.extend(relativeTime)
dayjs.locale('th')

defineProps({
  item: {
    type: Object,
    required: true
  }
})

// Helper functions
const getTypeLabel = (type) => {
  const labels = {
    novel: '📖 นิยาย',
    manga: '🎨 การ์ตูน',
    webtoon: '📱 เว็บตูน'
  }
  return labels[type] || type
}

const getTypeIcon = (type) => {
  const icons = {
    novel: '📖',
    manga: '🎨',
    webtoon: '📱'
  }
  return icons[type] || '📄'
}

const getTypeBadgeClass = (type) => {
  const classes = {
    novel: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    manga: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    webtoon: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
  return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

const getStatusLabel = (status) => {
  const labels = {
    ongoing: 'กำลังแปล',
    completed: 'จบแล้ว',
    hiatus: 'หยุดพัก',
    dropped: 'ยกเลิก'
  }
  return labels[status] || status
}

const getStatusIcon = (status) => {
  const icons = {
    ongoing: '🔄',
    completed: '✅',
    hiatus: '⏸️',
    dropped: '❌'
  }
  return icons[status] || '📊'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    ongoing: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    hiatus: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    dropped: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  }
  return classes[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
}

const getCategoryLabel = (category) => {
  const labels = {
    romance: 'โรแมนซ์',
    action: 'แอ็คชั่น',
    fantasy: 'แฟนตาซี',
    drama: 'ดราม่า',
    comedy: 'ตลก',
    horror: 'สยองขวัญ',
    'slice-of-life': 'ชีวิตประจำวัน',
    adventure: 'ผจญภัย'
  }
  return labels[category] || category
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatDate = (dateString) => {
  return dayjs(dateString).fromNow()
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
</style>
