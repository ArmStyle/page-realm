<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <!-- Search Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">ค้นหาเนื้อหา</h1>
        
        <!-- Search Form -->
        <form @submit.prevent="performSearch" class="space-y-4">
          <!-- Keyword Search -->
          <BaseInput
            v-model="filters.keyword"
            label="คำค้นหา"
            placeholder="พิมพ์ชื่อเรื่อง ผู้แต่ง หรือคำค้นหา..."
            variant="search"
            class="focus:ring-2 focus:ring-primary/20"
            input-class="text-lg"
          >
            <template #icon>
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </template>
          </BaseInput>

          <!-- Filter Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Content Type -->
            <BaseSelect
              v-model="filters.type"
              label="ประเภท"
              :options="typeOptions"
              placeholder="ทั้งหมด"
            />

            <!-- Category -->
            <BaseSelect
              v-model="filters.category"
              label="หมวดหมู่"
              :options="categoryOptions"
              placeholder="ทั้งหมด"
            />

            <!-- Status -->
            <BaseSelect
              v-model="filters.status"
              label="สถานะ"
              :options="statusOptions"
              placeholder="ทั้งหมด"
            />

            <!-- Sort By -->
            <BaseSelect
              v-model="filters.sortBy"
              label="จัดเรียงตาม"
              :options="sortOptions"
            />
          </div>

          <!-- Search Button -->
          <div class="flex justify-center pt-4">
            <BaseButton
              type="submit"
              :loading="isLoading"
              loading-text="กำลังค้นหา..."
              text="ค้นหา"
              size="lg"
              class="px-12 shadow-lg hover:shadow-xl transform transition-all duration-200"
            >
              <template #icon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </template>
            </BaseButton>
          </div>
        </form>
      </div>

      <!-- Search Results -->
      <SearchResults 
        :results="searchResults"
        :loading="isLoading"
        :total="totalResults"
        :current-page="currentPage"
        :total-pages="totalPages"
        :current-sort="filters.sortBy"
        @page-change="handlePageChange"
        @sort-change="handleSortChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// SEO
useHead({
  title: 'ค้นหา - PageRealm',
  meta: [
    { name: 'description', content: 'ค้นหานิยาย การ์ตูน และเว็บตูนที่คุณชื่นชอบ' }
  ]
})

const route = useRoute()
const router = useRouter()

// Reactive data
const isLoading = ref(false)
const searchResults = ref([])
const totalResults = ref(0)
const currentPage = ref(1)
const totalPages = ref(0)

// Search filters
const filters = ref({
  keyword: '',
  type: '',
  category: '',
  status: '',
  sortBy: 'updated'
})

// Options for selects
const typeOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'นิยาย', value: 'novel' },
  { label: 'การ์ตูน', value: 'manga' },
  { label: 'เว็บตูน', value: 'webtoon' }
]

const categoryOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'โรแมนซ์', value: 'romance' },
  { label: 'แอ็คชั่น', value: 'action' },
  { label: 'แฟนตาซี', value: 'fantasy' },
  { label: 'ดราม่า', value: 'drama' },
  { label: 'ตลก', value: 'comedy' },
  { label: 'สยองขวัญ', value: 'horror' },
  { label: 'ชีวิตประจำวัน', value: 'slice-of-life' },
  { label: 'ผจญภัย', value: 'adventure' }
]

const statusOptions = [
  { label: 'ทั้งหมด', value: '' },
  { label: 'กำลังแปล', value: 'ongoing' },
  { label: 'จบแล้ว', value: 'completed' },
  { label: 'หยุดพัก', value: 'hiatus' },
  { label: 'ยกเลิก', value: 'dropped' }
]

const sortOptions = [
  { label: 'อัปเดตล่าสุด', value: 'updated' },
  { label: 'เพิ่มล่าสุด', value: 'created' },
  { label: 'ความนิยม', value: 'popular' },
  { label: 'คะแนน', value: 'rating' },
  { label: 'ชื่อเรื่อง', value: 'title' },
  { label: 'จำนวนการอ่าน', value: 'views' }
]

// Methods
const performSearch = async () => {
  if (!filters.value.keyword.trim() && !filters.value.type && !filters.value.category && !filters.value.status) {
    return
  }

  isLoading.value = true
  
  try {
    // Update URL with search parameters
    const query = {
      ...filters.value,
      page: currentPage.value
    }
    
    // Remove empty values
    Object.keys(query).forEach(key => {
      if (!query[key]) delete query[key]
    })
    
    await router.push({ 
      path: '/search', 
      query 
    })

    // Simulate API call - replace with actual API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock search results
    const mockResults = generateMockResults()
    searchResults.value = mockResults.data
    totalResults.value = mockResults.total
    totalPages.value = Math.ceil(mockResults.total / 30)
    
  } catch (error) {
    console.error('Search error:', error)
  } finally {
    isLoading.value = false
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
  performSearch()
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSortChange = (newSort) => {
  filters.value.sortBy = newSort
  currentPage.value = 1
  performSearch()
}

const generateMockResults = () => {
  const mockItems = []
  const titles = [
    'เกิดใหม่เป็นลูกครึ่งยักษ์', 'จอมมารผู้ยิ่งใหญ่', 'นักดาบใต้ฟ้า',
    'เทพเซียนกับนางฟ้า', 'สงครามมังกร', 'ราชาแห่งปีศาจ',
    'ตำนานดาบเทพ', 'หอคอยมรณะ', 'เทพธิดาแห่งน้ำแข็ง',
    'นักสู้พิทักษ์โลก', 'จักรพรรดิหิน', 'ดวงใจแผ่นดิน'
  ]
  
  for (let i = 0; i < 30; i++) {
    mockItems.push({
      id: i + 1,
      title: titles[i % titles.length] + ` ${Math.floor(i / titles.length) + 1}`,
      author: `ผู้แต่ง ${String.fromCharCode(65 + (i % 26))}`,
      type: ['novel', 'manga', 'webtoon'][i % 3],
      category: ['romance', 'action', 'fantasy', 'drama'][i % 4],
      status: ['ongoing', 'completed', 'hiatus'][i % 3],
      cover: `https://picsum.photos/300/400?random=${i + 1}`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      views: Math.floor(Math.random() * 100000) + 10000,
      chapters: Math.floor(Math.random() * 200) + 10,
      lastUpdate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      description: `เรื่องราวที่น่าติดตาม เต็มไปด้วยการผจญภัยและความลุ้นระทึก ที่จะทำให้คุณไม่อยากหยุดอ่าน...`
    })
  }
  
  return {
    data: mockItems,
    total: 150 + Math.floor(Math.random() * 300) // Random total between 150-450
  }
}

// Initialize search from URL params
onMounted(() => {
  // Get search parameters from URL
  if (route.query.q) {
    filters.value.keyword = route.query.q
  }
  if (route.query.type) {
    filters.value.type = route.query.type
  }
  if (route.query.category) {
    filters.value.category = route.query.category
  }
  if (route.query.status) {
    filters.value.status = route.query.status
  }
  if (route.query.sortBy) {
    filters.value.sortBy = route.query.sortBy
  }
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page) || 1
  }
  
  // Perform search if there are any filters
  if (route.query.q || route.query.type || route.query.category || route.query.status) {
    performSearch()
  }
})

// Watch for route changes
watch(() => route.query, (newQuery) => {
  if (route.path === '/search') {
    currentPage.value = parseInt(newQuery.page) || 1
  }
})
</script>
