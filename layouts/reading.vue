<template>
  <div 
    :class="[
      'min-h-screen transition-colors duration-300',
      settingsStore.isEyeCareMode 
        ? 'bg-eyecare-bg'
        : 'bg-gray-50 dark:bg-gray-900'
    ]"
  >
    <!-- Reading Header -->
    <header 
      :class="[
        'fixed top-0 left-0 right-0 z-40 shadow-md border-b backdrop-blur-sm transition-colors duration-300',
        settingsStore.isEyeCareMode 
          ? 'bg-eyecare-card/90 border-eyecare-border'
          : 'bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700'
      ]"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Back Button and Title -->
          <div class="flex items-center gap-4">
            <NuxtLink to="/" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-lg font-semibold text-gray-800 dark:text-white">{{ novel.title }}</h1>
              <p class="text-sm text-gray-600 dark:text-gray-400">ตอนที่ {{ currentChapter }} - {{ chapterTitle }}</p>
            </div>
          </div>

          <!-- Reading Controls -->
          <div class="flex items-center gap-3">
            <!-- Chapter Navigation -->
            <button 
              @click="previousChapter"
              :disabled="currentChapter <= 1"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span class="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
              {{ currentChapter }}/{{ totalChapters }}
            </span>

            <button 
              @click="nextChapter"
              :disabled="currentChapter >= totalChapters"
              class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Quick Settings Toggle -->
            <button
              @click="settingsStore.toggleQuickSettings()"
              :class="[
                'p-2 rounded-lg transition-colors',
                settingsStore.quickSettingsVisible 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
              ]"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick Settings Component -->
    <QuickSettings />

    <!-- Reading Content -->
    <main class="pt-12 md:pt-16">
      <div class="container mx-auto px-4 py-8 max-w-4xl">
        <article 
          class="reading-content prose prose-lg dark:prose-invert mx-auto"
          :style="{ 
            fontSize: settingsStore.fontSize + 'px',
            lineHeight: settingsStore.lineHeight
          }"
        >
          <h2 class="text-2xl font-bold mb-6 text-center">{{ chapterTitle }}</h2>
          
          <div class="space-y-6 text-gray-800 dark:text-gray-200">
            <p>
              ในคืนที่ท้องฟ้าปิดบังด้วยเมฆดำครึ้ม แสงแห่งดวงดาวได้สาบสูญไปจากโลกใบนี้ เทพธิดาแห่งความมืดผู้ยิ่งใหญ่ได้ปรากฏกายขึ้นเหนือยอดเขาสูง นัยน์ตาของนางเปล่งประกายราวกับเพชรพลอยในความมืดมิด
            </p>

            <p>
              "เวลาแห่งการทดสอบได้มาถึงแล้ว" เสียงนางดังก้องไปทั่วหุบเขา เสียงที่เต็มไปด้วยพลังและความมั่นใจ "มนุษยชาติจะต้องเผชิญหน้ากับความจริงแห่งชะตากรรมของตน"
            </p>

            <p>
              อากาศกลางคืนเริ่มเปลี่ยนแปลง ลมหนาวเย็นพัดผ่านใบไผ่ ส่งเสียงกรอบแกรบไปทั่วป่าใหญ่ เหล่าสัตว์ป่าต่างหลบซ่อนตัวด้วยความหวาดกลัว พวกมันรู้สึกได้ถึงพลังอันยิ่งใหญ่ที่กำลังจะปลดปล่อยออกมา
            </p>

            <p>
              เทพธิดายกมือขึ้น แสงสีม่วงเข้มเริ่มปรากฏรอบๆ นิ้วของนาง แสงนั้นเปล่งประกายราวกับดาวฤกษ์ในคืนที่มืดมิด "ด้วยพลังแห่งความมืดที่ฉันครอบครอง ฉันจะนำความสมดุลกลับคืนสู่โลกใบนี้"
            </p>

            <p>
              ทันใดนั้น แสงแรงกล้าส่องสว่างไปทั่วท้องฟ้า ความมืดมิดที่ปกคลุมโลกเริ่มค่อยๆ สลายไป เผยให้เห็นภูเขา ป่าไผ่ และลำธารเงินราวกับผ้าไหมที่ไหลเลื้อยไปตามหุบเขา
            </p>

            <p>
              "นี่เป็นเพียงจุดเริ่มต้นเท่านั้น" เทพธิดากล่าวด้วยรอยยิ้มลึกลับ "การผจญภัยที่แท้จริงของเราจะเริ่มต้นขึ้นในไม่ช้า เตรียมพร้อมรับมือกับความท้าทายที่รออยู่ข้างหน้า"
            </p>

            <p>
              เมื่อแสงอรุณเริ่มส่องสว่าง เทพธิดาหันหน้าไปทางหมู่บ้านเล็กๆ ที่อยู่เชิงเขา ที่นั่นมีผู้คนจำนวนมากกำลังรอคอยการช่วยเหลือ พวกเขาไม่รู้ว่าความหวังของพวกเขาจะมาถึงในรูปแบบของเทพธิดาผู้สูงศักดิ์ผู้นี้
            </p>

            <p>
              ด้วยการก้าวเดินที่สง่างาม เทพธิดาเริ่มเดินทางลงจากยอดเขา รอยเท้าของนางทิ้งแสงประกายไว้เป็นเส้นทาง นั่นคือจุดเริ่มต้นของการเดินทางที่จะเปลี่ยนแปลงชะตากรรมของทุกคนในโลกใบนี้
            </p>
          </div>

          <!-- Chapter Navigation -->
          <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <button 
              @click="previousChapter"
              :disabled="currentChapter <= 1"
              class="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              ตอนก่อนหน้า
            </button>

            <div class="text-center">
              <p class="text-sm text-gray-600 dark:text-gray-400">ตอนที่ {{ currentChapter }} จาก {{ totalChapters }}</p>
            </div>

            <button 
              @click="nextChapter"
              :disabled="currentChapter >= totalChapters"
              class="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ตอนถัดไป
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

// Disable default layout for reading page
definePageMeta({
  layout: false
})

const settingsStore = useSettingsStore()

// Initialize settings
onMounted(() => {
  settingsStore.initSettings()
})

// Get data from page
const novel = inject('novel', { title: 'เทพธิดาแห่งความมืด', author: 'นักเขียนลึกลับ' })
const currentChapter = inject('currentChapter', ref(1))
const totalChapters = inject('totalChapters', ref(125))
const chapterTitle = inject('chapterTitle', ref('การเริ่มต้นแห่งการผจญภัย'))
const previousChapter = inject('previousChapter', () => {})
const nextChapter = inject('nextChapter', () => {})
</script>

<style scoped>
.reading-content {
  font-family: 'Sarabun', sans-serif;
}

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5em;
  text-align: justify;
  text-indent: 2em;
}

.prose h2 {
  text-indent: 0;
  text-align: center;
}
</style>
