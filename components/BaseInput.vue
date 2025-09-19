<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 eyecare:text-amber-800 eyecare-dark:text-amber-200 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :maxlength="maxlength"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keyup.enter="$emit('enter', $event)"
      >
      
      <!-- Icon Slot -->
      <div v-if="$slots.icon || icon" class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <slot name="icon">
          <component :is="icon" v-if="icon" class="w-5 h-5 text-gray-400" />
        </slot>
      </div>
      
      <!-- Right Icon/Button Slot -->
      <div v-if="$slots.rightIcon" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <slot name="rightIcon" />
      </div>
    </div>
    
    <!-- Character Counter -->
    <div v-if="showCounter && maxlength" class="mt-1 flex justify-end">
      <span class="text-xs text-gray-500 dark:text-gray-400">
        {{ String(modelValue).length }}/{{ maxlength }}
      </span>
    </div>
    
    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400 eyecare:text-red-700 eyecare-dark:text-red-300">
      {{ error }}
    </p>
    
    <!-- Help Text and Counter -->
    <div v-if="help || (showCounter && maxlength)" class="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400 eyecare:text-amber-600 eyecare-dark:text-amber-400">
      <span v-if="help && !error">{{ help }}</span>
      <span v-if="showCounter && maxlength" class="ml-auto">{{ String(modelValue).length }}/{{ maxlength }}</span>
    </div>
    
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
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
  readonly: {
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
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'search'].includes(value)
  },
  icon: {
    type: [String, Object],
    default: null
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  maxlength: {
    type: [String, Number],
    default: undefined
  },
  showCounter: {
    type: Boolean,
    default: false
  },
  class: {
    type: [String, Array, Object],
    default: ''
  },
  wrapperClass: {
    type: [String, Array, Object],
    default: 'w-full'
  },
  inputClass: {
    type: [String, Array, Object],
    default: ''
  }
})

defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

const inputClasses = computed(() => {
  const baseClasses = [
    'w-full rounded-lg border transition-colors',
    'bg-white dark:bg-gray-700 eyecare:bg-amber-50 eyecare-dark:bg-amber-900',
    'text-gray-800 dark:text-white eyecare:text-amber-900 eyecare-dark:text-amber-100',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'readonly:bg-gray-50 dark:readonly:bg-gray-800 eyecare:readonly:bg-amber-25 eyecare-dark:readonly:bg-amber-800'
  ]

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 py-3',
    lg: 'px-4 py-4 text-lg'
  }

  // Variant classes
  const variantClasses = {
    default: 'border-gray-300 dark:border-gray-600 eyecare:border-amber-300 eyecare-dark:border-amber-600',
    search: 'border-gray-300 dark:border-gray-600 eyecare:border-amber-300 eyecare-dark:border-amber-600'
  }

  // Icon padding
  const iconPadding = props.icon ? 'pl-10' : ''
  const rightIconPadding = '$slots.rightIcon' ? 'pr-10' : ''

  // Error state
  const errorClasses = props.error 
    ? 'border-red-300 dark:border-red-600 eyecare:border-red-400 eyecare-dark:border-red-500 focus:ring-red-500 focus:border-red-500'
    : ''

  // Combine all classes
  const allClasses = [
    ...baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    iconPadding,
    rightIconPadding,
    errorClasses,
    props.class,
    props.inputClass
  ].filter(Boolean)

  return Array.isArray(allClasses) ? allClasses.join(' ') : allClasses
})
</script>
