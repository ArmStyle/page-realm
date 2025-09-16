<template>
  <div>
    <AppHeader 
      :quickSettingsVisible="showQuickSettings" 
      @quickSettingsToggle="handleQuickSettingsToggle" 
    />
    <QuickSettings :visible="showQuickSettings" @close="showQuickSettings = false" />
    <main class="pt-12 md:pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
const showQuickSettings = ref(false)

const handleQuickSettingsToggle = () => {
  showQuickSettings.value = !showQuickSettings.value
}

// Handle click outside to close QuickSettings
function handleClickOutside(event) {
  // Close QuickSettings if clicking outside panel and not on the settings button
  if (!event.target.closest('.quick-settings-panel') && 
      !event.target.closest('[title="ปรับแต่งการอ่าน"]')) {
    showQuickSettings.value = false;
  }
}

// Initialize settings on app mount
onMounted(() => {
  settingsStore.initSettings()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
