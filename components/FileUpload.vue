<template>
  <div class="file-upload">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="space-y-4">
      <!-- Preview Area -->
      <div v-if="previewUrl" class="relative inline-block">
        <img 
          :src="previewUrl" 
          :alt="fileName"
          class="w-48 h-64 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
        />
        <button
          type="button"
          @click="removeFile"
          class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div class="mt-2 text-sm text-gray-600">
          <p>{{ fileName }}</p>
          <p>{{ formatFileSize(fileSize) }}</p>
        </div>
      </div>
      
      <!-- Upload Area -->
      <div 
        v-else
        @click="triggerFileInput"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        @drop.prevent="handleDrop"
        :class="[
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        ]"
      >
        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="mt-4">
          <p class="text-lg font-medium text-gray-900">อัปโหลดรูปหน้าปก</p>
          <p class="text-sm text-gray-500 mt-2">
            ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือกไฟล์
          </p>
          <p class="text-xs text-gray-400 mt-1">
            รองรับ: JPG, PNG, WebP (ไม่เกิน {{ maxSizeMB }}MB)
          </p>
        </div>
      </div>
    </div>
    
    <input
      ref="fileInput"
      :id="id"
      type="file"
      :accept="acceptedTypes"
      @change="handleFileSelect"
      class="hidden"
    />
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: File | null
  label?: string
  required?: boolean
  error?: string
  help?: string
  id?: string
  maxSizeMB?: number
  acceptedTypes?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  id: () => `file-upload-${Math.random().toString(36).substr(2, 9)}`,
  maxSizeMB: 2,
  acceptedTypes: 'image/jpeg,image/png,image/webp'
})

const emit = defineEmits<{
  'update:modelValue': [value: File | null]
  'error': [message: string]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const previewUrl = ref<string>('')
const fileName = ref<string>('')
const fileSize = ref<number>(0)

const triggerFileInput = () => {
  fileInput.value?.click()
}

const validateFile = (file: File): string | null => {
  // Check file type
  if (!props.acceptedTypes.split(',').some(type => file.type === type.trim())) {
    return 'ประเภทไฟล์ไม่รองรับ กรุณาเลือกไฟล์ JPG, PNG หรือ WebP'
  }
  
  // Check file size
  const maxSizeBytes = props.maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return `ขนาดไฟล์เกิน ${props.maxSizeMB}MB`
  }
  
  return null
}

const processFile = (file: File) => {
  const validationError = validateFile(file)
  if (validationError) {
    emit('error', validationError)
    return
  }
  
  fileName.value = file.name
  fileSize.value = file.size
  
  // Create preview URL
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
  
  emit('update:modelValue', file)
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

const removeFile = () => {
  previewUrl.value = ''
  fileName.value = ''
  fileSize.value = 0
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('update:modelValue', null)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Watch for external changes to modelValue
watch(() => props.modelValue, (newFile) => {
  if (!newFile) {
    removeFile()
  }
})
</script>
