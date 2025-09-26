<template>
  <div class="base-textarea">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 eyecare:text-amber-800 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :id="id"
      v-model="inputValue"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :rows="rows"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors',
        error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700',
        'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
        textareaClass
      ]"
      :style="textareaStyle"
      @input="onInput"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    <p v-if="help" class="mt-1 text-sm" :style="labelStyle">{{ help }}</p>
    <div v-if="showCounter && maxlength" class="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
      {{ inputValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
  label: String,
  placeholder: String,
  maxlength: Number,
  rows: { type: Number, default: 3 },
  required: Boolean,
  error: String,
  help: String,
  id: { type: String, default: () => `base-textarea-${Math.random().toString(36).substr(2, 9)}` },
  disabled: Boolean,
  textareaClass: { type: String, default: '' },
  textareaStyle: { type: [String, Object], default: '' },
  labelClass: { type: String, default: '' },
  labelStyle: { type: [String, Object], default: 'color: var(--color-label)' },
  showCounter: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}
</script>
