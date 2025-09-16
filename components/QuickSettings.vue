<template>
  <Transition name="quick-settings">
    <div
      v-if="visible"
      :class="[
        'quick-settings-panel fixed top-16 right-4 z-50 rounded-xl shadow-2xl border max-h-[calc(100vh-6rem)] overflow-y-auto',
        'w-80 max-w-[calc(100vw-2rem)] sm:max-w-[90vw] p-4 sm:p-6',
        themeClasses.card,
        themeClasses.border
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4 sm:mb-6">
        <div class="flex items-center gap-2">
          <svg 
            :class="['w-4 h-4 sm:w-5 sm:h-5', themeClasses.muted]" 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <h3 :class="['text-lg font-semibold', themeClasses.text]">
            ปรับแต่งเพื่อสายตา
          </h3>
        </div>
        <button
          @click="emit('close')"
          :class="['p-1 rounded-lg transition-colors', themeClasses.hoverBg]"
        >
          <svg :class="['w-4 h-4 sm:w-5 sm:h-5', themeClasses.muted]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Theme Selection (4 modes) -->
      <div class="mb-4 sm:mb-6">
        <h4 :class="['text-sm font-medium mb-3', themeClasses.headerMuted]">
          ธีม
        </h4>
        <div class="grid grid-cols-2 gap-2">
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
            @click="settingsStore.setTheme('eyecare-light')"
            :class="[
              'flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-2 rounded-lg border-2 transition-all',
              settingsStore.theme === 'eyecare-light' 
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
            <span class="text-xs font-medium">ถนอมตาสว่าง</span>
          </button>

          <!-- Eye Care Dark Theme -->
          <button
            @click="settingsStore.setTheme('eyecare-dark')"
            :class="[
              'flex flex-col items-center justify-center gap-1 py-2 sm:py-3 px-2 rounded-lg border-2 transition-all',
              settingsStore.theme === 'eyecare-dark' 
                ? 'border-primary bg-primary text-white' 
                : themeClasses.buttonBorder + ' hover:border-primary ' + themeClasses.text
            ]"
          >
            <div class="relative">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <svg class="w-2 h-2 absolute -top-0.5 -right-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.389z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-xs font-medium">ถนอมตามืด</span>
          </button>
        </div>
      </div>

      <!-- Current Theme Display -->
      <div class="mb-4 sm:mb-6">
        <div :class="['p-3 rounded-lg border text-sm', themeClasses.border, themeClasses.card]">
          <div class="flex items-center gap-2">
            <div :class="['w-3 h-3 rounded-full', getThemeIndicatorColor()]"></div>
            <span :class="themeClasses.text">
              <strong>ธีมปัจจุบัน:</strong> {{ getThemeDisplayName() }}
            </span>
          </div>
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
          <button
            @click="settingsStore.setLineHeight(settingsStore.lineHeight - 0.1)"
            :class="[
              'w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 transition-all flex items-center justify-center',
              themeClasses.buttonBorder + ' hover:border-primary'
            ]"
          >
            <span :class="['text-lg font-bold', themeClasses.muted]">-</span>
          </button>
          <div class="flex-1 text-center">
            <span :class="['text-xl sm:text-2xl font-bold', themeClasses.text]">
              {{ settingsStore.lineHeight.toFixed(1) }}
            </span>
          </div>
          <button
            @click="settingsStore.setLineHeight(settingsStore.lineHeight + 0.1)"
            :class="[
              'w-8 h-8 sm:w-10 sm:h-10 rounded-lg border-2 transition-all flex items-center justify-center',
              themeClasses.buttonBorder + ' hover:border-primary'
            ]"
          >
            <span :class="['text-lg font-bold', themeClasses.muted]">+</span>
          </button>
        </div>
        <!-- Slider -->
        <div class="mt-3 sm:mt-4">
          <input
            type="range"
            min="1.2"
            max="2.5"
            step="0.1"
            :value="settingsStore.lineHeight"
            @input="settingsStore.setLineHeight(parseFloat(($event.target as HTMLInputElement).value))"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <!-- Tip -->
      <!-- <div 
        :class="[
          'mt-4 p-3 rounded-lg border',
          settingsStore.isEyeCareMode 
            ? themeClasses.border + ' ' + themeClasses.card
            : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
        ]"
      >
        <div class="flex items-start gap-2">
          <svg 
            :class="[
              'w-4 h-4 mt-0.5 flex-shrink-0',
              settingsStore.isEyeCareMode 
                ? themeClasses.muted
                : 'text-yellow-600 dark:text-yellow-400'
            ]" 
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <p 
            :class="[
              'text-xs',
              settingsStore.isEyeCareMode 
                ? themeClasses.text
                : 'text-yellow-800 dark:text-yellow-200'
            ]"
          >
            <strong>เคล็ดลับ:</strong> กดปุ่ม Ctrl + หรือ - เพื่อปรับขนาดอย่างรวดเร็ว
          </p>
        </div>
      </div> -->
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useSettingsStore } from '../stores/settings'
import { computed } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const settingsStore = useSettingsStore()

// Computed properties for dynamic classes based on current theme
const themeClasses = computed(() => {
  const theme = settingsStore.theme
  
  switch (theme) {
    case 'eyecare-light':
      return {
        text: 'text-eyecare-text',
        muted: 'text-eyecare-muted',
        headerMuted: 'text-eyecare-muted',
        border: 'border-eyecare-border',
        buttonBorder: 'border-eyecare-border',
        hoverBg: 'hover:bg-eyecare-border',
        card: 'bg-eyecare-card'
      }
    case 'eyecare-dark':
      return {
        text: 'text-eyecare-dark-text',
        muted: 'text-eyecare-dark-muted',
        headerMuted: 'text-eyecare-dark-muted',
        border: 'border-eyecare-dark-border',
        buttonBorder: 'border-eyecare-dark-border',
        hoverBg: 'hover:bg-eyecare-dark-border',
        card: 'bg-eyecare-dark-card'
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

// Get theme display name
const getThemeDisplayName = () => {
  switch (settingsStore.theme) {
    case 'light': return 'ธีมสว่าง'
    case 'dark': return 'ธีมมืด'
    case 'eyecare-light': return 'ถนอมสายตา (สว่าง)'
    case 'eyecare-dark': return 'ถนอมสายตา (มืด)'
    default: return 'ธีมสว่าง'
  }
}

// Get theme indicator color
const getThemeIndicatorColor = () => {
  switch (settingsStore.theme) {
    case 'light': return 'bg-yellow-400'
    case 'dark': return 'bg-gray-700'
    case 'eyecare-light': return 'bg-orange-400'
    case 'eyecare-dark': return 'bg-orange-800'
    default: return 'bg-yellow-400'
  }
}
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
.quick-settings-enter-active,
.quick-settings-leave-active {
  transition: all 0.3s ease;
}

.quick-settings-enter-from,
.quick-settings-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
