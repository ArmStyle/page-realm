<template>
  <WriterLayout>
    <ContentWrapper>
      <Breadcrumb
        title="แก้ไขผลงาน"
        :back-label="'กลับหน้ารายการ'"
        :current="work?.title || 'แก้ไขผลงาน'"
        @back="goBack"
      />
      <div class="flex mx-2">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="px-4 py-2 -mb-px text-sm font-medium focus:outline-none transition border-b-2"
          :class="
            activeTab === tab.key
              ? 'border-primary text-white bg-primary rounded-t'
              : 'border-transparent text-gray-500 hover:text-primary'
          "
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      <div v-if="activeTab === 'info'">
        <WorkForm
          v-if="work"
          class="rounded-b"
          type="comic"
          :isEditMode="true"
          :modelValue="form"
          :currentCoverUrl="work.coverImage || ''"
          @update:modelValue="(val: WorkFormType) => form = val"
          @success="onSuccess"
          @error="onError"
        />
        <div v-else class="text-center py-10 text-gray-500">
          ไม่พบข้อมูลผลงาน
        </div>
      </div>
      <div v-else-if="activeTab === 'episodes'">
        <EpisodeManager :workId="workId" />
      </div>
    </ContentWrapper>
  </WriterLayout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { useWorksStore } from "~/stores/works";
import WorkForm from "~/components/WorkForm.vue";
import EpisodeManager from "~/components/EpisodeManager.vue";
import Breadcrumb from "~/components/Breadcrumb.vue";
import type { WorkFormType } from "~/types/work-form";

const route = useRoute();
const router = useRouter();
const worksStore = useWorksStore();

const workId = route.query.id as string;
let work = ref(worksStore.getWorkById(workId));

// Mock data if not found
if (!work.value) {
  work.value = {
    id: workId || "mock-id",
    title: "ตัวอย่างคอมิก",
    description: "นี่คือคำอธิบายของคอมิกตัวอย่าง",
    type: "comic",
    category: "fantasy",
    tags: ["แฟนตาซี", "ผจญภัย"],
    coverImage: "https://placehold.co/300x400/png?text=Comic+Cover",
    publishStatus: "published",
    ageRating: "all",
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 100,
    favoriteCount: 10,
    chapterCount: 5,
    status: "ongoing",
  };
}

const form = ref<WorkFormType | undefined>(undefined);
const tabs = [
  { label: "ข้อมูล", key: "info" },
  { label: "จัดการตอน", key: "episodes" },
] as const;
const activeTab = ref<(typeof tabs)[number]["key"]>("info");

watchEffect(() => {
  if (work.value) {
    form.value = {
      coverImage: null,
      title: work.value.title,
      primaryCategory: work.value.category,
      secondaryCategory: "",
      description: work.value.description,
      synopsis: "",
      tags: work.value.tags,
      contentWarnings: [],
      status: work.value.status === "hiatus" ? "hidden" : "published",
      allowComments: true,
      isCompleted: work.value.status === "completed",
    };
  } else {
    form.value = undefined;
  }
});

function onSuccess() {
  // redirect or show success message
  router.push("/writer");
}
function onError(msg: string) {
  // show error
  alert(msg);
}
function goBack() {
  router.push("/writer/novel");
}
</script>
