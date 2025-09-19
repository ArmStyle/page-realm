<template>
  <div class="space-y-8">
    <!-- Cover Image & Basic Information -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Cover Image (Left) -->
        <div>
          <FileUpload
            v-model="form.coverImage"
            label="รูปหน้าปก"
            required
            :error="errors.coverImage"
            help="อัปโหลดรูปหน้าปกสำหรับผลงาน (ขนาด 3:4 ไม่เกิน 2MB)"
            @error="handleFileError"
          />
          
          <!-- Current Cover Preview (for edit mode) -->
          <div v-if="currentCoverUrl && !form.coverImage" class="mt-4">
            <p class="text-sm font-medium text-gray-700 mb-2">รูปหน้าปกปัจจุบัน</p>
            <img 
              :src="currentCoverUrl" 
              alt="Current cover"
              class="w-48 h-64 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            />
          </div>
        </div>

        <!-- Basic Information (Right) -->
        <div>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">ข้อมูลพื้นฐาน</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Title -->
            <div class="md:col-span-2">
              <BaseInput
                v-model="form.title"
                label="ชื่อเรื่อง"
                placeholder="ใส่ชื่อเรื่อง..."
                required
                :maxlength="120"
                :error="errors.title"
                :show-counter="true"
              />
            </div>

            <!-- Category -->
            <div>
              <BaseSelect
                v-model="form.category"
                label="หมวดหมู่"
                :options="categoryOptions"
                placeholder="เลือกหมวดหมู่"
                required
                :error="errors.category"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">
                สถานะ
                <span class="text-red-500">*</span>
              </label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="published"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">เผยแพร่ทันที</span>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="hidden"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span class="ml-2 text-sm text-gray-700">ซ่อน</span>
                </label>
              </div>
              <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
            </div>
          </div>

          <!-- Short Description -->
          <div class="mt-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              คำโปรย
            </label>
            <textarea
              v-model="form.description"
              id="description"
              rows="3"
              :maxlength="200"
              placeholder="เขียนคำโปรยสั้นๆ..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
            <div class="mt-1 flex justify-between text-sm text-gray-500">
              <span v-if="errors.description" class="text-red-600">{{ errors.description }}</span>
              <span class="ml-auto">{{ form.description.length }}/200</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Synopsis -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">เรื่องย่อ</h2>
      <QuillEditor
        v-model="form.synopsis"
        label="เรื่องย่อ"
        placeholder="เขียนเรื่องย่อโดยละเอียด..."
        required
        :error="errors.synopsis"
        help="เขียนเรื่องย่อที่น่าสนใจเพื่อดึงดูดผู้อ่าน"
      />
    </div>

    <!-- Tags and Content Warnings -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">แท็กและคำเตือน</h2>
      
      <div class="space-y-6">
        <!-- Tags -->
        <TagInput
          v-model="form.tags"
          label="แท็ก"
          placeholder="เพิ่มแท็ก... (กด Enter, Space หรือ Comma เพื่อเพิ่ม)"
          :max-tags="40"
          :max-tag-length="30"
          :error="errors.tags"
          help="แท็กช่วยให้ผู้อ่านค้นหาผลงานของคุณได้ง่าย"
        />

        <!-- Content Warnings -->
        <TagInput
          v-model="form.contentWarnings"
          label="คำเตือนเนื้อหา"
          placeholder="เพิ่มคำเตือนเนื้อหา..."
          :max-tags="10"
          :max-tag-length="30"
          :error="errors.contentWarnings"
          help="ระบุคำเตือนเนื้อหาที่อาจไม่เหมาะสมกับผู้อ่านบางกลุ่ม"
        />
      </div>
    </div>

    <!-- Settings -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-6">การตั้งค่า</h2>
      
      <ToggleSwitch
        v-model="form.allowComments"
        label="แสดงความคิดเห็น"
        description="อนุญาตให้ผู้อ่านแสดงความคิดเห็นในผลงานนี้"
        :error="errors.allowComments"
      />
    </div>

    <!-- Submit Buttons -->
    <div class="flex justify-end gap-4 pt-6">
      <slot name="cancel-button">
        <NuxtLink
          to="/writer"
          class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          ยกเลิก
        </NuxtLink>
      </slot>
      
      <BaseButton
        variant="secondary"
        @click="$emit('save-draft')"
        :disabled="isSubmitting"
      >
        บันทึกร่าง
      </BaseButton>
      
      <BaseButton
        @click="$emit('submit')"
        :disabled="isSubmitting"
        :loading="isSubmitting"
      >
        {{ form.status === 'published' ? (isEditMode ? 'อัปเดตและเผยแพร่' : 'เผยแพร่') : 'บันทึก' }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

interface WorkForm {
  coverImage: File | null
  title: string
  category: string
  description: string
  synopsis: string
  tags: string[]
  contentWarnings: string[]
  status: 'published' | 'hidden'
  allowComments: boolean
}

interface Props {
  modelValue: WorkForm
  errors?: Record<string, string>
  isSubmitting?: boolean
  isEditMode?: boolean
  currentCoverUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => ({}),
  isSubmitting: false,
  isEditMode: false,
  currentCoverUrl: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: WorkForm]
  'submit': []
  'save-draft': []
  'file-error': [message: string]
}>()

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

// Category options
const categoryOptions = [
  { value: 'manga', text: 'การ์ตูน' },
  { value: 'novel', text: 'นิยาย' },
  { value: 'ebook', text: 'อีบุ๊ก' },
  { value: 'webtoon', text: 'เว็บตูน' },
  { value: 'light-novel', text: 'ไลท์โนเวล' }
]

const handleFileError = (message: string) => {
  emit('file-error', message)
}
</script>
