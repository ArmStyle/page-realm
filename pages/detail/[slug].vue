<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Hero Section with Cover -->
    <section class="relative py-8 md:py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid lg:grid-cols-3 gap-8 items-start">
            <!-- Cover Image -->
            <div class="lg:col-span-1">
              <div class="sticky top-4">
                <div class="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                  <img 
                    :src="item.cover" 
                    :alt="item.title"
                    class="w-full h-full object-cover rounded-2xl shadow-2xl"
                  >
                  <!-- Type Badge -->
                  <div class="absolute top-4 left-4">
                    <span :class="getTypeBadgeClass(item.type)" class="px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      {{ getTypeIcon(item.type) }} {{ item.type }}
                    </span>
                  </div>
                  <!-- Status Badge -->
                  <div class="absolute top-4 right-4">
                    <span :class="getStatusBadgeClass(item.status)" class="px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                      {{ getStatusIcon(item.status) }} {{ item.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Info -->
            <div class="lg:col-span-2 space-y-6">
              <!-- Title and Basic Info -->
              <div>
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {{ item.title }}
                </h1>
                
                <div class="flex flex-wrap items-center gap-4 mb-6">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-lg font-semibold text-gray-700 dark:text-gray-300">{{ item.rating }}</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">({{ formatNumber(item.review) }} รีวิว)</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatNumber(item.views) }} การดู</span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatNumber(item.likes) }} ถูกใจ</span>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-6">
                  <span v-for="genre in item.genres" :key="genre" 
                    class="px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light rounded-full text-sm font-medium">
                    {{ genre }}
                  </span>
                </div>
              </div>

              <!-- Author and Additional Info -->
              <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">ผู้เขียน</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.author }}</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">สถานะ</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.status }}</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">จำนวนตอน</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.chapter }} ตอน</p>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">อัปเดตล่าสุด</h3>
                    <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ formatDate(item.lastUpdate) }}</p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink 
                  :to="`/read/${item.slug}`"
                  class="flex-1 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold text-lg text-center transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  เริ่มอ่าน
                </NuxtLink>
                
                <button 
                  @click="toggleBookmark"
                  :class="[
                    'flex-1 px-6 py-4 rounded-xl font-bold text-lg text-center transition-all flex items-center justify-center gap-2',
                    isBookmarked 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  {{ isBookmarked ? 'ลบจากรายการ' : 'เพิ่มในรายการ' }}
                </button>
                
                <button 
                  @click="toggleLike"
                  :class="[
                    'px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2',
                    isLiked 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200'
                  ]"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                  </svg>
                  {{ isLiked ? 'ยกเลิกถูกใจ' : 'ถูกใจ' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="container mx-auto px-4 py-8 max-w-6xl">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">เรื่องย่อ</h2>
            <div class="prose prose-gray dark:prose-invert max-w-none">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </section>

          <!-- Chapters List -->
          <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">รายชื่อตอน</h2>
              <div class="flex items-center gap-2">
                <button 
                  @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="sortOrder === 'asc' ? 'M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4' : 'M7 4v12m0 0l4-4m-4 4l-4-4m6 4v-12m0 0l-4 4m4-4l4 4'" />
                  </svg>
                  {{ sortOrder === 'asc' ? 'เรียงจากเก่าไปใหม่' : 'เรียงจากใหม่ไปเก่า' }}
                </button>
              </div>
            </div>
            
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div 
                v-for="chapter in sortedChapters" 
                :key="chapter.id"
                class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                <div class="flex-1">
                  <NuxtLink 
                    :to="`/read/${item.slug}/${chapter.slug}`"
                    class="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors"
                  >
                    ตอนที่ {{ chapter.number }}: {{ chapter.title }}
                  </NuxtLink>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    อัปเดต: {{ formatDate(chapter.publishedAt) }}
                  </p>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="chapter.isNew" class="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium rounded-full">
                    ใหม่
                  </span>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          <!-- Reviews Section -->
          <section class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">รีวิวและความคิดเห็น</h2>
              <button class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors">
                เขียนรีวิว
              </button>
            </div>
            
            <!-- Rating Summary -->
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <div class="text-3xl font-bold text-gray-900 dark:text-white">{{ item.rating }}</div>
                  <div class="flex items-center justify-center gap-1 mb-1">
                    <svg v-for="i in 5" :key="i" :class="[
                      'w-4 h-4',
                      i <= Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    ]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">จาก {{ formatNumber(item.review) }} รีวิว</div>
                </div>
                <div class="flex-1 space-y-2">
                  <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center gap-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400 w-8">{{ rating }}★</span>
                    <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        class="bg-yellow-400 h-2 rounded-full" 
                        :style="{ width: getRatingPercentage(rating) + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
                      {{ getRatingPercentage(rating) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Reviews List -->
            <div class="space-y-4">
              <div 
                v-for="review in item.reviews.slice(0, 5)" 
                :key="review.id"
                class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
              >
                <div class="flex items-start gap-4">
                  <img 
                    :src="review.user.avatar" 
                    :alt="review.user.name"
                    class="w-10 h-10 rounded-full object-cover"
                  >
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-medium text-gray-900 dark:text-white">{{ review.user.name }}</span>
                      <div class="flex items-center gap-1">
                        <svg v-for="i in 5" :key="i" :class="[
                          'w-4 h-4',
                          i <= review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                        ]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(review.createdAt) }}</span>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Quick Stats -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">สถิติ</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">อันดับ</span>
                <span class="font-semibold text-gray-900 dark:text-white">#{{ item.rank }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">ยอดดู</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatNumber(item.views) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">ถูกใจ</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatNumber(item.likes) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">รีวิว</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ formatNumber(item.reviewCount) }}</span>
              </div>
            </div>
          </div>

          <!-- Related Items -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">เรื่องที่เกี่ยวข้อง</h3>
            <div class="space-y-4">
              <div 
                v-for="related in relatedItems" 
                :key="related.id"
                class="flex gap-3 group"
              >
                <NuxtLink :to="`/detail/${related.slug}`" class="flex-shrink-0">
                  <img 
                    :src="related.cover" 
                    :alt="related.title"
                    class="w-16 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  >
                </NuxtLink>
                <div class="flex-1 min-w-0">
                  <NuxtLink 
                    :to="`/detail/${related.slug}`"
                    class="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                  >
                    {{ related.title }}
                  </NuxtLink>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ related.author }}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ related.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Share -->
          <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">แชร์</h3>
            <div class="flex gap-2">
              <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                Facebook
              </button>
              <button class="flex-1 bg-sky-500 hover:bg-sky-600 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                Twitter
              </button>
              <button class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                LINE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/th'

dayjs.locale('th')

// Get route params
const route = useRoute()
const slug = route.params.slug

// Sample data - replace with actual API call
const item = ref({
  id: 1,
  slug: slug,
  title: "เทพธิดาแห่งความมืด",
  author: "นักเขียนลึกลับ",
  type: "Novel",
  status: "กำลังเขียน",
  rating: 4.8,
  review: 2847,
  reviewCount: 2847,
  views: 1205847,
  likes: 45678,
  rank: 3,
  chapter: 127,
  lastUpdate: "2024-01-15",
  cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
  genres: ["แฟนตาซี", "ผจญภัย", "โรแมนติก", "ดราม่า"],
  description: "ในโลกที่ถูกปกคลุมด้วยความมืดมิด เทพธิดาผู้ยิ่งใหญ่ได้ตื่นขึ้นจากการหลับใหลยาวนาน เธอต้องเผชิญหน้ากับความท้าทายที่ไม่เคยพบมาก่อน ในขณะที่พลังชั่วร้ายกำลังคุกคามโลกใบนี้ การเดินทางของเธอจะพาเราไปสู่การผจญภัยที่เต็มไปด้วยความลึกลับ ความรัก และการต่อสู้ครั้งยิ่งใหญ่ที่จะกำหนดชะตากรรมของมนุษยชาติ",
  chapters: [
    { id: 1, number: 1, title: "การตื่นขึ้นของเทพธิดา", slug: "chapter-1", publishedAt: "2024-01-01", isNew: false },
    { id: 2, number: 2, title: "พลังแห่งความมืด", slug: "chapter-2", publishedAt: "2024-01-03", isNew: false },
    { id: 3, number: 3, title: "การเผชิญหน้าครั้งแรก", slug: "chapter-3", publishedAt: "2024-01-05", isNew: true },
    // Add more chapters as needed
  ],
  reviews: [
    {
      id: 1,
      user: { 
        name: "อ่านแล้วเพลิน", 
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
      },
      rating: 5,
      comment: "เรื่องนี้เขียนได้ดีมาก ตัวละครมีมิติ และโครงเรื่องน่าติดตาม รอตอนต่อไปอย่างใจจดใจจ่อ",
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      user: { 
        name: "Novel Lover", 
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" 
      },
      rating: 4,
      comment: "ชอบสไตล์การเขียนมาก แต่อยากให้เพิ่มรายละเอียดของตัวละครรองบ้าง",
      createdAt: "2024-01-08"
    }
  ]
})

const relatedItems = ref([
  {
    id: 2,
    slug: "dragon-warrior",
    title: "นักสู้มังกร",
    author: "เพนกวิน",
    rating: 4.6,
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=300&fit=crop"
  },
  {
    id: 3,
    slug: "magic-academy",
    title: "โรงเรียนเวทมนตร์",
    author: "นางฟ้าป่า",
    rating: 4.7,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
  }
])

// Reactive states
const isBookmarked = ref(false)
const isLiked = ref(false)
const sortOrder = ref('desc')

// Computed
const sortedChapters = computed(() => {
  const chapters = [...item.value.chapters]
  return chapters.sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return a.number - b.number
    } else {
      return b.number - a.number
    }
  })
})

// Methods
const toggleBookmark = () => {
  isBookmarked.value = !isBookmarked.value
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY')
}

const getTypeBadgeClass = (type) => {
  const classes = {
    'Novel': 'bg-blue-500 text-white',
    'Manga': 'bg-green-500 text-white',
    'Comic': 'bg-purple-500 text-white'
  }
  return classes[type] || 'bg-gray-500 text-white'
}

const getTypeIcon = (type) => {
  const icons = {
    'Novel': '📚',
    'Manga': '🎌',
    'Comic': '💫'
  }
  return icons[type] || '📖'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'กำลังเขียน': 'bg-green-500 text-white',
    'จบแล้ว': 'bg-blue-500 text-white',
    'หยุดชั่วคราว': 'bg-yellow-500 text-white',
    'ยกเลิก': 'bg-red-500 text-white'
  }
  return classes[status] || 'bg-gray-500 text-white'
}

const getStatusIcon = (status) => {
  const icons = {
    'กำลังเขียน': '🔄',
    'จบแล้ว': '✅',
    'หยุดชั่วคราว': '⏸️',
    'ยกเลิก': '❌'
  }
  return icons[status] || '📝'
}

const getRatingPercentage = (rating) => {
  // Mock data for rating distribution
  const distribution = {
    5: 65,
    4: 20,
    3: 10,
    2: 3,
    1: 2
  }
  return distribution[rating] || 0
}

// SEO
useHead({
  title: () => `${item.value.title} - Page Realm`,
  meta: [
    { name: 'description', content: () => item.value.description },
    { property: 'og:title', content: () => item.value.title },
    { property: 'og:description', content: () => item.value.description },
    { property: 'og:image', content: () => item.value.cover },
    { property: 'og:type', content: 'article' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: rgb(243 244 246);
  border-radius: 9999px;
}

.dark .overflow-y-auto::-webkit-scrollbar-track {
  background-color: rgb(55 65 81);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  border-radius: 9999px;
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgb(107 114 128);
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}

.dark .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}
</style>
