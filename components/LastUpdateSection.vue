<template>
  <SectionWrapper>
    <!-- Last Updates Section -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200/50 dark:border-gray-700/50">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <div class="icon-bg w-10 h-10 text-white rounded-lg flex items-center justify-center mr-3">
            🔄
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ computedSubtitle }}</p>
          </div>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          อัปเดตเมื่อ: {{ formatLastUpdate(lastUpdateTime) }}
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-light-card flex items-center gap-3 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02]"
          @click="navigateToDetail(item.slug)"
        >
          <!-- Cover Image -->
          <img
            :src="item.cover"
            :alt="item.title"
            class="w-12 h-16 object-cover rounded shadow-sm"
          />
          
          <!-- Item Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-gray-800 dark:text-white text-sm truncate">
              {{ item.title }}
            </h4>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
              {{ item.author }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="chapter-badge text-xs px-2 py-0.5 rounded-full">ตอนที่ {{ item.latestChapter }}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500">{{ item.updateTime }}</span>
            </div>
          </div>
          
          <!-- Update Badge -->
          <div class="update-badge text-xs px-2 py-1 rounded-full font-medium">
            อัปเดต
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="mt-6 text-center">
        <button
          @click="$emit('loadMore')"
          class="load-more-btn px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
          :disabled="loading"
        >
          {{ loading ? 'กำลังโหลด...' : 'โหลดเพิ่มเติม' }}
        </button>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
// Props
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  showLoadMore: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'อัปเดตล่าสุด'
  },
  subtitle: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['loadMore', 'itemClick'])

// Data
const lastUpdateTime = ref(new Date())

// Computed
const computedSubtitle = computed(() => {
  return props.subtitle || `${props.items.length} รายการล่าสุด`
})

// Methods
const navigateToDetail = (slug) => {
  emit('itemClick', slug)
  navigateTo(`/${slug}`)
}

const formatLastUpdate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'เมื่อสักครู่'
  if (minutes < 60) return `${minutes} นาทีที่แล้ว`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ชั่วโมงที่แล้ว`
  
  const days = Math.floor(hours / 24)
  return `${days} วันที่แล้ว`
}

// Update time every minute
onMounted(() => {
  setInterval(() => {
    lastUpdateTime.value = new Date()
  }, 60000)
})

// Auto refresh every 5 minutes
onMounted(() => {
  if (process.client) {
    setInterval(() => {
      // Emit refresh event to parent
      emit('refresh')
    }, 300000) // 5 minutes
  }
})
</script>

<style scoped>
/* Theme-aware backgrounds and colors */
.section-bg {
  /* Light theme */
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}

.dark .section-bg {
  /* Dark theme */
  background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%);
  border: 1px solid rgba(55, 65, 81, 0.5);
}

.icon-bg {
  background: linear-gradient(135deg, #f97316, #ea580c);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.dark .icon-bg {
  background: linear-gradient(135deg, #fb923c, #f97316);
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.2);
}

.item-bg {
  /* Light theme */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(229, 231, 235, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.item-bg:hover {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(209, 213, 219, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.dark .item-bg {
  /* Dark theme */
  background: rgba(55, 65, 81, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(75, 85, 99, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dark .item-bg:hover {
  background: rgba(75, 85, 99, 0.8);
  border: 1px solid rgba(107, 114, 128, 0.5);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.chapter-badge {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #dbeafe;
}

.dark .chapter-badge {
  background: rgba(30, 58, 138, 0.3);
  color: #93c5fd;
  border: 1px solid rgba(29, 78, 216, 0.5);
}

.update-badge {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #dcfce7;
}

.dark .update-badge {
  background: rgba(20, 83, 45, 0.3);
  color: #86efac;
  border: 1px solid rgba(21, 128, 61, 0.5);
}

.load-more-btn {
  background: linear-gradient(to right, #f97316, #ea580c);
  color: white;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.load-more-btn:hover:not(:disabled) {
  background: linear-gradient(to right, #ea580c, #dc2626);
  transform: scale(1.05);
}

.dark .load-more-btn {
  background: linear-gradient(to right, #fb923c, #f97316);
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.2);
}

.dark .load-more-btn:hover:not(:disabled) {
  background: linear-gradient(to right, #f97316, #ea580c);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Responsive backgrounds for different screen sizes */
@media (max-width: 768px) {
  .section-bg {
    background: linear-gradient(to bottom, #f9fafb, #ffffff);
  }
  
  .dark .section-bg {
    background: linear-gradient(to bottom, #1f2937, #111827);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .section-bg {
    background: white;
    border: 2px solid #111827;
  }
  
  .dark .section-bg {
    background: #111827;
    border: 2px solid white;
  }
  
  .item-bg {
    background: white;
    border: 2px solid #d1d5db;
  }
  
  .dark .item-bg {
    background: #1f2937;
    border: 2px solid #6b7280;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .item-bg,
  .load-more-btn {
    transition: none;
  }
  
  .load-more-btn:disabled {
    animation: none;
  }
  
  .item-bg:hover {
    transform: none;
  }
}

/* Print styles */
@media print {
  .section-bg {
    background: white !important;
    border: 1px solid #d1d5db;
  }
  
  .item-bg {
    background: #f9fafb !important;
    border: 1px solid #e5e7eb;
  }
  
  .load-more-btn {
    display: none;
  }
}

/* Custom scrollbar with theme support */
.grid::-webkit-scrollbar {
  width: 6px;
}

.grid::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.dark .grid::-webkit-scrollbar-track {
  background: #1f2937;
}

.grid::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 3px;
}

.dark .grid::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.grid::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

.dark .grid::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Animation keyframes */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Focus styles for accessibility */
.item-bg:focus-visible,
.load-more-btn:focus-visible {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}

.dark .item-bg:focus-visible,
.dark .load-more-btn:focus-visible {
  outline: 2px solid #fb923c;
}

/* Supporting CSS custom properties for theme variables */
:root {
  --section-bg-light: linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #f3f4f6 100%);
  --section-bg-dark: linear-gradient(135deg, #1f2937 0%, #374151 50%, #111827 100%);
  --item-bg-light: rgba(255, 255, 255, 0.8);
  --item-bg-dark: rgba(55, 65, 81, 0.6);
  --shadow-light: rgba(0, 0, 0, 0.05);
  --shadow-dark: rgba(0, 0, 0, 0.3);
}

/* Automatic theme detection */
@media (prefers-color-scheme: light) {
  .section-bg {
    background: var(--section-bg-light);
  }
  
  .item-bg {
    background: var(--item-bg-light);
    box-shadow: 0 2px 8px var(--shadow-light);
  }
}

@media (prefers-color-scheme: dark) {
  .section-bg {
    background: var(--section-bg-dark);
  }
  
  .item-bg {
    background: var(--item-bg-dark);
    box-shadow: 0 2px 8px var(--shadow-dark);
  }
}
</style>
