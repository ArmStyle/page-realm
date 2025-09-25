<template>
  <BaseModal :open="open" @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-semibold">เรียงลำดับตอน</h3>
    </template>
    <draggable v-model="localEpisodes" item-key="id" class="space-y-3">
      <template #item="{ element, index }">
        <div class="flex items-center bg-white rounded-lg px-4 py-3 shadow border border-gray-100 cursor-move hover:shadow-md transition">
          <span class="mr-3 text-gray-300 text-lg select-none">☰</span>
          <span class="flex-1 font-medium text-gray-700">{{ element.title }}</span>
        </div>
      </template>
    </draggable>
    <template #footer>
      <div class="flex justify-end gap-2">
        <BaseButton variant="secondary" @click="$emit('close')">ยกเลิก</BaseButton>
        <BaseButton variant="primary" @click="saveOrder">บันทึก</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import draggable from 'vuedraggable';
import BaseModal from '~/components/BaseModal.vue';
import BaseButton from '~/components/BaseButton.vue';

const props = defineProps<{ open: boolean; episodes: { id: string; title: string }[] }>();
const emits = defineEmits(['close', 'save']);

const localEpisodes = ref([...props.episodes]);

watch(() => props.episodes, (val) => {
  localEpisodes.value = [...val];
});

function saveOrder() {
  emits('save', localEpisodes.value);
  emits('close');
}
</script>
