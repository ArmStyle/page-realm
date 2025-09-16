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

        <!-- Google Login Button -->
        <button
          @click="handleGoogleLogin"
          :disabled="authStore.isLoading"
          class="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 eyecare:bg-amber-25 eyecare-dark:bg-amber-800 border-2 border-gray-300 dark:border-gray-600 eyecare:border-amber-300 eyecare-dark:border-amber-600 hover:border-gray-400 dark:hover:border-gray-500 eyecare:hover:border-amber-400 eyecare-dark:hover:border-amber-500 text-gray-700 dark:text-gray-200 eyecare:text-amber-800 eyecare-dark:text-amber-200 font-semibold py-3 px-4 rounded-xl transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {{
            authStore.isLoading
              ? "กำลังเข้าสู่ระบบ..."
              : "เข้าสู่ระบบด้วย Google"
          }}
        </button>

        <!-- Divider -->
        <div class="my-6 flex items-center">
          <div class="flex-1 border-t border-gray-300"></div>
          <span class="px-4 text-gray-500 text-sm">หรือ</span>
          <div class="flex-1 border-t border-gray-300"></div>
        </div>

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
  await authStore.login({
    usernameOrEmail: form.usernameOrEmail,
    password: form.password,
  });
};

// Handle Google login
const handleGoogleLogin = async () => {
  authStore.clearError();
  await authStore.loginWithGoogle();
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
