<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 eyecare:text-amber-800 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <textarea
        :id="id"
        v-model="inputValue"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :class="textareaClasses"
        :style="textareaStyle"
        @input="onInput"
      />
    </div>
    <!-- Error Message & Character Counter on the same line -->
    <div
      v-if="(error || help) || (showCounter && maxlength)"
      class="mt-1 flex justify-between text-xs items-center"
    >
      <span
        v-if="error"
        class="text-red-600 dark:text-red-400 eyecare:text-red-700"
        >{{ error }}</span
      >
      <div
        v-else-if="help && !error"
        class="mt-1 text-xs text-gray-500 dark:text-gray-400 eyecare:text-amber-600"
      >
        {{ help }}
      </div>
      <span
        v-if="showCounter && maxlength"
        class="text-gray-500 dark:text-gray-400 ml-auto"
        >{{ inputValue.length }}/{{ maxlength }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
  readonly: Boolean,
  textareaClass: { type: String, default: '' },
  textareaStyle: { type: [String, Object], default: '' },
  labelClass: { type: String, default: '' },
  labelStyle: { type: [String, Object], default: 'color: var(--color-label)' },
  showCounter: { type: Boolean, default: false },
  wrapperClass: { type: [String, Array, Object], default: 'w-full' },
})
const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

const textareaClasses = computed(() => {
  const baseClasses = [
    'w-full rounded-lg border transition-colors',
    'bg-white dark:bg-gray-700 eyecare:bg-amber-50',
    'text-gray-800 dark:text-white eyecare:text-amber-900',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'readonly:bg-gray-50 dark:readonly:bg-gray-800 eyecare:readonly:bg-amber-25 -800',
    'resize-none',
    'px-3 py-3', // เพิ่ม padding ให้เหมือน input
  ];
  // Error state
  const errorClasses = props.error
    ? 'border-red-300 dark:border-red-600 eyecare:border-red-400  focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 dark:border-gray-600 eyecare:border-amber-300';
  return [
    ...baseClasses,
    errorClasses,
    props.textareaClass,
  ].filter(Boolean).join(' ');
});
</script>
