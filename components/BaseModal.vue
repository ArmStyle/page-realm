<template>
  <transition name="fade">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-0 relative overflow-hidden animate-fadeIn">
        <div class="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
          <slot name="header">
            <h3 class="text-lg font-semibold">Modal</h3>
          </slot>
          <button class="text-gray-400 hover:text-gray-600 text-xl" @click="$emit('close')">✕</button>
        </div>
        <div class="px-6 py-4">
          <slot />
        </div>
        <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>();
const emits = defineEmits(['close']);
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.animate-fadeIn {
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
