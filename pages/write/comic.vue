<template>
  <WriterLayout>
    <!-- Responsive Wrapper -->
    <div class="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-auto">
      <!-- Works Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">ผลงานการ์ตูน</h2>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 w-full">
          <div
            class="stats-card bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 p-4 sm:p-6 rounded-xl min-w-0"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-700 dark:text-orange-100">
                  ผลงานการ์ตูนทั้งหมด
                </h3>
                <p class="text-3xl font-bold text-orange-600 dark:text-orange-300 mt-2 break-words">
                  {{ worksStore.stats.totalWorks }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">เรื่อง</p>
              </div>
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
              >
                <span class="text-xl sm:text-2xl">✏️</span>
              </div>
            </div>
          </div>

          <div
            class="stats-card bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4 sm:p-6 rounded-xl min-w-0"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-700 dark:text-blue-100">
                  คนกำลังติดตาม
                </h3>
                <p class="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-2 break-words">
                  {{ worksStore.stats.totalFavorites }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">คน</p>
              </div>
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
              >
                <span class="text-xl sm:text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
          <BaseSelect
            v-model="filterBy"
            label="เรียงตาม"
            :options="sortOptions"
          />

          <BaseSelect
            v-model="statusFilter"
            label="สถานะเรื่อง"
            :options="statusOptions"
          />

          <BaseSelect
            v-model="publishFilter"
            label="สถานะการเผยแพร่"
            :options="publishStatusOptions"
          />
        </div>

        <!-- Filter Button -->
        <div class="flex justify-end w-full">
          <button
            @click="applyFilters"
            class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>กรอง</span>
          </button>
        </div>
      </div>

      <!-- Works List or Empty State -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full overflow-x-auto">
        <!-- Loading State -->
        <div v-if="worksStore.loading" class="text-center py-12">
          <div
            class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 dark:border-orange-300"
          ></div>
          <p class="mt-4 text-gray-600 dark:text-gray-300">กำลังโหลด...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="worksStore.error" class="text-center py-12">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
          >
            <span class="text-2xl">⚠️</span>
          </div>
          <h3 class="text-xl font-bold text-gray-700 dark:text-red-200 mb-2">เกิดข้อผิดพลาด</h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 break-words">{{ worksStore.error }}</p>
          <button
            @click="worksStore.fetchWorks()"
            class="bg-orange-500 dark:bg-orange-700 text-white px-6 py-2 rounded-lg hover:bg-orange-600 dark:hover:bg-orange-800 transition-colors"
          >
            ลองใหม่
          </button>
        </div>

        <!-- Works Grid -->
        <div v-else-if="filteredWorks.length > 0" class="space-y-4">
          <div
            v-for="work in filteredWorks"
            :key="work.id"
            class="work-card border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow w-full min-w-0 overflow-x-auto"
          >
            <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <!-- Cover Image -->
              <div
                class="w-16 h-20 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden mb-2 sm:mb-0"
              >
                <img
                  v-if="work.coverImage"
                  :src="work.coverImage"
                  :alt="work.title"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <span class="text-gray-400 dark:text-gray-500 text-sm">📖</span>
                </div>
              </div>

              <!-- Work Info -->
              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">
                      {{ work.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2 break-words">
                      {{ work.description }}
                    </p>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-1 mb-2">
                      <span
                        v-for="tag in work.tags.slice(0, 3)"
                        :key="tag"
                        class="bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-200 px-2 py-1 rounded text-xs truncate"
                      >
                        {{ tag }}
                      </span>
                      <span
                        v-if="work.tags.length > 3"
                        class="text-gray-500 dark:text-gray-400 text-xs px-2 py-1"
                      >
                        +{{ work.tags.length - 3 }}
                      </span>
                    </div>

                    <!-- Stats -->
                    <div
                      class="flex flex-wrap items-center space-x-2 sm:space-x-4 text-sm text-gray-500 dark:text-gray-400"
                    >
                      <span>👁️ {{ work.viewCount.toLocaleString() }}</span>
                      <span>❤️ {{ work.favoriteCount.toLocaleString() }}</span>
                      <span>🎨 {{ work.chapterCount }} ตอน</span>
                      <span>{{ formatDate(work.updatedAt) }}</span>
                    </div>
                  </div>

                  <!-- Status and Actions -->
                  <div class="flex flex-col items-end space-y-2 min-w-[100px]">
                    <div class="flex space-x-2">
                      <span
                        :class="[
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getPublishStatusColor(work.publishStatus),
                        ]"
                      >
                        {{ getPublishStatusText(work.publishStatus) }}
                      </span>
                    </div>

                    <div class="flex space-x-2">
                      <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                        แก้ไข
                      </button>
                      <button class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm">
                        สถิติ
                      </button>
                      <button class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm">
                        ลบ
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div
            class="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 rounded-full flex items-center justify-center"
          >
            <span class="text-4xl sm:text-6xl">✏️</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">
            ยังไม่มีผลงานการ์ตูน
          </h3>
          <p class="text-gray-500 dark:text-gray-300 mb-8 max-w-md mx-auto">
            เริ่มต้นสร้างการ์ตูนเรื่องแรกของคุณ
          </p>
          <button
            @click="addNewWork"
            class="btn-primary bg-gradient-to-r from-orange-400 to-pink-400 dark:from-orange-700 dark:to-pink-700 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>+</span>
            <span>การ์ตูนใหม่</span>
          </button>
        </div>
      </div>
    </div>
  </WriterLayout>
</template>

<script setup>
import { useWorksStore } from "~/stores/works";

definePageMeta({
  layout: "default",
});

const worksStore = useWorksStore();
const router = useRouter();

// Form data
const selectedCategory = ref("ผลงานการ์ตูน");
const filterBy = ref("อัปเดต");
const statusFilter = ref("ทั้งหมด");
const publishFilter = ref("ทั้งหมด");

// Options for selects
const categoryOptions = ["รายงานสถิติ", "ผลงานนิยาย", "ผลงานการ์ตูน"];

const sortOptions = ["อัปเดต", "ชื่อเรื่อง", "วันที่สร้าง", "ยอดวิว"];

const statusOptions = ["ทั้งหมด", "กำลังเขียน", "จบแล้ว", "หยุดชั่วคราว"];

const publishStatusOptions = ["ทั้งหมด", "เผยแพร่", "ร่าง", "รออนุมัติ"];

// Methods
const handleCategoryChange = (value) => {
  const routes = {
    รายงานสถิติ: "/write/dashboard",
    ผลงานนิยาย: "/write/novel",
    ผลงานการ์ตูน: "/write/comic",
  };
  if (routes[value]) {
    router.push(routes[value]);
  }
};

// โหลดข้อมูลผลงานเมื่อ component mount
onMounted(() => {
  worksStore.fetchWorks("comic");
});

// ฟังก์ชันสำหรับกรองผลงาน
const filteredWorks = computed(() => {
  let filtered = [...worksStore.works.filter((work) => work.type === "comic")];

  // กรองตามสถานะเรื่อง
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

  // กรองตามสถานะการเผยแพร่
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

  // เรียงลำดับ
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

// ฟังก์ชันเพื่อเพิ่มผลงานใหม่
const addNewWork = () => {
  router.push("/write/new?type=comic");
};

// Functions
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

// ฟังก์ชันสำหรับแปลงสถานะ
const getStatusText = (status) => {
  const statusMap = {
    ongoing: "กำลังเขียน",
    completed: "จบแล้ว",
    hiatus: "หยุดชั่วคราว",
  };
  return statusMap[status] || status;
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
/* เพิ่ม custom styles ถ้าจำเป็น */
.gradient-bg {
  background: linear-gradient(135deg, #ff9a56 0%, #ffad56 100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Hover animations */
.work-card {
  transition: all 0.3s ease;
  min-width: 0;
}

.work-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom scrollbar for sidebar */
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #e2e8f0;
  border-radius: 4px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #cbd5e0;
}

/* Stats card animations */
.stats-card {
  transition: all 0.3s ease;
  min-width: 0;
}

.stats-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Button animations */
.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(251, 146, 60, 0.3);
}

/* Loading animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
