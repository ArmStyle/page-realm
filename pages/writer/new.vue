<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <div class="mb-6">
        <button 
          @click="$router.back()"
          class="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <span>←</span>
          <span>กลับไปหน้าผลงาน</span>
        </button>
      </div>

      <!-- Form Card -->
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">สร้างการ์ตูนใหม่</h1>
          <p class="text-gray-600">กรอกข้อมูลเบื้องต้นของผลงานการ์ตูนของคุณ</p>
        </div>

        <form @submit.prevent="createWork" class="space-y-8">
          <!-- Basic Information -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ชื่อเรื่อง <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.title"
                type="text" 
                placeholder="ใส่ชื่อเรื่องที่น่าสนใจ"
                class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ประเภท <span class="text-red-500">*</span>
              </label>
              <select 
                v-model="form.category"
                class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                <option value="">เลือกประเภท</option>
                <option value="action">แอคชั่น</option>
                <option value="romance">โรแมนติก</option>
                <option value="comedy">ตลก</option>
                <option value="drama">ดราม่า</option>
                <option value="fantasy">แฟนตาซี</option>
                <option value="horror">สยองขวัญ</option>
                <option value="mystery">สืบสวน</option>
                <option value="slice-of-life">ชีวิตประจำวัน</option>
              </select>
            </div>
          </div>

          <!-- Cover Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              รูปปก
            </label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
              <div v-if="!form.coverImage" class="space-y-4">
                <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <span class="text-2xl">🖼️</span>
                </div>
                <div>
                  <p class="text-gray-600 mb-2">ลากไฟล์มาวางหรือคลิกเพื่อเลือก</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                    ref="fileInput"
                  />
                  <button 
                    type="button"
                    @click="$refs.fileInput.click()"
                    class="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-200 transition-colors"
                  >
                    เลือกไฟล์
                  </button>
                </div>
              </div>
              <div v-else class="space-y-4">
                <img :src="form.coverPreview" alt="Cover preview" class="w-32 h-40 mx-auto object-cover rounded-lg" />
                <button 
                  type="button"
                  @click="removeCoverImage"
                  class="text-red-600 hover:text-red-800"
                >
                  ลบรูป
                </button>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              เรื่องย่อ <span class="text-red-500">*</span>
            </label>
            <textarea 
              v-model="form.description"
              placeholder="เขียนเรื่องย่อที่น่าสนใจเพื่อดึงดูดผู้อ่าน"
              rows="5"
              maxlength="500"
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              :class="{ 'border-red-300': form.description?.length > 500 }"
              required
            ></textarea>
            <p class="text-sm mt-1" :class="{ 'text-red-500': form.description?.length > 500, 'text-gray-500': form.description?.length <= 500 }">
              {{ form.description?.length || 0 }}/500 ตัวอักษร
            </p>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              แท็ก
            </label>
            <div class="space-y-3">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="tag in form.tags" 
                  :key="tag"
                  class="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                >
                  <span>{{ tag }}</span>
                  <button 
                    type="button"
                    @click="removeTag(tag)"
                    class="text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
              </div>
              <div class="flex space-x-2">
                <input 
                  v-model="newTag"
                  @keyup.enter="addTag"
                  type="text" 
                  placeholder="เพิ่มแท็ก เช่น ผจญภัย, มิตรภาพ"
                  class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button 
                  type="button"
                  @click="addTag"
                  class="bg-orange-100 text-orange-700 px-4 py-3 rounded-lg hover:bg-orange-200 transition-colors"
                >
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>

          <!-- Settings -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                สถานะการเผยแพร่
              </label>
              <select 
                v-model="form.publishStatus"
                class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="draft">ร่าง</option>
                <option value="published">เผยแพร่</option>
                <option value="pending">รออนุมัติ</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                อายุผู้อ่าน
              </label>
              <select 
                v-model="form.ageRating"
                class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">ทุกเพศทุกวัย</option>
                <option value="teen">13+ ปี</option>
                <option value="mature">18+ ปี</option>
              </select>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4 pt-6">
            <button 
              type="button"
              @click="$router.back()"
              class="flex-1 bg-gray-100 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              ยกเลิก
            </button>
            <button 
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="flex-1 bg-gradient-to-r from-orange-400 to-pink-400 text-white py-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <div v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{{ isSubmitting ? 'กำลังสร้าง...' : 'สร้างผลงาน' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWorksStore } from '~/stores/works'

definePageMeta({
  layout: 'default'
})

const worksStore = useWorksStore()
const router = useRouter()

// Form data
const form = ref({
  title: '',
  category: '',
  description: '',
  tags: [],
  publishStatus: 'draft',
  ageRating: 'all',
  coverImage: null,
  coverPreview: null
})

const newTag = ref('')
const isSubmitting = ref(false)

// Computed
const isFormValid = computed(() => {
  return form.value.title.trim() !== '' && 
         form.value.category !== '' && 
         form.value.description.trim() !== '' &&
         form.value.description.length <= 500
})

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('ไฟล์รูปภาพต้องมีขนาดไม่เกิน 5MB')
      return
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (JPEG, PNG, GIF, WebP)')
      return
    }
    
    form.value.coverImage = file
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.coverPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeCoverImage = () => {
  form.value.coverImage = null
  form.value.coverPreview = null
  // Reset file input
  if (process.client) {
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
  }
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.value.tags.includes(tag) && form.value.tags.length < 10) {
    form.value.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (tagToRemove) => {
  form.value.tags = form.value.tags.filter(tag => tag !== tagToRemove)
}

const createWork = async () => {
  if (!isFormValid.value || isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    const workData = {
      title: form.value.title.trim(),
      category: form.value.category,
      description: form.value.description.trim(),
      tags: form.value.tags,
      publishStatus: form.value.publishStatus,
      ageRating: form.value.ageRating,
      // Note: In a real app, you'd upload the image to a server first
      coverImage: form.value.coverPreview
    }
    
    await worksStore.createWork(workData)
    
    // Show success message
    alert('สร้างผลงานเรียบร้อยแล้ว!')
    
    // Redirect to works page
    await router.push('/writer')
  } catch (error) {
    console.error('Error creating work:', error)
    alert('เกิดข้อผิดพลาดในการสร้างผลงาน กรุณาลองใหม่')
  } finally {
    isSubmitting.value = false
  }
}

// Handle keyboard shortcuts
const handleKeydown = (event) => {
  if (event.key === 'Enter' && event.metaKey) {
    createWork()
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/* Custom styles */
</style>
