<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary/10 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 eyecare:from-amber-50 eyecare:via-amber-25 eyecare:to-amber-100 eyecare-dark:from-amber-900 eyecare-dark:via-amber-800 eyecare-dark:to-amber-900 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full">
      <!-- Register Form -->
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
          <h1
            class="text-3xl font-bold text-gray-800 dark:text-white eyecare:text-amber-900 eyecare-dark:text-amber-100 mt-4"
          >
            สมัครสมาชิก
          </h1>
         
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

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 eyecare:bg-green-100 eyecare-dark:bg-green-800/20 border border-green-200 dark:border-green-800 eyecare:border-green-300 eyecare-dark:border-green-600 rounded-lg"
        >
          <p
            class="text-green-600 dark:text-green-400 eyecare:text-green-700 eyecare-dark:text-green-300 text-sm"
          >
            {{ successMessage }}
          </p>
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister" class="space-y-2">
          <!-- Username -->
          <div>
            <BaseInput
              v-model="form.username"
              type="text"
              label="Username"
              placeholder="กรอก username"
              help="Username ต้องไม่มีช่องว่างและมีความยาว 3-20 ตัวอักษร"
              :disabled="authStore.isLoading"
              required
            />
          </div>

          <!-- Email -->
          <div>
            <BaseInput
              v-model="form.email"
              type="email"
              label="Email"
              placeholder="กรอก email"
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
              help="รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร"
              :disabled="authStore.isLoading"
              required
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <BaseInput
              v-model="form.confirmPassword"
              type="password"
              label="ยืนยันรหัสผ่าน"
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              :disabled="authStore.isLoading"
              required
            />
          </div>

          <!-- reCAPTCHA -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 eyecare:text-amber-800 eyecare-dark:text-amber-200 mb-2"
            >
              ยืนยันตัวตน <span class="text-red-500">*</span>
            </label>
            <div
              class="border-2 border-gray-300 dark:border-gray-600 eyecare:border-amber-300 eyecare-dark:border-amber-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700 eyecare:bg-amber-25 eyecare-dark:bg-amber-800"
            >
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="form.recaptcha"
                  class="rounded border-gray-300 dark:border-gray-600 eyecare:border-amber-400 eyecare-dark:border-amber-500 text-primary dark:bg-gray-700 eyecare:bg-amber-50 eyecare-dark:bg-amber-800 focus:ring-primary"
                  :disabled="authStore.isLoading"
                  required
                />
                <span
                  class="ml-2 text-sm text-gray-700 dark:text-gray-300 eyecare:text-amber-800 eyecare-dark:text-amber-200"
                  >ฉันไม่ใช่หุ่นยนต์</span
                >
              </label>
              <p
                class="text-xs text-gray-500 dark:text-gray-400 eyecare:text-amber-600 eyecare-dark:text-amber-400 mt-2"
              >
                * ในการใช้งานจริงจะใช้ Google reCAPTCHA
              </p>
            </div>
          </div>

          <!-- Terms -->
          <div>
            <label class="flex items-start">
              <input
                type="checkbox"
                v-model="form.acceptTerms"
                class="rounded border-gray-300 dark:border-gray-600 eyecare:border-amber-400 eyecare-dark:border-amber-500 text-primary dark:bg-gray-700 eyecare:bg-amber-50 eyecare-dark:bg-amber-800 focus:ring-primary mt-1"
                :disabled="authStore.isLoading"
                required
              />
              <span
                class="ml-2 text-sm text-gray-700 dark:text-gray-300 eyecare:text-amber-800 eyecare-dark:text-amber-200"
              >
                ฉันยอมรับ
                <NuxtLink
                  to="/terms"
                  class="text-primary dark:text-primary-light eyecare:text-amber-600 eyecare-dark:text-amber-400 hover:text-primary-dark dark:hover:text-primary eyecare:hover:text-amber-700 eyecare-dark:hover:text-amber-300"
                  >เงื่อนไขการใช้งาน</NuxtLink
                >
                และ
                <NuxtLink
                  to="/privacy"
                  class="text-primary dark:text-primary-light eyecare:text-amber-600 eyecare-dark:text-amber-400 hover:text-primary-dark dark:hover:text-primary eyecare:hover:text-amber-700 eyecare-dark:hover:text-amber-300"
                  >นโยบายความเป็นส่วนตัว</NuxtLink
                >
                <span class="text-red-500"> *</span>
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <BaseButton
            type="submit"
            :disabled="authStore.isLoading || !isFormValid"
            class="w-full"
          >
            {{ authStore.isLoading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก" }}
          </BaseButton>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p
            class="text-gray-600 dark:text-gray-400 eyecare:text-amber-700 eyecare-dark:text-amber-300"
          >
            มีบัญชีอยู่แล้ว?
            <NuxtLink
              to="/login"
              class="text-primary dark:text-primary-light eyecare:text-amber-600 eyecare-dark:text-amber-400 hover:text-primary-dark dark:hover:text-primary eyecare:hover:text-amber-700 eyecare-dark:hover:text-amber-300 font-semibold"
            >
              เข้าสู่ระบบ
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
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  recaptcha: false,
  acceptTerms: false,
});

const successMessage = ref("");

// Computed
const isFormValid = computed(() => {
  return (
    form.username &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.recaptcha &&
    form.acceptTerms &&
    form.password === form.confirmPassword
  );
});

// Handle register
const handleRegister = async () => {
  authStore.clearError();
  successMessage.value = "";

  // Validate form
  if (form.password !== form.confirmPassword) {
    authStore.error = "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน";
    return;
  }

  if (form.password.length < 6) {
    authStore.error = "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร";
    return;
  }

  if (!form.recaptcha) {
    authStore.error = "กรุณายืนยัน reCAPTCHA";
    return;
  }

  if (!form.acceptTerms) {
    authStore.error = "กรุณายอมรับเงื่อนไขการใช้งาน";
    return;
  }

  await authStore.register({
    username: form.username,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
    recaptcha: "mock_recaptcha_token",
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
  title: "สมัครสมาชิก - PageRealm",
});
</script>
