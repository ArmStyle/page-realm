<template>
  <header
    :class="[{
      '-translate-y-full': !showHeader,
      'translate-y-0': showHeader
    }, 'fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 transition-transform duration-300']"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-12 md:h-16">
        <div class="flex items-center gap-2">
          <!-- Mobile Menu -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg transition-colors"
          >
            <Icon
              icon="mdi:menu"
              class="w-5 h-5 text-gray-600 dark:text-gray-400"
            />
          </button>
          <!-- Logo and Title -->
          <NuxtLink
            to="/"
            class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div
              class="w-10 h-10 bg-transparent rounded-xl flex items-center justify-center"
            >
              <img
                src="~/assets/img/logo.png"
                alt="Logo"
                class="w-full h-full"
              />
            </div>
            <div>
              <h1
                class="text-xl font-bold text-gray-800 dark:text-white hidden sm:block"
              >
                PageRealm
              </h1>
              <p
                class="text-xs text-gray-500 dark:text-gray-400 hidden sm:block"
              >
                อ่านมังงะ นิยาย
              </p>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            class="nav-link"
          >
            <Icon :icon="item.icon" class="w-5 h-5 mr-1 transition-colors" />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Right Side Controls -->
        <div class="flex items-center gap-3">
          <NuxtLink  v-if="authStore.isAuthenticated" to="/writer" class="nav-link">
            <Icon icon="mdi:pencil" class="w-5 h-5 mr-1 transition-colors" />
          </NuxtLink>

          <!-- Notification Bell -->
          <NotificationBell  v-if="authStore.isAuthenticated" />
          <!-- Quick Settings Dropdown -->
          <QuickSettings />

          <!-- User Menu -->
          <template v-if="authStore.isAuthenticated">
            <UserMenu />
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
              v-for="item in navigation"
              :key="item.to"
              :to="item.to"
              class="nav-link"
              @click="showMobileMenu = false"
            >
              <Icon :icon="item.icon" class="w-5 h-5 mr-1" />
              {{ item.label }}
            </NuxtLink>
          </nav>
        </div>
      </Transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useSettingsStore } from "~/stores/settings";
import { Icon } from "@iconify/vue";

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
const showNotifications = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);

const navigation = [
  {
    to: "/novels",
    icon: "mdi:book-open-variant",
    label: "นิยาย",
  },
  {
    to: "/manga",
    icon: "mdi:palette",
    label: "การ์ตูน",
  },
  {
    to: "/rankings",
    icon: "mdi:trophy-variant",
    label: "จัดอันดับ",
  },
  {
    to: "/search",
    icon: "mdi:magnify",
    label: "ค้นหา",
  },
];

function toggleMobileMenu() {
  showMobileMenu.value = !showMobileMenu.value;
}

const showHeader = ref(true);
const lastScrollY = ref(0); // set default to 0 to avoid SSR error
let ticking = false;

function handleScroll() {
  const currentY = window.scrollY;
  if (Math.abs(currentY - lastScrollY.value) < 10) return; // ignore small scrolls
  if (currentY > lastScrollY.value && currentY > 60) {
    showHeader.value = false; // scroll down, hide
  } else {
    showHeader.value = true; // scroll up, show
  }
  lastScrollY.value = currentY;
}

onMounted(() => {
  lastScrollY.value = window.scrollY; // set initial value on client only
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.header-transition {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tailwind utility classes used for transform */
.mobile-nav-enter-active,
.mobile-nav-leave-active,
.search-enter-active,
.search-leave-active {
  transition: all 0.3s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to,
.search-enter-from,
search-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
