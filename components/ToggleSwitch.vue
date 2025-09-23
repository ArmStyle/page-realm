<template>
  <div class="toggle-switch">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="flex items-center gap-3">
      <button
        type="button"
        :class="[
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isOn ? 'bg-primary' : 'bg-gray-200'
        ]"
        @click="toggle"
        :aria-pressed="isOn"
      >
        <span
          :class="[
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            isOn ? 'translate-x-5' : 'translate-x-0'
          ]"
        />
      </button>
      
      <span v-if="description" class="text-sm text-gray-600">
        {{ description }}
      </span>
    </div>
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  label?: string
  description?: string
  required?: boolean
  error?: string
  help?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOn = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toggle = () => {
  isOn.value = !isOn.value
}
</script>
