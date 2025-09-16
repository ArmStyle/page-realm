<template>
  <div class="relative" ref="userMenuRef">
    <button
      @click="toggleUserMenu"
      class="relative w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-200 shadow-md hover:shadow-lg"
    >
      <img
        :src="authStore.userProfileImg"
        alt="avatar"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200"
      ></div>
    </button>

    <!-- Desktop/Tablet Dropdown (only) -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showUserMenu && !isMobile"
        class="user-dropdown absolute mt-3 w-72 md:w-80 max-w-[95vw] max-h-[75vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden backdrop-blur-lg"
        :class="{
          'right-0 origin-top-right': dropdownPosition === 'right',
          'left-0 origin-top-left': dropdownPosition === 'left',
          transform: true,
        }"
      >
        <!-- User Info Header -->
        <div
          class="p-4 bg-gradient-to-r from-primary/10 to-primary-dark/10 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-3">
            <img
              :src="authStore.userProfileImg"
              alt="avatar"
              class="w-12 h-12 rounded-full border-3 border-white shadow-lg"
            />
            <div class="flex-1 min-w-0">
              <h3
                class="font-bold text-base text-gray-800 dark:text-white truncate"
              >
                {{ authStore.user?.profileName }}
              </h3>
              <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
                @{{ authStore.user?.username }}
              </p>
            </div>
          </div>

          <!-- Coin Balance -->
          <div class="mt-2 p-2 bg-transparent rounded-lg">
            <div class="flex items-center justify-between gap-2">
              <span
                class="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <span class="text-sm"
                  >{{ authStore.userCoin.toFixed(2) }} เหรียญ</span
                >
              </span>
              <button
                class="px-3 py-1 bg-gradient-to-r from-primary to-primary-dark text-white rounded-md font-medium hover:shadow-lg transition-all duration-200 text-xs"
              >
                เติมเงิน
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Menu Items -->
        <div
          class="p-1 max-h-48 md:max-h-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="handleMenuClick"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group"
          >
            <span
              class="text-base transition-transform duration-200 flex-shrink-0"
              >{{ item.icon }}</span
            >
            <span
              class="font-medium text-sm text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors duration-200 truncate"
              >{{ item.label }}</span
            >
          </NuxtLink>
        </div>

        <!-- Desktop Logout -->
        <div class="p-1 border-t border-gray-200 dark:border-gray-700">
          <button
            @click="handleLogout"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
          >
            <span
              class="text-base group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
              >🚪</span
            >
            <span
              class="font-medium text-sm text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200"
              >ออกจากระบบ</span
            >
          </button>
        </div>
      </div>
    </Transition>
  </div>

  <!-- Mobile Fullscreen User Menu (outside normal flow) -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showUserMenu && isMobile"
        class="fixed inset-0 bg-white dark:bg-gray-900 z-[9999] overflow-y-auto"
        style="z-index: 9999"
        data-mobile-menu
      >
        <!-- Mobile Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10 backdrop-blur-sm"
        >
          <h2 class="text-lg font-bold text-gray-800 dark:text-white">
            เมนูผู้ใช้
          </h2>
          <button
            @click="handleClose"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="ปิดเมนู"
          >
            <svg
              class="w-6 h-6 text-gray-600 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile User Info -->
        <div
          class="p-6 bg-gradient-to-r from-primary/10 to-primary-dark/10 border-b border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center gap-4">
            <img
              :src="authStore.userProfileImg"
              alt="avatar"
              class="w-20 h-20 rounded-full border-3 border-white shadow-lg"
            />
            <div class="flex-1 min-w-0">
              <h3
                class="font-bold text-2xl text-gray-800 dark:text-white truncate"
              >
                {{ authStore.user?.profileName }}
              </h3>
              <p class="text-base text-gray-500 dark:text-gray-400 truncate">
                @{{ authStore.user?.username }}
              </p>
            </div>
          </div>

          <!-- Mobile Coin Balance -->
          <div class="mt-6 p-4 bg-transparent rounded-xl">
            <div class="flex items-center justify-between">
              <span
                class="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-3"
              >
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" />
                </svg>
                <span class="text-xl"
                  >{{ authStore.userCoin.toFixed(2) }} เหรียญ</span
                >
              </span>
              <button
                class="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                เติมเงิน
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Items -->
        <div class="p-4 flex-1">
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            @click="handleMenuClick"
            class="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 group mb-2"
          >
            <span
              class="text-3xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
              >{{ item.icon }}</span
            >
            <span
              class="font-medium text-lg text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors duration-200"
              >{{ item.label }}</span
            >
          </NuxtLink>
        </div>

        <!-- Mobile Logout -->
        <div
          class="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0 backdrop-blur-sm"
        >
          <div class="pb-safe">
            <button
              @click="handleLogout"
              class="w-full flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
            >
              <span
                class="text-3xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
                >🚪</span
              >
              <span
                class="font-medium text-lg text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200"
                >ออกจากระบบ</span
              >
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useAuthStore } from "~/stores/auth";

const emit = defineEmits(["close"]);

const authStore = useAuthStore();
const showUserMenu = ref(false);
const userMenuRef = ref(null);
const isMobile = ref(false);
const dropdownPosition = ref("left"); // 'left' or 'right'

// Menu items data
const menuItems = [
  { icon: "💳", label: "กระเป๋าเงินนักอ่าน", path: "/wallet" },
  { icon: "✏️", label: "หน้านักเขียน", path: "/writer" },
  { icon: "📚", label: "ชั้นหนังสือ", path: "/bookshelf" },
  { icon: "⏪", label: "ประวัติการอ่าน", path: "/history" },
  { icon: "🕒", label: "ประวัติการซื้อ", path: "/purchase-history" },
  { icon: "⚙️", label: "การตั้งค่า", path: "/settings" },
  { icon: "👥", label: "แนะนำเพื่อน", path: "/invite" },
  { icon: "💬", label: "ติดต่อแอดมิน", path: "/contact-admin" },
];

// Check if mobile screen
const checkMobile = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth < 768;
  }
};

// Check dropdown position to prevent overflow
const checkDropdownPosition = () => {
  if (typeof window !== "undefined" && userMenuRef.value && !isMobile.value) {
    const rect = userMenuRef.value.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const dropdownWidth = 320; // 20rem = 320px
    const margin = 20; // Safe margin from edge

    // If there's not enough space on the left, position to the right
    if (rect.left + dropdownWidth > windowWidth - margin) {
      dropdownPosition.value = "right";
    } else {
      dropdownPosition.value = "left";
    }
  }
};

// Body scroll lock functions
const lockBodyScroll = () => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-width, 0px)";
  }
};

const unlockBodyScroll = () => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
};

// Watch for mobile user menu changes to control body scroll
watch([showUserMenu, isMobile], ([isMenuOpen, mobile]) => {
  if (mobile && isMenuOpen) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
});

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
  if (showUserMenu.value) {
    emit("close");
    // Check position after DOM update
    nextTick(() => {
      checkDropdownPosition();
    });
  }
}

function handleClose() {
  showUserMenu.value = false;
}

function handleMenuClick() {
  showUserMenu.value = false;
}

function handleLogout() {
  showUserMenu.value = false;
  unlockBodyScroll(); // Ensure body scroll is unlocked
  authStore.logout();
}

function handleClickOutside(event) {
  // Don't close if clicking inside mobile fullscreen menu
  if (
    isMobile.value &&
    showUserMenu.value &&
    event.target.closest("[data-mobile-menu]")
  ) {
    return;
  }

  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false;
  }
}

// Calculate scrollbar width for body padding
const calculateScrollbarWidth = () => {
  if (typeof document !== "undefined") {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.cssText =
      "width: 100px; height: 100px; overflow: scroll; position: absolute; top: -9999px;";
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidth}px`
    );
  }
};

// Close menus when clicking outside
onMounted(() => {
  checkMobile();
  calculateScrollbarWidth();
  window.addEventListener("resize", () => {
    checkMobile();
    checkDropdownPosition();
  });
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("resize", () => {
    checkMobile();
    checkDropdownPosition();
  });
  document.removeEventListener("click", handleClickOutside);
  unlockBodyScroll(); // Cleanup on unmount
});

// Expose methods to parent
defineExpose({
  close: handleClose,
});
</script>

<style scoped>
/* Safe area support for mobile devices */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Custom scrollbar for user menu */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 9999px;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}

/* Responsive dropdown positioning */
.user-dropdown {
  min-width: 18rem;
  max-width: 95vw;
  transition: all 0.2s ease;
}

@media (min-width: 768px) {
  .user-dropdown {
    width: 20rem; /* w-80 equivalent */
    max-width: calc(100vw - 2rem);
  }
}

@media (max-width: 767px) {
  .user-dropdown {
    right: -1rem !important;
    left: auto !important;
    width: calc(100vw - 2rem);
    max-width: 18rem;
  }
}

@media (max-width: 480px) {
  .user-dropdown {
    right: -0.5rem !important;
    width: calc(100vw - 1rem);
    max-width: 16rem;
  }
}

/* Mobile fullscreen overlay improvements */
@media (max-width: 767px) {
  [data-mobile-menu] {
    height: 100vh;
    height: 100dvh; /* Dynamic viewport height for better mobile support */
  }
}

/* Prevent scroll bounce on iOS */
[data-mobile-menu] {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}
</style>
