<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">จัดการตอน</h2>
      <div class="flex gap-2">
          <BaseButton variant="secondary" @click="sortModalOpen = true">เรียงตอน</BaseButton>
          <BaseButton variant="primary" @click="addEpisode">เพิ่มตอนใหม่</BaseButton>
      </div>
    </div>
    <div v-if="episodes.length === 0" class="text-gray-400 text-center py-8">
      ยังไม่มีตอนในเรื่องนี้
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr class="bg-gray-50 text-gray-700">
            <th class="px-4 py-2 text-left">ลำดับ</th>
            <th class="px-4 py-2 text-left">ชื่อตอน</th>
            <th class="px-4 py-2 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ep, idx) in episodes"
            :key="ep.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ idx + 1 }}</td>
            <td class="px-4 py-2">{{ ep.title }}</td>
            <td class="px-4 py-2 text-center">
              <BaseButton variant="ghost" size="xs" disabled>ดู/แก้ไข</BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <EpisodeSortModal
      :open="sortModalOpen"
      :episodes="episodes"
      @close="sortModalOpen = false"
      @save="handleSaveSorted"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EpisodeSortModal from "~/components/EpisodeSortModal.vue";
import BaseButton from '~/components/BaseButton.vue';

interface Episode {
  id: string;
  title: string;
}

const props = defineProps<{ workId: string }>();

// Mock: Replace with real fetch from API/store
const episodes = ref<Episode[]>([
  { id: "ep1", title: "ตอนที่ 1: จุดเริ่มต้น" },
  { id: "ep2", title: "ตอนที่ 2: การผจญภัย" },
  { id: "ep3", title: "ตอนที่ 3: การกลับบ้าน" },
  { id: "ep4", title: "ตอนที่ 4: จุดจบ" },
]);

const sortModalOpen = ref(false);

function addEpisode() {
  const newId = `ep${episodes.value.length + 1}`;
  episodes.value.push({
    id: newId,
    title: `ตอนที่ ${episodes.value.length + 1}: (ยังไม่ตั้งชื่อ)`,
  });
}

function handleSaveSorted(newOrder: Episode[]) {
  episodes.value = [...newOrder];
}
</script>
