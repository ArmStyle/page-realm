<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-300',
      settingsStore.isEyeCareMode ? 'bg-eyecare-bg' : 'bg-light-bg',
      { 'dark:bg-gray-900': !settingsStore.isEyeCareMode }
    ]"
  >
    <AppHeader />
    <main class="pt-12 md:pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()

onMounted(() => {
  settingsStore.initSettings()
})
</script>
