<template>
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
</template>

<script setup>
import { useSettingsStore } from '~/stores/settings'

// Use reading layout
definePageMeta({
  layout: 'reading'
})

const settingsStore = useSettingsStore()
const route = useRoute()

// Sample novel data
const novel = reactive({
  title: 'เทพธิดาแห่งความมืด',
  author: 'นักเขียนลึกลับ'
})

const currentChapter = ref(1)
const totalChapters = ref(125)
const chapterTitle = ref('การเริ่มต้นแห่งการผจญภัย')

const previousChapter = () => {
  if (currentChapter.value > 1) {
    currentChapter.value--
    chapterTitle.value = `การผจญภัยตอนที่ ${currentChapter.value}`
  }
}

const nextChapter = () => {
  if (currentChapter.value < totalChapters.value) {
    currentChapter.value++
    chapterTitle.value = `การผจญภัยตอนที่ ${currentChapter.value}`
  }
}

// Provide data to layout
provide('novel', novel)
provide('currentChapter', currentChapter)
provide('totalChapters', totalChapters)
provide('chapterTitle', chapterTitle)
provide('previousChapter', previousChapter)
provide('nextChapter', nextChapter)

// Handle keyboard shortcuts for navigation
onMounted(() => {
  const handleKeyboard = (event) => {
    if (event.key === 'ArrowLeft' && !event.ctrlKey && !event.metaKey) {
      previousChapter()
    } else if (event.key === 'ArrowRight' && !event.ctrlKey && !event.metaKey) {
      nextChapter()
    }
  }
  
  document.addEventListener('keydown', handleKeyboard)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyboard)
  })
})

// SEO
useHead({
  title: `${novel.title} - ตอนที่ ${currentChapter.value} | PageRealm`,
  meta: [
    { name: 'description', content: `อ่านนิยาย ${novel.title} ตอนที่ ${currentChapter.value} ได้ฟรีที่ PageRealm` }
  ]
})
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
