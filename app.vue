<template>
  <ClientOnly>
    <NuxtLayout
      :class="[
        'min-h-screen transition-colors duration-300',
        settingsStore.isEyeCareMode
          ? 'bg-eyecare-bg'
          : 'bg-gray-50 dark:bg-gray-900',
      ]"
    >
      <NuxtPage />
    </NuxtLayout>
  </ClientOnly>
</template>

<script setup>
import { useSettingsStore } from "~/stores/settings";
import { useAuthStore } from "~/stores/auth";

const settingsStore = useSettingsStore();
const authStore = useAuthStore();

onMounted(async () => {
  settingsStore.initSettings();
  await authStore.initAuth();
});
</script>
