<template>
  <h1 class="text-2xl font-bold mt-6 lg:mt-0 mb-2 dark:text-white">
    {{ title }}
  </h1>
  <nav class="mt-2 mb-6 flex items-center gap-2 text-sm text-gray-500">
    <button
      class="hover:underline flex items-center gap-1"
      @click="$emit('back')"
    >
      <IconifyIcon icon="mdi:arrow-left" class="w-4 h-4" />
      <span>{{ backLabel }}</span>
    </button>
    <span class="mx-2">/</span>
    <span class="font-medium text-gray-700 dark:text-gray-300">{{
      current
    }}</span>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Icon as IconifyIcon } from "@iconify/vue";

defineProps<{
  title?: string;
  backLabel?: string;
  current: string;
}>();
defineEmits(["back"]);
</script>
