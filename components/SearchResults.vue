<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div class="animate-pulse">
          <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <div v-for="i in 10" :key="i" class="space-y-3">
              <div class="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else-if="!results.length && !loading" class="bg-white dark:bg-gray-800 rounded-xl p-12 text-center border border-gray-200 dark:border-gray-700">
      <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">ไม่พบผลลัพธ์</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">ลองใช้คำค้นหาอื่น หรือปรับเปลี่ยนตัวกรองการค้นหา</p>
      <div class="space-y-2 text-sm text-gray-500 dark:text-gray-400">
        <p>💡 เคล็ดลับการค้นหา:</p>
        <ul class="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
          <li>ลองใช้คำค้นหาที่สั้นลง</li>
          <li>ตรวจสอบการสะกดคำ</li>
          <li>ใช้คำพ้องความหมาย</li>
          <li>ค้นหาด้วยชื่อผู้แต่ง</li>
        </ul>
      </div>
    </div>

    <!-- Results -->
    <div v-else>
      <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <!-- Results Header -->
        <div class="p-6 border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">
                ผลการค้นหา
              </h2>
              <p class="text-gray-600 dark:text-gray-400">
                พบ {{ total.toLocaleString() }} รายการ
                <span v-if="totalPages > 1">
                  (หน้า {{ currentPage }} จาก {{ totalPages }})
                </span>
              </p>
            </div>
            
          </div>
        </div>

        <!-- Results Grid -->
        <div class="p-4">
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3">
            <ItemCard 
              v-for="item in results" 
              :key="item.id" 
              :item="item"
              class="transform hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="p-6">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="$emit('page-change', $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  results: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 0
  },
  currentSort: {
    type: String,
    default: 'updated'
  }
})

defineEmits(['page-change', 'sort-change'])

const sortOptions = [
  { label: 'อัปเดตล่าสุด', value: 'updated' },
  { label: 'ความนิยม', value: 'popular' },
  { label: 'คะแนน', value: 'rating' },
  { label: 'ชื่อเรื่อง', value: 'title' }
]
</script>
