<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary/10 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 eyecare:from-amber-50 eyecare:via-amber-25 eyecare:to-amber-100 eyecare-dark:from-amber-900 eyecare-dark:via-amber-800 eyecare-dark:to-amber-900 flex items-center justify-center px-4"
  >
    <div class="max-w-md w-full">
      <!-- Login Form -->
      <div
        class="bg-white dark:bg-gray-800 eyecare:bg-amber-50 eyecare-dark:bg-amber-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 eyecare:border-amber-200 eyecare-dark:border-amber-700 p-8"
      >
        <!-- Header -->
        <div class="text-center mb-8">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-2xl font-bold text-primary dark:text-primary-light eyecare:text-amber-700 eyecare-dark:text-amber-300 hover:opacity-80 transition-opacity"
          >
            <div
              class="w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            PageRealm
          </NuxtLink>
        </div>
        <!-- Error Message -->
        <div
          v-if="authStore.error"
          class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 eyecare:bg-red-100 eyecare-dark:bg-red-800/20 border border-red-200 dark:border-red-800 eyecare:border-red-300 eyecare-dark:border-red-600 rounded-lg"
        >
          <p
            class="text-red-600 dark:text-red-400 eyecare:text-red-700 eyecare-dark:text-red-300 text-sm"
          >
            {{ authStore.error }}
          </p>
        </div>

        <!-- Login form directly, no social login for now -->

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username/Email -->
          <div>
            <BaseInput
              v-model="form.usernameOrEmail"
              type="text"
              label="Username หรือ Email"
              placeholder="กรอก username หรือ email"
              :disabled="authStore.isLoading"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <BaseInput
              v-model="form.password"
              type="password"
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่าน"
              :disabled="authStore.isLoading"
              required
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                type="checkbox"
                v-model="form.rememberMe"
                class="rounded border-gray-300 dark:border-gray-600 eyecare:border-amber-400 eyecare-dark:border-amber-500 text-primary dark:bg-gray-700 eyecare:bg-amber-50 eyecare-dark:bg-amber-800 focus:ring-primary"
              />
              <span
                class="ml-2 text-sm text-gray-600 dark:text-gray-400 eyecare:text-amber-700 eyecare-dark:text-amber-300"
                >จดจำการเข้าสู่ระบบ</span
              >
            </label>
            <NuxtLink
              to="/forgot-password"
              class="text-sm text-primary dark:text-primary-light eyecare:text-amber-600 eyecare-dark:text-amber-400 hover:text-primary-dark dark:hover:text-primary eyecare:hover:text-amber-700 eyecare-dark:hover:text-amber-300"
            >
              ลืมรหัสผ่าน?
            </NuxtLink>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            :disabled="
              authStore.isLoading || !form.usernameOrEmail || !form.password
            "
            class="w-full"
          >
            {{ authStore.isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ" }}
          </BaseButton>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-600">
            ยังไม่มีบัญชี?
            <NuxtLink
              to="/register"
              class="text-primary hover:text-primary-dark font-semibold"
            >
              สมัครสมาชิก
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();

// Form data
const form = reactive({
  usernameOrEmail: "",
  password: "",
  rememberMe: false,
});

// Handle login
const handleLogin = async () => {
  authStore.clearError();
  const result = await authStore.login({
    login: form.usernameOrEmail, // API expects 'email' field but accepts both username/email
    password: form.password,
  });
};

// Redirect if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    navigateTo("/");
  }
});

// Meta
definePageMeta({
  layout: false,
});

useHead({
  title: "เข้าสู่ระบบ - PageRealm",
});
</script>
