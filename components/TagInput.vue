<template>
  <div class="tag-input">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <div class="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md min-h-[42px] bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md"
        >
          {{ tag }}
          <button
            type="button"
            @click="removeTag(index)"
            class="hover:bg-blue-200 rounded-full p-0.5"
          >
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </span>
        
        <input
          :id="id"
          v-model="inputValue"
          type="text"
          :placeholder="placeholder"
          :maxlength="maxTagLength"
          :disabled="tags.length >= maxTags"
          @keydown.enter.prevent="addTag"
          @keydown.comma.prevent="addTag"
          @keydown.space.prevent="addTag"
          @keydown.backspace="handleBackspace"
          class="flex-1 min-w-[120px] border-none outline-none bg-transparent disabled:cursor-not-allowed"
        />
      </div>
      
      <div class="flex justify-between mt-1 text-xs text-gray-500">
        <span>{{ tags.length }}/{{ maxTags }} แท็ก</span>
        <span v-if="inputValue">{{ inputValue.length }}/{{ maxTagLength }} ตัวอักษร</span>
      </div>
    </div>
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string[]
  label?: string
  placeholder?: string
  maxTags?: number
  maxTagLength?: number
  required?: boolean
  error?: string
  help?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'เพิ่มแท็ก...',
  maxTags: 40,
  maxTagLength: 30,
  required: false,
  id: () => `tag-input-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const inputValue = ref('')

const tags = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const addTag = () => {
  const trimmedValue = inputValue.value.trim()
  
  if (!trimmedValue) return
  
  if (tags.value.length >= props.maxTags) {
    return
  }
  
  if (trimmedValue.length > props.maxTagLength) {
    return
  }
  
  if (tags.value.includes(trimmedValue)) {
    inputValue.value = ''
    return
  }
  
  tags.value = [...tags.value, trimmedValue]
  inputValue.value = ''
}

const removeTag = (index: number) => {
  tags.value = tags.value.filter((_, i) => i !== index)
}

const handleBackspace = () => {
  if (inputValue.value === '' && tags.value.length > 0) {
    removeTag(tags.value.length - 1)
  }
}
</script>

<style scoped>
.tag-input input::placeholder {
  color: #9ca3af;
}
</style>
