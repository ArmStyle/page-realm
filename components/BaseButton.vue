<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <!-- Loading Icon -->
    <svg 
      v-if="loading" 
      class="animate-spin w-5 h-5" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    
    <!-- Left Icon -->
    <component 
      v-else-if="leftIcon" 
      :is="leftIcon" 
      class="w-5 h-5" 
    />
    
    <!-- Icon Slot -->
    <slot v-else name="icon" />
    
    <!-- Text Content -->
    <span v-if="$slots.default || text">
      <slot>{{ loading && loadingText ? loadingText : text }}</slot>
    </span>
    
    <!-- Right Icon -->
    <component 
      v-if="rightIcon && !loading" 
      :is="rightIcon" 
      class="w-5 h-5" 
    />
    
    <!-- Right Icon Slot -->
    <slot v-if="!loading" name="rightIcon" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'success', 'danger', 'warning', 'info',
      'light', 'dark', 'outline-primary', 'outline-secondary', 'ghost'
    ].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: ''
  },
  leftIcon: {
    type: [String, Object],
    default: null
  },
  rightIcon: {
    type: [String, Object],
    default: null
  },
  block: {
    type: Boolean,
    default: false
  },
  rounded: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
  },
  class: {
    type: [String, Array, Object],
    default: ''
  }
})

defineEmits(['click'])

const buttonClasses = computed(() => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'disabled:transform-none'
  ]

  // Size classes
  const sizeClasses = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }

  // Rounded classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  }

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-primary text-white dark:bg-primary-light eyecare:bg-amber-600 eyecare:text-white eyecare-dark:bg-amber-500 eyecare-dark:text-amber-900',
      'hover:bg-primary-dark dark:hover:bg-primary eyecare:hover:bg-amber-700 eyecare-dark:hover:bg-amber-400 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-primary/50 dark:focus:ring-primary-light/50 eyecare:focus:ring-amber-600/50 eyecare-dark:focus:ring-amber-500/50',
      'active:transform active:scale-95'
    ],
    secondary: [
      'bg-gray-500 dark:bg-gray-600 eyecare:bg-amber-500 eyecare-dark:bg-amber-600 text-white',
      'hover:bg-gray-600 dark:hover:bg-gray-500 eyecare:hover:bg-amber-600 eyecare-dark:hover:bg-amber-500 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-gray-500/50 dark:focus:ring-gray-600/50 eyecare:focus:ring-amber-500/50 eyecare-dark:focus:ring-amber-600/50',
      'active:transform active:scale-95'
    ],
    success: [
      'bg-green-500 text-white',
      'hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-green-500/50',
      'active:transform active:scale-95'
    ],
    danger: [
      'bg-red-500 text-white',
      'hover:bg-red-600 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-red-500/50',
      'active:transform active:scale-95'
    ],
    warning: [
      'bg-yellow-500 text-white',
      'hover:bg-yellow-600 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-yellow-500/50',
      'active:transform active:scale-95'
    ],
    info: [
      'bg-blue-500 text-white',
      'hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-blue-500/50',
      'active:transform active:scale-95'
    ],
    light: [
      'bg-gray-100 text-gray-800 border border-gray-300',
      'hover:bg-gray-200 hover:shadow-md hover:-translate-y-0.5',
      'focus:ring-gray-300/50',
      'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
      'dark:hover:bg-gray-600',
      'active:transform active:scale-95'
    ],
    dark: [
      'bg-gray-800 text-white',
      'hover:bg-gray-900 hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-gray-800/50',
      'active:transform active:scale-95'
    ],
    'outline-primary': [
      'border-2 border-primary text-primary bg-transparent',
      'hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-primary/50',
      'active:transform active:scale-95'
    ],
    'outline-secondary': [
      'border-2 border-gray-400 text-gray-600 bg-transparent',
      'hover:bg-gray-400 hover:text-white hover:shadow-lg hover:-translate-y-0.5',
      'focus:ring-gray-400/50',
      'dark:text-gray-400 dark:border-gray-400',
      'dark:hover:bg-gray-400 dark:hover:text-gray-900',
      'active:transform active:scale-95'
    ],
    ghost: [
      'text-gray-600 bg-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus:ring-gray-300/50',
      'dark:text-gray-400',
      'dark:hover:bg-gray-700 dark:hover:text-gray-200'
    ]
  }

  // Block class
  const blockClass = props.block ? 'w-full' : ''

  return [
    ...baseClasses,
    sizeClasses[props.size],
    roundedClasses[props.rounded],
    ...variantClasses[props.variant],
    blockClass,
    props.class
  ].filter(Boolean).join(' ')
})
</script>
