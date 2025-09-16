<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-12 md:h-16">
        <div class="flex items-center gap-2">
          <!-- Mobile Menu -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <!-- Logo and Title -->
          <NuxtLink
            to="/"
            class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div
              class="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center"
            >
              <img src="~/assets/img/logo.png" alt="Logo" class="w-full h-full" />
            </div>
            <div>
              <h1
                class="text-xl font-bold text-gray-800 dark:text-white hidden sm:block"
              >
                PageRealm
              </h1>
              <p class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                อ่านมังงะ นิยาย
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            to="/novels"
            class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2"
          >
            📖 นิยาย
          </NuxtLink>
          <NuxtLink
            to="/manga"
            class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2"
          >
            🎨 การ์ตูน
          </NuxtLink>
          <NuxtLink
            to="/rankings"
            class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2"
          >
            🏆 จัดอันดับ
          </NuxtLink>
        </nav>

        <!-- Right Side Controls -->
        <div class="flex items-center gap-3">
          <!-- Search -->
          <button
            @click="toggleSearch"
            class="p-2 rounded-lg !hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              class="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Quick Settings Toggle -->
          <button
            @click="toggleQuickSettings"
            :class="[
              'p-2 rounded-lg transition-colors',
              props.quickSettingsVisible
                ? ' text-primary'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400',
            ]"
            title="ปรับแต่งการอ่าน"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          <!-- User Menu -->
          <template v-if="authStore.isAuthenticated">
            <UserMenu @close="closeAllMenus" />
          </template>
          <template v-else>
            <BaseButton
              size="sm"
              variant="primary"
              text="เข้าสู่ระบบ"
              @click="router.push('/login')"
            >
            </BaseButton>
          </template>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition name="mobile-nav">
        <div
          v-if="showMobileMenu"
          class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <nav class="flex flex-col gap-3">
            <NuxtLink
              to="/novels"
              class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 py-2"
              @click="showMobileMenu = false"
            >
              📖 นิยาย
            </NuxtLink>
            <NuxtLink
              to="/manga"
              class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 py-2"
              @click="showMobileMenu = false"
            >
              🎨 การ์ตูน
            </NuxtLink>
            <NuxtLink
              to="/rankings"
              class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors font-medium flex items-center gap-2 py-2"
              @click="showMobileMenu = false"
            >
              🏆 จัดอันดับ
            </NuxtLink>
          </nav>
        </div>
      </Transition>

      <!-- Search Bar -->
      <Transition name="search">
        <div
          v-if="showSearch"
          class="py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="relative">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหานิยาย การ์ตูน หรือผู้แต่ง..."
              class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              @keyup.enter="performSearch"
            />
            <svg
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useSettingsStore } from "~/stores/settings";

const props = defineProps({
  quickSettingsVisible: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const emit = defineEmits(["quickSettingsToggle"]);

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const showMobileMenu = ref(false);
const showSearch = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);

function closeAllMenus() {
  showMobileMenu.value = false;
  showSearch.value = false;
}

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
  if (showMobileMenu.value) {
    showSearch.value = false;
  }
}

function toggleSearch() {
  router.push("/search");
  // showSearch.value = !showSearch.value;
  // if (showSearch.value) {
  //   showMobileMenu.value = false;
  //   nextTick(() => {
  //     searchInput.value?.focus();
  //   });
  // }
}

function toggleQuickSettings() {
  emit("quickSettingsToggle");
  if (showMobileMenu.value) showMobileMenu.value = false;
  if (showSearch.value) showSearch.value = false;
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    showSearch.value = false;
    searchQuery.value = "";
  }
};

function handleClickOutside(event) {
  // Close other menus if clicking outside header
  if (!event.target.closest("header")) {
    showMobileMenu.value = false;
    showSearch.value = false;
  }
}

// Close menus when clicking outside
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.mobile-nav-enter-active,
.mobile-nav-leave-active,
.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to,
.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
