<template>
  <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
    <nav class="space-y-2">
      <NuxtLink 
        to="/write/dashboard" 
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="$route.path === '/write/dashboard' ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'"
      >
        <span class="text-lg">📊</span>
        <span>รายงานสถิติ</span>
      </NuxtLink>
      <NuxtLink 
        to="/write/novel" 
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="$route.path === '/write/novel' ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'"
      >
        <span class="text-lg">📖</span>
        <span>ผลงานนิยาย</span>
      </NuxtLink>
      <NuxtLink 
        to="/write/comic" 
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="$route.path === '/write/comic' || $route.path === '/write' ? 'text-orange-600 bg-orange-50' : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'"
      >
        <span class="text-lg">✏️</span>
        <span>ผลงานการ์ตูน</span>
      </NuxtLink>
    </nav>

    <!-- Statistics Section -->
    <div v-if="showStats" class="mt-8 space-y-4">
      <h3 class="font-semibold text-gray-800 mb-4">{{ statsTitle }}</h3>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">เรื่องทั้งหมด</span>
          <span class="font-semibold">{{ stats.totalWorks }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">ยอดวิวรวม</span>
          <span class="font-semibold">{{ stats.totalViews.toLocaleString() }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-gray-600">ผู้ติดตาม</span>
          <span class="font-semibold">{{ stats.totalFavorites.toLocaleString() }}</span>
        </div>
      </div>
    </div>

    <!-- Help Section -->
    <div class="mt-8">
      <h3 class="font-semibold text-gray-800 mb-4">คู่มือการใช้</h3>
      <h3 class="font-semibold text-gray-800 mb-4">สำหรับนักเขียน</h3>
      <button class="w-full bg-orange-100 text-orange-700 py-2 px-4 rounded-lg text-sm hover:bg-orange-200 transition-colors">
        ดู FAQ ทั้งหมด
      </button>
    </div>

    <!-- Social Share -->
    <div class="mt-8">
      <h3 class="font-semibold text-gray-800 mb-4">ช่องทางติดตอลิ้งยอมรับ</h3>
      <div class="flex space-x-2">
        <button class="w-8 h-8 bg-blue-500 rounded text-white text-sm hover:bg-blue-600 transition-colors">f</button>
        <button class="w-8 h-8 bg-blue-400 rounded text-white text-sm hover:bg-blue-500 transition-colors">t</button>
        <button class="w-8 h-8 bg-green-500 rounded text-white text-sm hover:bg-green-600 transition-colors">L</button>
        <button class="w-8 h-8 bg-red-500 rounded text-white text-sm hover:bg-red-600 transition-colors">@</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  stats: {
    type: Object,
    default: () => ({
      totalWorks: 0,
      totalViews: 0,
      totalFavorites: 0
    })
  },
  statsTitle: {
    type: String,
    default: 'สถิติ'
  },
  showStats: {
    type: Boolean,
    default: true
  }
})
</script>
