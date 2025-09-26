<template>
  <Card>
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold dark:text-gray-100">จัดการตอน</h2>
      <div class="flex gap-2">
        <BaseButton variant="secondary" @click="sortModalOpen = true"
          >เรียงตอน</BaseButton
        >
        <BaseButton variant="primary" @click="openAddEpisode"
          >เพิ่มตอนใหม่</BaseButton
        >
      </div>
    </div>
    <div
      v-if="episodes.length === 0"
      class="text-gray-400 dark:text-gray-400/70 text-center py-8"
    >
      ยังไม่มีตอนในเรื่องนี้
    </div>
    <div v-else class="overflow-x-auto">
      <table
        class="min-w-full bg-white dark:bg-gray-800 rounded shadow text-sm"
      >
        <thead>
          <tr
            class="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
          >
            <th class="px-4 py-2 text-left">ลำดับ</th>
            <th class="px-4 py-2 text-left">ชื่อตอน</th>
            <th class="px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ep, idx) in episodes"
            :key="ep.id"
            class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30"
          >
            <td class="px-4 py-2 dark:text-gray-100">{{ idx + 1 }}</td>
            <td class="px-4 py-2 dark:text-gray-100">{{ ep.title }}</td>
            <td class="px-4 py-2 text-center flex gap-2 justify-center">
              <BaseButton
                variant="ghost"
                size="sm"
                class="flex items-center gap-1"
                @click="openEditEpisode(ep)"
              >
                <Icon icon="mdi:pencil" class="w-5 h-5" />
              </BaseButton>
              <BaseButton variant="ghost" size="sm" class="flex items-center gap-1">
                <Icon icon="mdi:eye" class="w-5 h-5" />
              </BaseButton>
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
    <EpisodeEditModal
      :open="episodeModalOpen"
      :episode="editingEpisode"
      :isEdit="isEdit"
      @close="episodeModalOpen = false"
      @save="handleSaveEpisode"
    />
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "~/components/BaseButton.vue";
import { Icon } from "@iconify/vue";

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
const episodeModalOpen = ref(false);
const isEdit = ref(false);
const editingEpisode = ref<any>(null);

function openAddEpisode() {
  isEdit.value = false;
  editingEpisode.value = null;
  episodeModalOpen.value = true;
}

function openEditEpisode(ep: any) {
  isEdit.value = true;
  editingEpisode.value = { ...ep };
  episodeModalOpen.value = true;
}

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

function handleSaveEpisode(ep: any) {
  if (isEdit.value && editingEpisode.value) {
    // Edit mode: update episode in list
    const idx = episodes.value.findIndex(e => e.id === editingEpisode.value.id);
    if (idx !== -1) episodes.value[idx] = { ...episodes.value[idx], ...ep };
  } else {
    // Add mode: add new episode
    const newId = `ep${episodes.value.length + 1}`;
    episodes.value.push({ id: newId, ...ep });
  }
}
</script>
