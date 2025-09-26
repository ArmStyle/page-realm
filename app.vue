<template>
  <div
    :class="[
      'min-h-screen bg-light-bg dark:bg-gray-900 eyecare:bg-eyecare-bg transition-colors duration-300',
      { eyecare: settingsStore.isEyeCareMode }
    ]"
    :style="settingsStore.isEyeCareMode ? { backgroundColor: '#f9f7f4', '!important': true } : {}"
  >
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