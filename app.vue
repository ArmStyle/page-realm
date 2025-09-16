<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

// Initialize settings store on app start
const settingsStore = useSettingsStore()

// Initialize settings when app mounts
onMounted(() => {
  settingsStore.initSettings()
})
</script>