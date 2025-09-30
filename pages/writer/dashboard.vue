<template>
  <WriterLayout>
    <!-- Responsive Wrapper -->
    <div
      class="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 overflow-x-auto"
    >
      <!-- Dashboard Header -->
      <Card class="mb-6">
        <div class="mb-6">
          <h2 class="text-2xl text-gray-800 dark:text-white font-bold mb-6">
            รายงานสถิติ
          </h2>
          <div v-for="group in statGroups" :key="group.label" class="mb-2">
            <div class="flex items-center gap-2 mb-2">
              <Icon
                :icon="group.icon"
                :class="
                  group.label === 'นิยาย'
                    ? 'text-xl text-indigo-500'
                    : 'text-xl text-pink-500'
                "
              />
              <span
                :class="
                  group.label === 'นิยาย'
                    ? 'text-lg font-semibold text-indigo-700 dark:text-indigo-200'
                    : 'text-lg font-semibold text-pink-700 dark:text-pink-200'
                "
                >{{ group.label }}</span
              >
            </div>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6 mb-6"
            >
              <div
                v-for="stat in group.stats"
                :key="stat.label"
                :class="
                  group.label === 'นิยาย'
                    ? 'p-4  bg-white dark:bg-gray-800 border border-indigo-100 dark:border-indigo-700 rounded-xl flex flex-col items-center'
                    : 'p-4  bg-white dark:bg-gray-800 border border-pink-100 dark:border-pink-700 rounded-xl flex flex-col items-center'
                "
              >
                <Icon
                  :icon="stat.icon"
                  class="text-3xl mb-2"
                  :class="
                    group.label === 'นิยาย'
                      ? 'text-indigo-400 dark:text-indigo-200'
                      : 'text-pink-400 dark:text-pink-200'
                  "
                />
                <div
                  class="text-base font-semibold text-gray-700 dark:text-white"
                >
                  {{ stat.label }}
                </div>
                <div
                  class="text-2xl font-bold"
                  :class="
                    group.label === 'นิยาย'
                      ? 'text-indigo-400 dark:text-indigo-200'
                      : 'text-pink-400 dark:text-pink-200'
                  "
                >
                  <template v-if="stat.isCurrency"
                    >฿{{ stat.value.toLocaleString() }}</template
                  >
                  <template v-else-if="stat.isNumber">{{
                    stat.value.toLocaleString()
                  }}</template>
                  <template v-else>{{ stat.value }}</template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
        <!-- Views Chart -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full"
        >
          <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-4">
            ยอดวิวรายวัน
          </h3>
          <div
            class="h-64 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center"
          >
            <p class="text-gray-800 dark:text-gray-300">
              กราฟยอดวิว (ใน development)
            </p>
          </div>
        </div>

        <!-- Popular Works -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 w-full"
        >
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
                  class="w-8 h-8 bg-orange-200 dark:bg-orange-900 dark:text-white rounded text-center leading-8 text-sm font-bold"
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
      <div
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 sm:p-6 mb-6 w-full"
      >
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
import { Icon } from "@iconify/vue";

definePageMeta({
  layout: "default",
});

// Mock data for dashboard
const totalWorks = ref(12);
const totalNovels = ref(7);
const totalComics = ref(5);
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

const statGroups = [
  {
    label: "นิยาย",
    icon: "mdi:book-open-variant",
    color: "purple",
    stats: [
      { label: "จำนวนเรื่อง", value: 7, icon: "mdi:book-open-variant" },
      { label: "จำนวนตอน", value: 80, icon: "mdi:format-list-numbered" },
      { label: "ยอดวิว", value: 90000, icon: "mdi:eye", isNumber: true },
      { label: "คนชื่นชอบ", value: 1200, icon: "mdi:heart", isNumber: true },
      { label: "Bookmark", value: 800, icon: "mdi:bookmark", isNumber: true },
      {
        label: "ยอดขายรวม",
        value: 15000,
        icon: "mdi:cash-multiple",
        isCurrency: true,
      },
    ],
  },
  {
    label: "การ์ตูน",
    icon: "mdi:palette",
    color: "pink",
    stats: [
      { label: "จำนวนเรื่อง", value: 5, icon: "mdi:palette" },
      { label: "จำนวนตอน", value: 40, icon: "mdi:format-list-numbered" },
      { label: "ยอดวิว", value: 60420, icon: "mdi:eye", isNumber: true },
      { label: "คนชื่นชอบ", value: 900, icon: "mdi:heart", isNumber: true },
      { label: "Bookmark", value: 600, icon: "mdi:bookmark", isNumber: true },
      {
        label: "ยอดขายรวม",
        value: 8000,
        icon: "mdi:cash-multiple",
        isCurrency: true,
      },
    ],
  },
];

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

<style scoped></style>
