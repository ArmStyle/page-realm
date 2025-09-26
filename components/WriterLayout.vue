<template>
  <div class="min-h-screen">
    <div class="w-full md:max-w-[1310px] mx-auto p-0 md:px-4 md:py-8">
      <!-- Sidebar toggle button for mobile -->
      <button
        class="w-10 h-10 fixed z-30 bottom-6 left-6 lg:hidden bg-primary text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
        @click="sidebarOpen = !sidebarOpen"
        aria-label="Toggle sidebar"
      >
        <span v-if="!sidebarOpen">☰</span>
        <span v-else>✕</span>
      </button>
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Left Sidebar -->
        <div class="lg:col-span-1 hidden lg:block">
          <WriteSidebar />
        </div>
        <!-- Sidebar for mobile (absolute overlay) -->
        <transition name="fade">
          <div
            v-if="sidebarOpen"
            class="fixed inset-0 z-20 flex lg:hidden bg-black/40"
            @click.self="sidebarOpen = false"
          >
            <div class="w-4/5 max-w-xs bg-white dark:bg-gray-900 h-full shadow-xl p-0">
              <WriteSidebar />
            </div>
          </div>
        </transition>
        <!-- Main Content -->
        <div class="lg:col-span-3">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WriteSidebar from "~/components/WriteSidebar.vue";
const sidebarOpen = ref(false)
definePageMeta({
  layout: "default",
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
