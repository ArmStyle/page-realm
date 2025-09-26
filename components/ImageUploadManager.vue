<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 eyecare:text-amber-800 mb-2">อัปโหลดรูปภาพ (สูงสุด 100 รูป, .png, .jpg, .jpeg, ไฟล์ละไม่เกิน 20MB) <span class="text-red-500"> *</span></label>
    <div class="upload-area mb-2 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 hover:bg-gray-100 transition cursor-pointer relative"
         :class="{'border-blue-400': isDragOver, 'border-gray-300': !isDragOver}"
         @dragover.prevent="isDragOver = true"
         @dragleave.prevent="isDragOver = false"
         @drop.prevent="handleDrop">
      <input
        type="file"
        accept=".png,.jpg,.jpeg"
        multiple
        :disabled="files.length >= 100"
        @change="onFileChange"
        class="absolute inset-0 opacity-0 cursor-pointer"
        style="height:100%;width:100%"
      />
      <div class="flex flex-col items-center pointer-events-none">
        <Icon icon="ph:image" class="text-gray-700 text-4xl mb-2" />
        <span class="text-gray-500">ลากไฟล์มาวาง หรือ <span class="text-blue-500 underline">เลือกไฟล์</span></span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="text-xs text-gray-400">* สามารถลากเพื่อจัดเรียงลำดับรูปภาพได้</div>
      <div class="text-xs text-gray-500">เลือกแล้ว {{ files.length }} / 100 รูป</div>
    </div>
    <div v-if="error" class="text-red-500 text-sm mb-2">{{ error }}</div>
    <draggable v-model="files" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4" :options="{animation:150}">
      <template #item="{element, index}">
        <div class="relative group shadow-md rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition">
          <img :src="element.preview" class="w-full h-40 object-cover bg-gray-100" />
          <button type="button" class="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white rounded-full p-1 shadow text-xs transition-opacity opacity-0 group-hover:opacity-100" @click="removeFile(index)">
            <Icon icon="ph:x-bold" class="w-4 h-4" />
          </button>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import draggable from 'vuedraggable';
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  error: String
});
const emit = defineEmits(['update:modelValue']);

const files = ref<any[]>([]);
const error = ref('');
const isDragOver = ref(false);

watch(() => props.modelValue, (val) => {
  files.value = val ? [...val] : [];
}, { immediate: true });

function onFileChange(e: Event) {
  error.value = '';
  const input = e.target as HTMLInputElement;
  if (!input.files) return;
  const selected = Array.from(input.files);
  if (files.value.length + selected.length > 100) {
    error.value = 'อัปโหลดได้สูงสุด 100 รูป';
    return;
  }
  for (const file of selected) {
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      error.value = 'รองรับเฉพาะไฟล์ .png, .jpg, .jpeg';
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      error.value = 'ไฟล์ต้องไม่เกิน 20MB';
      return;
    }
  }
  const fileObjs = selected.map(file => ({
    file,
    preview: URL.createObjectURL(file)
  }));
  files.value.push(...fileObjs);
  emit('update:modelValue', files.value);
}

function handleDrop(e: DragEvent) {
  isDragOver.value = false;
  if (!e.dataTransfer) return;
  const droppedFiles = Array.from(e.dataTransfer.files);
  const fakeEvent = { target: { files: droppedFiles } } as unknown as Event;
  onFileChange(fakeEvent);
}

function removeFile(idx: number) {
  files.value.splice(idx, 1);
  emit('update:modelValue', files.value);
}

watch(files, (val) => {
  emit('update:modelValue', val);
});
</script>

<style scoped>
.upload-area {
  min-height: 120px;
  border-width: 2px;
  border-style: dashed;
  transition: border-color 0.2s, background 0.2s;
}
.upload-area.border-blue-400 {
  background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%);
}
.upload-area input[type="file"] {
  cursor: pointer;
}
.group:hover button,
.group:focus-within button {
  opacity: 1 !important;
}
</style>
