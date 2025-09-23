<template>
  <WriterLayout>
    <!-- Responsive Wrapper -->
    <div
      class="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-auto"
    >
      <!-- Dashboard Header -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full">
        <h2 class="text-2xl text-gray-800 dark:text-white font-bold mb-6">
          รายงานสถิติ
        </h2>

        <!-- Overview Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          <div
            class="p-4 stats-card bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 rounded-xl min-w-0"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-orange-100"
                >
                  ผลงานทั้งหมด
                </h3>
                <p
                  class="text-3xl font-bold text-orange-600 dark:text-orange-300 mt-2"
                >
                  {{ totalWorks }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  เรื่อง
                </p>
              </div>
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
              >
                <span class="text-xl sm:text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div
            class="p-4 stats-card bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl min-w-0"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-blue-100"
                >
                  ยอดวิวรวม
                </h3>
                <p
                  class="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-2"
                >
                  {{ totalViews.toLocaleString() }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  ครั้ง
                </p>
              </div>
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
              >
                <span class="text-xl sm:text-2xl">👁️</span>
              </div>
            </div>
          </div>

          <div
            class="p-4 stats-card bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-xl min-w-0"
          >
            <div class="flex items-center justify-between">
              <div>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-green-100"
                >
                  ผู้ติดตามรวม
                </h3>
                <p
                  class="text-3xl font-bold text-green-600 dark:text-green-300 mt-2"
                >
                  {{ totalFollowers.toLocaleString() }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">คน</p>
              </div>
              <div
                class="w-12 h-12 sm:w-16 sm:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center"
              >
                <span class="text-xl sm:text-2xl">❤️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <!-- Views Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full">
          <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
            ยอดวิวรายวัน
          </h3>
          <div
            class="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center"
          >
            <p class="text-gray-500 dark:text-gray-300">
              กราฟยอดวิว (ใน development)
            </p>
          </div>
        </div>

        <!-- Popular Works -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full">
          <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
            ผลงานยอดนิยม
          </h3>
          <div class="space-y-3">
            <div
              v-for="work in popularWorks"
              :key="work.id"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 bg-orange-200 dark:bg-orange-900 rounded text-center leading-8 text-sm font-bold"
                >
                  {{ work.rank }}
                </div>
                <div>
                  <p class="font-medium text-gray-800 dark:text-white">
                    {{ work.title }}
                  </p>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    {{ work.type }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-800 dark:text-white">
                  {{ work.views.toLocaleString() }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300">วิว</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full">
        <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
          กิจกรรมล่าสุด
        </h3>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start space-x-4"
          >
            <div
              class="w-2 h-2 bg-orange-400 dark:bg-orange-600 rounded-full mt-2"
            ></div>
            <div class="flex-1">
              <p class="text-gray-800 dark:text-white">
                {{ activity.message }}
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ formatDate(activity.date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </WriterLayout>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

// Mock data for dashboard
const totalWorks = ref(12);
const totalViews = ref(150420);
const totalFollowers = ref(3240);

const popularWorks = ref([
  { id: 1, rank: 1, title: "เรื่องราวแห่งดวงดาว", type: "นิยาย", views: 45000 },
  { id: 2, rank: 2, title: "การผจญภัยของฮีโร่", type: "การ์ตูน", views: 38000 },
  { id: 3, rank: 3, title: "รักในยุคดิจิทัล", type: "นิยาย", views: 32000 },
  { id: 4, rank: 4, title: "นักสู้แห่งอนาคต", type: "การ์ตูน", views: 28000 },
  { id: 5, rank: 5, title: "ชีวิตในมหาวิทยาลัย", type: "นิยาย", views: 22000 },
]);

const recentActivities = ref([
  {
    id: 1,
    message: "อัปเดตตอนใหม่ของ 'เรื่องราวแห่งดวงดาว'",
    date: new Date(),
  },
  {
    id: 2,
    message: "ได้รับความคิดเห็นใหม่ 15 ความคิดเห็น",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 3,
    message: "ผู้ติดตามใหม่ 8 คน",
    date: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: 4,
    message: "ผลงาน 'การผจญภัยของฮีโร่' ถูกแชร์ 12 ครั้ง",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
]);

const formatDate = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} นาทีที่แล้ว`;
  } else if (hours < 24) {
    return `${hours} ชั่วโมงที่แล้ว`;
  } else {
    return `${days} วันที่แล้ว`;
  }
};
</script>

<style scoped>
.stats-card {
  transition: all 0.3s ease;
  min-width: 0;
}

.stats-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
</style>
