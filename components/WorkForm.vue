<template>
  <div class="space-y-8 container mt-6 !max-w-[1000px] mx-auto">
    <!-- Cover Image & Basic Information -->
    <div class="bg-white rounded-lg shadow-sm p-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Cover Image (Left) -->
        <div class="lg:col-span-4">
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
            <p class="text-sm font-medium text-gray-700 mb-2">
              รูปหน้าปกปัจจุบัน
            </p>
            <img
              :src="currentCoverUrl"
              alt="Current cover"
              class="w-48 h-64 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            />
          </div>
        </div>

        <!-- Basic Information (Right) -->
        <div class="lg:col-span-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            ข้อมูลพื้นฐาน
          </h2>

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

            <!-- Category: Primary -->
            <div>
              <BaseSelect
                v-model="form.primaryCategory"
                label="หมวดหมู่หลัก"
                :options="categoryOptions"
                placeholder="เลือกหมวดหมู่หลัก"
                required
                :error="errors.primaryCategory"
              />
            </div>
            <!-- Category: Secondary -->
            <div>
              <BaseSelect
                v-model="form.secondaryCategory"
                label="หมวดหมู่รอง"
                :options="secondaryCategoryOptions"
                placeholder="เลือกหมวดหมู่รอง"
                :error="errors.secondaryCategory"
                :disabled="!form.primaryCategory"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- Short Description -->
      <div class="mt-6">
        <label
          for="description"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
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
          <span v-if="errors.description" class="text-red-600">{{
            errors.description
          }}</span>
          <span class="ml-auto">{{ form.description.length }}/200</span>
        </div>
      </div>
      <client-only>
        <QuillEditor
          v-model="form.synopsis"
          label="เรื่องย่อ"
          placeholder="เขียนเรื่องย่อโดยละเอียด..."
          required
          :error="errors.synopsis"
          help="เขียนเรื่องย่อที่น่าสนใจเพื่อดึงดูดผู้อ่าน"
        />
      </client-only>
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            สถานะ
          </label>
          <div class="space-y-2 flex items-center gap-4">
            <div>
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.status"
                  type="radio"
                  value="published"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <span class="ml-2 text-sm text-gray-700">เผยแพร่ทันที</span>
              </label>
            </div>
            <div class="!mt-0">
              <label class="flex items-center cursor-pointer">
                <input
                  v-model="form.status"
                  type="radio"
                  value="hidden"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
                <span class="ml-2 text-sm text-gray-700">ซ่อน</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <ToggleSwitch
        class="mt-4"
        v-model="form.isCompleted"
        label="จบแล้ว"
        :description="form.isCompleted ? 'จบสมบูรณ์แล้ว' : 'ยังไม่จบ'"
        :error="errors.isCompleted"
      />
      <ToggleSwitch
        class="mt-4"
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

      <form @submit.prevent>
        <BaseButton
          @click="$emit('submit')"
          :disabled="isSubmitting"
          :loading="isSubmitting"
        >
          {{
            form.status === "published"
              ? isEditMode
                ? "อัปเดตและเผยแพร่"
                : "เผยแพร่"
              : "บันทึก"
          }}
        </BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { WorkFormType } from "~/types/work-form";

interface Props {
  modelValue: WorkFormType;
  errors?: Record<string, string>;
  isSubmitting?: boolean;
  isEditMode?: boolean;
  currentCoverUrl?: string;
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => ({}),
  isSubmitting: false,
  isEditMode: false,
  currentCoverUrl: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: WorkFormType];
  submit: [];
  "save-draft": [];
  "file-error": [message: string];
}>();

// ใช้ ref form ภายใน component
const form = ref<WorkFormType>({ ...props.modelValue });

// sync form -> parent
watch(
  form,
  (val) => {
    emit("update:modelValue", { ...val });
  },
  { deep: true }
);

// sync parent -> form
watch(
  () => props.modelValue,
  (val) => {
    if (val && JSON.stringify(val) !== JSON.stringify(form.value)) {
      form.value = { ...val };
    }
  },
  { deep: true }
);

// Category options
const categoryOptions = [
  { value: "romantic", text: "รักโรแมนติก" },
  { value: "drama", text: "ดราม่า" },
  { value: "comedy", text: "ตลก,คอมเมดี้" },
  { value: "fantasy", text: "แฟนตาซี" },
  { value: "online-game", text: "เกมออนไลน์" },
  { value: "martial", text: "กำลังภายใน" },
  { value: "action", text: "แอคชั่น" },
  { value: "adventure", text: "ผจญภัย" },
  { value: "sci-fi", text: "อดีต,อนาคต" },
  { value: "historical", text: "โบราณ,ย้อนยุค" },
  { value: "science", text: "ไซไฟ,วิทยาศาสตร์" },
  { value: "mystery", text: "ระทึกขวัญ" },
  { value: "detective", text: "สืบสวน" },
  { value: "slice-of-life", text: "สะท้อนชีวิต" },
  { value: "fanfic", text: "แฟนฟิค (FanFiction)" },
  { value: "yaoi", text: "วาย (Yaoi)" },
  { value: "yuri", text: "ยูริ (Yuri)" },
  { value: "harem", text: "ฮาเร็ม" },
  { value: "isekai", text: "ต่างโลก" },
  { value: "school-life", text: "ชีวิตในโรงเรียน" },
  { value: "reborn", text: "เกิดใหม่" },
  { value: "system", text: "ระบบ" },
];

// Prevent duplicate selection
const secondaryCategoryOptions = computed(() => {
  return categoryOptions.filter(
    (opt) => opt.value !== form.value.primaryCategory
  );
});

const handleFileError = (message: string) => {
  emit("file-error", message);
};
</script>
