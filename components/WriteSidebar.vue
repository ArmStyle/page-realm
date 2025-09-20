<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20">
    <nav class="space-y-2">
      <NuxtLink
        to="/write/dashboard"
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="[
          $route.path === '/write/dashboard'
            ? 'text-primary bg-primary/10 dark:text-primary dark:bg-primary-dark/20'
            : 'text-gray-700 hover:text-primary hover:bg-primary/10 dark:text-gray-200 dark:hover:text-primary dark:hover:bg-primary-dark/20',
        ]"
      >
        <span class="text-lg">📊</span>
        <span>รายงานสถิติ</span>
      </NuxtLink>
      <NuxtLink
        to="/write/novel"
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="[
          $route.path === '/write/novel'
            ? 'text-primary bg-primary/10 dark:text-primary dark:bg-primary-dark/20'
            : 'text-gray-700 hover:text-primary hover:bg-primary/10 dark:text-gray-200 dark:hover:text-primary dark:hover:bg-primary-dark/20',
        ]"
      >
        <span class="text-lg">📖</span>
        <span>ผลงานนิยาย</span>
      </NuxtLink>
      <NuxtLink
        to="/write/comic"
        class="flex items-center space-x-3 p-3 rounded-lg transition-colors"
        :class="[
          $route.path === '/write/comic' || $route.path === '/write'
            ? 'text-primary bg-primary/10 dark:text-primary dark:bg-primary-dark/20'
            : 'text-gray-700 hover:text-primary hover:bg-primary/10 dark:text-gray-200 dark:hover:text-primary dark:hover:bg-primary-dark/20',
        ]"
      >
        <span class="text-lg">✏️</span>
        <span>ผลงานการ์ตูน</span>
      </NuxtLink>
    </nav>

    <!-- Help Section -->
    <div class="mt-8">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        คู่มือการใช้
      </h3>
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        สำหรับนักเขียน
      </h3>
      <button
        class="w-full bg-primary/10 dark:bg-primary-dark/20 text-primary dark:text-primary py-2 px-4 rounded-lg text-sm hover:bg-primary/20 dark:hover:bg-primary-dark/30 transition-colors"
      >
        ดู FAQ ทั้งหมด
      </button>
    </div>

    <!-- Social Share -->
    <div class="mt-8">
      <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-4">
        ช่องทางติดตอลิ้งยอมรับ
      </h3>
      <div class="flex space-x-2">
        <button
          class="w-8 h-8 bg-primary text-white text-sm rounded hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary transition-colors"
        >
          f
        </button>
        <button
          class="w-8 h-8 bg-blue-400 dark:bg-blue-600 rounded text-white text-sm hover:bg-blue-500 dark:hover:bg-blue-700 transition-colors"
        >
          t
        </button>
        <button
          class="w-8 h-8 bg-green-500 dark:bg-green-700 rounded text-white text-sm hover:bg-green-600 dark:hover:bg-green-800 transition-colors"
        >
          L
        </button>
        <button
          class="w-8 h-8 bg-red-500 dark:bg-red-700 rounded text-white text-sm hover:bg-red-600 dark:hover:bg-red-800 transition-colors"
        >
          @
        </button>
      </div>
    </div>
  </div>
</template>

<script setup></script>
