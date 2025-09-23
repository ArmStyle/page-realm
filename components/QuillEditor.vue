<template>
  <div class="quill-editor">
    <label v-if="label" :for="id" class="block text-sm font-medium mb-2" style="color: var(--color-label)">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="quill-wrapper">
      <QuillEditor
        v-model:content="content"
        :options="quillOptions"
        content-type="html"
        @textChange="handleTextChange"
        :placeholder="placeholder"
        class="min-h-[200px] text-gray-700 dark:text-gray-300"
      />
    </div>
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="help" class="mt-1 text-sm text-gray-500">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
  help?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'เขียนเรื่องย่อ...',
  required: false,
  id: () => `quill-editor-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const quillOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ]
  },
  placeholder: props.placeholder
}

const handleTextChange = () => {
  // Handle text change if needed
}
</script>

<style>
.quill-editor .ql-toolbar {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: none;
}

.quill-editor .ql-container {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: none;
  font-family: inherit;
}

.quill-editor .ql-editor {
  min-height: 200px;
}

.quill-editor .ql-editor.ql-blank::before {
  font-style: normal;
  color: #9ca3af;
}
</style>
