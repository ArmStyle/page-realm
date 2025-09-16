<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6">
    <!-- Mobile Pagination -->
    <div class="md:hidden">
      <div class="flex items-center justify-between">
        <BaseButton
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          variant="outline-secondary"
          size="sm"
          text="ก่อนหน้า"
        >
          <template #icon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </template>
        </BaseButton>
        
        <span class="text-sm text-gray-600 dark:text-gray-400">
          หน้า {{ currentPage }} จาก {{ totalPages }}
        </span>
        
        <BaseButton
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          variant="outline-secondary"
          size="sm"
          text="ถัดไป"
        >
          <template #rightIcon>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </template>
        </BaseButton>
      </div>
    </div>

    <!-- Desktop Pagination -->
    <div class="hidden md:flex items-center justify-center gap-2">
      <!-- First Page -->
      <BaseButton
        v-if="showFirstPage"
        @click="goToPage(1)"
        variant="outline-secondary"
        size="sm"
        text="1"
      />
      
      <!-- First Ellipsis -->
      <span v-if="showFirstEllipsis" class="px-2 text-gray-400">...</span>
      
      <!-- Previous Page -->
      <BaseButton
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage <= 1"
        variant="ghost"
        size="sm"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </template>
      </BaseButton>
      
      <!-- Page Numbers -->
      <BaseButton
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :variant="page === currentPage ? 'primary' : 'outline-secondary'"
        size="sm"
        :text="page.toString()"
      />
      
      <!-- Next Page -->
      <BaseButton
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        variant="ghost"
        size="sm"
      >
        <template #icon>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </template>
      </BaseButton>
      
      <!-- Last Ellipsis -->
      <span v-if="showLastEllipsis" class="px-2 text-gray-400">...</span>
      
      <!-- Last Page -->
      <BaseButton
        v-if="showLastPage"
        @click="goToPage(totalPages)"
        variant="outline-secondary"
        size="sm"
        :text="totalPages.toString()"
      />
    </div>
    
    <!-- Page Info -->
    <div class="mt-4 text-center">
      <span class="text-sm text-gray-600 dark:text-gray-400">
        แสดงหน้า {{ currentPage }} จากทั้งหมด {{ totalPages }} หน้า
      </span>
    </div>
    
    <!-- Quick Jump -->
    <!-- <div class="mt-4 flex items-center justify-center gap-3">
      <span class="text-sm text-gray-600 dark:text-gray-400">ไปที่หน้า:</span>
      <BaseInput
        v-model="jumpToPageValue"
        type="number"
        :min="1"
        :max="totalPages"
        size="sm"
        wrapper-class="w-16"
        class="text-center"
        @enter="jumpToPage"
      />
      <BaseButton
        @click="jumpToPage"
        variant="primary"
        size="sm"
        text="ไป"
      />
    </div> -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['page-change'])

const jumpToPageValue = ref('')

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = props.maxVisiblePages
  const half = Math.floor(maxVisible / 2)
  
  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + maxVisible - 1)
  
  // Adjust start if we're near the end
  if (end - start + 1 < maxVisible && start > 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const showFirstPage = computed(() => {
  return props.totalPages > props.maxVisiblePages && !visiblePages.value.includes(1)
})

const showLastPage = computed(() => {
  return props.totalPages > props.maxVisiblePages && !visiblePages.value.includes(props.totalPages)
})

const showFirstEllipsis = computed(() => {
  return showFirstPage.value && visiblePages.value[0] > 2
})

const showLastEllipsis = computed(() => {
  return showLastPage.value && visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}

const jumpToPage = () => {
  const page = parseInt(jumpToPageValue.value)
  if (page && page >= 1 && page <= props.totalPages) {
    goToPage(page)
    jumpToPageValue.value = ''
  }
}
</script>
