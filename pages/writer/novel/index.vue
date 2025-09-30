<template>
  <WriterLayout>
    <!-- Responsive Wrapper -->
    <ContentWrapper>
      <!-- Works Header -->
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full"
      >
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2"
        >
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            ผลงานนิยาย
          </h2>
          <BaseButton
            @click="addNewWork"
            variant="primary"
            class="bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-500 dark:to-indigo-500 px-6 py-2"
          >
            <template #icon>
              <Icon icon="mdi:plus" class="w-5 h-5" />
            </template>
            นิยายใหม่
          </BaseButton>
        </div>

        <!-- Filter Section (single row) -->
        <div class="flex flex-col md:flex-row md:items-end gap-2 mb-6 w-full">
          <BaseSelect
            v-model="filterBy"
            label="เรียงตาม"
            :options="sortOptions"
            class="flex-1 min-w-[120px]"
          />

          <BaseSelect
            v-model="statusFilter"
            label="สถานะเรื่อง"
            :options="statusOptions"
            class="flex-1 min-w-[120px]"
          />

          <BaseSelect
            v-model="publishFilter"
            label="สถานะการเผยแพร่"
            :options="publishStatusOptions"
            class="flex-1 min-w-[120px]"
          />

          <BaseButton
            @click="applyFilters"
            variant="light"
            class="min-w-[100px] mt-2 md:mt-0 h-[48px]"
          >
            <template #icon>
              <Icon icon="mdi:magnify" class="w-5 h-5" />
            </template>
            กรอง
          </BaseButton>
        </div>

        <!-- Works List or Empty State -->
        <!-- Loading State -->
        <div v-if="novelsStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 dark:border-purple-300"
          ></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">กำลังโหลด...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="novelsStore.error" class="text-center py-12">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
          >
            <Icon
              icon="mdi:alert-circle-outline"
              class="text-2xl w-8 h-8 text-red-500 dark:text-red-300"
            />
          </div>
          <h3 class="text-xl font-bold text-gray-700 dark:text-red-200 mb-2">
            เกิดข้อผิดพลาด
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 break-words">
            {{ novelsStore.error }}
          </p>
          <BaseButton
            @click="novelsStore.fetchNovels()"
            variant="primary"
            class="bg-purple-500 dark:bg-purple-700 px-6 py-2"
          >
            ลองใหม่
          </BaseButton>
        </div>

        <!-- Works Table -->
        <template v-else-if="filteredWorks.length > 0">
          <div
            class="w-[calc(100vw_-_65px)] sm:w-[calc(100vw_-_100px)] md:w-full overflow-x-auto rounded-xl"
          >
            <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left font-semibold w-16">ปก</th>
                  <th class="px-4 py-3 text-left font-semibold min-w-[250px]">ชื่อเรื่อง</th>
                  <th class="px-4 py-3 text-center font-semibold min-w-[90px]">อัปเดต</th>
                  <th class="px-4 py-3 text-center font-semibold min-w-[100px]">สถานะ</th>
                  <th class="px-4 py-3 text-center font-semibold min-w-[270px]"></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                <tr
                  v-for="work in filteredWorks"
                  :key="work.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td class="px-4 py-3">
                    <div
                      class="w-12 h-16 bg-gray-200 dark:bg-gray-800 rounded flex items-center justify-center overflow-hidden"
                    >
                      <img
                        v-if="work.coverImage"
                        :src="work.coverImage"
                        :alt="work.title"
                        class="w-full h-full object-cover"
                      />
                      <span
                        v-else
                        class="text-lg text-gray-400 dark:text-gray-500"
                      >
                        <Icon icon="mdi:book-open-variant" class="w-6 h-6" />
                      </span>
                    </div>
                  </td>
                  <td
                    class="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px] truncate"
                  >
                    {{ work.title }}
                  </td>
                  <td class="px-4 py-3 text-center">
                    {{ formatDate(work.updatedAt) }}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-semibold',
                        getPublishStatusColor(work.publishStatus),
                      ]"
                    >
                      {{ getPublishStatusText(work.publishStatus) }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-center space-x-2">
                    <BaseButton
                      @click="router.push(`/writer/edit/${work.id}`)"
                      class="flex justify-center items-center gap-1 px-3 py-1"
                    >
                      <template #icon>
                        <Icon icon="mdi:eye" class="w-5 h-5" />
                      </template>
                      <span>ดูรายละเอียด</span>
                    </BaseButton>
                    <BaseButton
                      @click="router.push(`/writer/edit/${work.id}`)"
                      class="flex justify-center items-center gap-1 px-3 py-1"
                    >
                      <template #icon>
                        <Icon icon="mdi:pencil" class="w-5 h-5" />
                      </template>
                      <span>แก้ไข</span>
                    </BaseButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div
            class="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 rounded-full flex items-center justify-center"
          >
            <Icon
              icon="mdi:book-open-variant"
              class="text-4xl sm:text-6xl w-16 h-16 sm:w-24 sm:h-24 text-purple-400 dark:text-purple-700"
            />
          </div>
          <h3 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">
            ยังไม่มีผลงานนิยาย
          </h3>
          <p class="text-gray-500 dark:text-gray-300 mb-8 max-w-md mx-auto">
            เริ่มต้นเขียนนิยายเรื่องแรกของคุณ
          </p>
          <BaseButton
            @click="addNewWork"
            variant="primary"
            class="bg-gradient-to-r from-purple-400 to-indigo-400 dark:from-purple-700 dark:to-indigo-700 px-8 py-3 mx-auto"
          >
            <template #icon>
              <Icon icon="mdi:plus" class="w-5 h-5" />
            </template>
            นิยายใหม่
          </BaseButton>
        </div>
      </div>
    </ContentWrapper>
  </WriterLayout>
</template>

<script setup>
import { useWorksStore } from "~/stores/works";
import BaseButton from "~/components/BaseButton.vue";
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "default",
});

const novelsStore = useWorksStore();
const router = useRouter();

// Form data
const selectedCategory = ref("ผลงานนิยาย");
const filterBy = ref("อัปเดต");
const statusFilter = ref("ทั้งหมด");
const publishFilter = ref("ทั้งหมด");

// Options for selects
const categoryOptions = ["รายงานสถิติ", "ผลงานนิยาย", "ผลงานการ์ตูน"];

const sortOptions = ["อัปเดต", "ชื่อเรื่อง", "วันที่สร้าง", "ยอดวิว"];

const statusOptions = ["ทั้งหมด", "กำลังเขียน", "จบแล้ว", "หยุดชั่วคราว"];

const publishStatusOptions = ["ทั้งหมด", "เผยแพร่", "ร่าง", "รออนุมัติ"];

onMounted(() => {
  novelsStore.fetchWorks("novel");
});

// Computed
const filteredWorks = computed(() => {
  let filtered = [...novelsStore.works.filter((work) => work.type === "novel")];

  // Apply filters
  if (statusFilter.value !== "ทั้งหมด") {
    const statusMap = {
      กำลังเขียน: "ongoing",
      จบแล้ว: "completed",
      หยุดชั่วคราว: "hiatus",
    };
    filtered = filtered.filter(
      (work) => work.status === statusMap[statusFilter.value]
    );
  }

  if (publishFilter.value !== "ทั้งหมด") {
    const publishMap = {
      เผยแพร่: "published",
      ร่าง: "draft",
      รออนุมัติ: "pending",
    };
    filtered = filtered.filter(
      (work) => work.publishStatus === publishMap[publishFilter.value]
    );
  }

  // Apply sorting
  switch (filterBy.value) {
    case "ชื่อเรื่อง":
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "วันที่สร้าง":
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "ยอดวิว":
      filtered.sort((a, b) => b.viewCount - a.viewCount);
      break;
    default: // อัปเดต
      filtered.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }

  return filtered;
});

// Functions
const addNewWork = () => {
  router.push("/writer/novel/new");
};

const applyFilters = () => {
  // This function could trigger an API call in a real app
  console.log("Applying filters:", {
    filterBy: filterBy.value,
    statusFilter: statusFilter.value,
    publishFilter: publishFilter.value,
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("th-TH");
};

const getPublishStatusText = (status) => {
  const statusMap = {
    published: "เผยแพร่",
    draft: "ร่าง",
    pending: "รออนุมัติ",
  };
  return statusMap[status] || status;
};

const getPublishStatusColor = (status) => {
  const colorMap = {
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  return colorMap[status] || "bg-gray-100 text-gray-700";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.work-card {
  transition: all 0.3s ease;
  min-width: 0;
}

.work-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.stats-card {
  transition: all 0.3s ease;
  min-width: 0;
}

.stats-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
}
</style>
