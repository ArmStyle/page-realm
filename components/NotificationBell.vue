<template>
  <div class="relative notification-bell">
    <button
      @click="toggleNotifications"
      class="nav-link relative"
      title="แจ้งเตือน"
    >
      <Icon icon="mdi:bell" class="w-5 h-5" />
      <span v-if="notifications.length" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{{ notifications.length }}</span>
    </button>
    <Transition name="fade">
      <div
        v-if="showNotifications"
        class="absolute top-7 -right-[6rem] md:right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50"
      >
        <div class="p-4 border-b border-gray-100 dark:border-gray-700 font-bold text-gray-700 dark:text-gray-200">แจ้งเตือน</div>
        <ul class="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
          <li v-for="n in notifications" :key="n.id" class="p-4 text-sm text-gray-700 dark:text-gray-200">
            <div>{{ n.message }}</div>
            <div class="text-xs text-gray-400 mt-1">{{ n.time }}</div>
          </li>
          <li v-if="!notifications.length" class="p-4 text-center text-gray-400">ไม่มีแจ้งเตือน</li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["close"]);
const showNotifications = ref(false);
const notifications = ref([
  { id: 1, message: "มีตอนใหม่ของนิยายที่คุณติดตาม!", time: "1 นาทีที่แล้ว" },
  { id: 2, message: "ระบบจะปิดปรับปรุงคืนนี้ 23:00 น.", time: "2 ชั่วโมงที่แล้ว" },
]);

function toggleNotifications() {
  showNotifications.value = !showNotifications.value;
}

function handleClickOutside(event) {
  if (!event.target.closest(".notification-bell")) {
    showNotifications.value = false;
    emit("close");
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
