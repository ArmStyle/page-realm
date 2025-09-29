<template>
  <div class="relative quick-settings-bell">
    <button
      @click="toggleQuickSettings"
      class="nav-link relative"
      title="ปรับแต่งการอ่าน"
    >
      <Icon icon="mdi:cog" class="w-5 h-5" />
    </button>
    <Transition name="fade">
      <div
        v-if="showQuickSettings"
        class="absolute top-7 -right-[3rem] md:right-0 mt-2 z-50 quick-settings-panel"
        style="width: 20rem; min-width: 16rem;"
      >
        <div
          :class="[
            'rounded-xl shadow-2xl border max-h-[calc(100vh-6rem)] overflow-y-auto',
            'w-full p-4 sm:p-6',
            themeClasses.card,
            themeClasses.border
          ]"
        >
          <!-- Header -->
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <div class="flex items-center gap-2">
              <Icon icon="mdi:cog" :class="['w-5 h-5 sm:w-6 sm:h-6', themeClasses.muted]" />
              <h3 :class="['text-base sm:text-lg font-semibold', themeClasses.text]">
                ปรับแต่งการอ่าน
              </h3>
            </div>
            <button
              @click="closeQuickSettings"
              :class="[
                'p-1 rounded-lg transition-colors',
                themeClasses.hoverBg,
                themeClasses.muted
              ]"
            >
              <svg :class="['w-4 h-4 sm:w-5 sm:h-5', themeClasses.muted]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Theme Selection (3 modes) -->
          <div class="mb-4 sm:mb-6">
            <h4 :class="['text-sm font-medium mb-3', themeClasses.headerMuted]">
              ธีม
            </h4>
            <div class="grid grid-cols-3 gap-2">
              <!-- Light Theme -->
              <button
                @click="settingsStore.setTheme('light')"
                :class="[
                  'flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-2 rounded-lg border-2 transition-all',
                  settingsStore.theme === 'light' 
                    ? 'border-primary bg-primary text-white' 
                    : themeClasses.buttonBorder + ' hover:border-primary ' + themeClasses.text
                ]"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                </svg>
                <span class="text-xs font-medium">สว่าง</span>
              </button>

              <!-- Dark Theme -->
              <button
                @click="settingsStore.setTheme('dark')"
                :class="[
                  'flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-2 rounded-lg border-2 transition-all',
                  settingsStore.theme === 'dark' 
                    ? 'border-primary bg-primary text-white' 
                    : themeClasses.buttonBorder + ' hover:border-primary ' + themeClasses.text
                ]"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                <span class="text-xs font-medium">มืด</span>
              </button>

              <!-- Eye Care Light Theme -->
              <button
                @click="settingsStore.setTheme('eyecare')"
                :class="[
                  'flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-2 rounded-lg border-2 transition-all',
                  settingsStore.theme === 'eyecare' 
                    ? 'border-primary bg-primary text-white' 
                    : themeClasses.buttonBorder + ' hover:border-primary ' + themeClasses.text
                ]"
              >
                <div class="relative">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                  </svg>
                  <svg class="w-2 h-2 absolute -top-0.5 -right-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.389z" clip-rule="evenodd" />
                  </svg>
                </div>
                <span class="text-xs font-medium">ถนอมสายตา</span>
              </button>
            </div>
          </div>

          <!-- Font Size Section -->
          <div class="mb-4 sm:mb-6">
            <h4 :class="['text-sm font-medium mb-3', themeClasses.headerMuted]">
              ขนาดตัวอักษร
            </h4>
            <div class="grid grid-cols-7 gap-1">
              <button
                v-for="size in [12, 14, 16, 18, 20, 22, 24]"
                :key="size"
                @click="settingsStore.setFontSize(size)"
                :class="[
                  'py-1.5 sm:py-2 px-1 rounded-lg border-2 transition-all flex items-center justify-center',
                  settingsStore.fontSize === size 
                    ? 'border-primary bg-primary text-white' 
                    : themeClasses.buttonBorder + ' hover:border-primary ' + themeClasses.text
                ]"
              >
                <span class="text-xs font-medium">{{ size }}</span>
              </button>
            </div>
          </div>

          <!-- Line Height Section -->
          <div class="mb-4 sm:mb-6">
            <h4 :class="['text-sm font-medium mb-3', themeClasses.headerMuted]">
              ระยะห่างบรรทัด
            </h4>
            <div class="flex items-center gap-3">
              <span class="text-xs" :class="themeClasses.muted">1.0</span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                :value="settingsStore.lineHeight"
                @input="onLineHeightChange($event)"
                class="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <span class="text-xs" :class="themeClasses.muted">3.0</span>
              <span class="ml-2 text-xs font-medium" :class="themeClasses.text">{{ settingsStore.lineHeight.toFixed(1) }}</span>
            </div>
          </div>

          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useSettingsStore } from '../stores/settings'
import { Icon } from '@iconify/vue'

const emit = defineEmits(['close'])
const settingsStore = useSettingsStore()
const showQuickSettings = ref(false)

function toggleQuickSettings() {
  showQuickSettings.value = !showQuickSettings.value
}
function closeQuickSettings() {
  showQuickSettings.value = false
  emit('close')
}
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement | null;
  if (!target?.closest('.quick-settings-bell')) {
    showQuickSettings.value = false;
    emit('close');
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Default line height to 1.5 if not set
if (!settingsStore.lineHeight) {
  settingsStore.setLineHeight(1.5)
}

function onLineHeightChange(event: Event) {
  const value = parseFloat((event.target as HTMLInputElement).value)
  settingsStore.setLineHeight(value)
}

// Computed properties for dynamic classes based on current theme
const themeClasses = computed(() => {
  const theme = settingsStore.theme
  
  switch (theme) {
    case 'eyecare':
      return {
        text: 'text-eyecare-text',
        muted: 'text-eyecare-muted',
        headerMuted: 'text-eyecare-muted',
        border: 'border-eyecare-border',
        buttonBorder: 'border-eyecare-border',
        hoverBg: 'hover:bg-eyecare-border',
        card: 'bg-eyecare-card'
      }
    default: // 'light' or 'dark'
      return {
        text: 'text-gray-800 dark:text-gray-200',
        muted: 'text-gray-600 dark:text-gray-400',
        headerMuted: 'text-gray-700 dark:text-gray-300',
        border: 'border-gray-200 dark:border-gray-700',
        buttonBorder: 'border-gray-200 dark:border-gray-600',
        hoverBg: 'hover:bg-gray-100 dark:hover:bg-gray-700',
        card: 'bg-white dark:bg-gray-800'
      }
  }
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #667eea;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.slider::-webkit-slider-track {
  background: linear-gradient(to right, #667eea 0%, #667eea var(--progress, 50%), #e2e8f0 var(--progress, 50%), #e2e8f0 100%);
}

/* Quick Settings Animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
