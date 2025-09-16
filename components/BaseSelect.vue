<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        @change="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option 
          v-for="option in normalizedOptions" 
          :key="option.value" 
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Dropdown Icon -->
      <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    
    <!-- Help Text -->
    <p v-if="help && !error" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {{ help }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  help: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  class: {
    type: [String, Array, Object],
    default: ''
  },
  wrapperClass: {
    type: [String, Array, Object],
    default: 'w-full'
  },
  selectClass: {
    type: [String, Array, Object],
    default: ''
  }
})

defineEmits(['update:modelValue', 'focus', 'blur'])

// Normalize options to handle both string arrays and object arrays
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string') {
      return { label: option, value: option, disabled: false }
    }
    return {
      label: option.label || option.text || option.name,
      value: option.value || option.id,
      disabled: option.disabled || false
    }
  })
})

const selectClasses = computed(() => {
  const baseClasses = [
    'w-full rounded-lg border transition-colors appearance-none',
    'bg-white dark:bg-gray-700',
    'text-gray-800 dark:text-white',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'pr-10' // Space for dropdown icon
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 py-3',
    lg: 'px-4 py-4 text-lg'
  }

  // Border classes
  const borderClasses = props.error 
    ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 dark:border-gray-600'

  // Combine all classes
  const allClasses = [
    ...baseClasses,
    sizeClasses[props.size],
    borderClasses,
    props.class,
    props.selectClass
  ].filter(Boolean)

  return Array.isArray(allClasses) ? allClasses.join(' ') : allClasses
})
</script>
