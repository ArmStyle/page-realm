<template>
  <footer
    class="bg-white text-gray-900 mt-6 dark:bg-gray-900 dark:text-white eye-care:bg-lime-50 eye-care:text-lime-900"
  >
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img
              src="/assets/img/logo.png"
              alt="PageRealm Logo"
              class="w-12 h-12 object-contain"
            />
            <h4 class="text-xl font-bold">PageRealm</h4>
          </div>
          <p
            class="text-gray-400 mb-6 leading-relaxed dark:text-gray-400 eye-care:text-lime-700"
          >
            แพลตฟอร์มอ่านนิยายและการ์ตูนออนไลน์ที่ดีที่สุด
            พร้อมเนื้อหาคุณภาพสูงและการอัปเดตทุกวัน
          </p>
          <!-- Social Links -->
          <div class="flex gap-3">
            <a
              href="#"
              class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 eye-care:bg-lime-300 eye-care:hover:bg-lime-200"
            >
              <!-- icon removed -->
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors dark:bg-green-500 dark:hover:bg-green-600 eye-care:bg-lime-200 eye-care:hover:bg-lime-300"
            >
              <!-- icon removed -->
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors dark:bg-red-500 dark:hover:bg-red-600 eye-care:bg-red-200 eye-care:hover:bg-orange-100"
            >
              <!-- icon removed -->
            </a>
          </div>
        </div>

        <!-- For Readers -->
        <div>
          <h5
            class="font-bold text-lg mb-4 text-primary dark:text-primary eye-care:text-lime-700"
          >
            สำหรับนักอ่าน
          </h5>
          <ul
            class="space-y-3 text-gray-400 dark:text-gray-400 eye-care:text-lime-700"
          >
            <li>
              <NuxtLink
                to="/novels"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                นิยาย
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/manga"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                การ์ตูน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/rankings"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                จัดอันดับ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/coins"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                วิธีเติมเหรียญ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/favorites"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                รายการโปรด
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- For Writers -->
        <div>
          <h5
            class="font-bold text-lg mb-4 text-primary dark:text-primary eye-care:text-lime-700"
          >
            สำหรับนักเขียน
          </h5>
          <ul
            class="space-y-3 text-gray-400 dark:text-gray-400 eye-care:text-lime-700"
          >
            <li>
              <NuxtLink
                to="/writer"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                เริ่มเขียน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/guide"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                คู่มือใช้งาน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/tips"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                เคล็ดลับการเขียน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/monetize"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                โอกาสรายได้
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/analytics"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                สถิติผลงาน
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support & Info -->
        <div>
          <h5
            class="font-bold text-lg mb-4 text-primary dark:text-primary eye-care:text-lime-700"
          >
            ช่วยเหลือ
          </h5>
          <ul
            class="space-y-3 text-gray-400 dark:text-gray-400 eye-care:text-lime-700"
          >
            <li>
              <NuxtLink
                to="/help"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                ศูนย์ช่วยเหลือ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/contact"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                ติดต่อเรา
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/report"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                รายงานปัญหา
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/feedback"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                แสดงความคิดเห็น
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors flex items-center gap-2"
              >
                <!-- icon removed -->
                เกี่ยวกับเรา
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="eye-care:border-lime-200">
      <div class="container mx-auto px-4 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <!-- Copyright -->
          <div class="text-center md:text-left">
            <p class="text-gray-400 dark:text-gray-400 eye-care:text-lime-700">
              &copy; 2025 PageRealm. สงวนลิขสิทธิ์ทุกประการ
            </p>
          </div>

          <!-- Legal Links -->
          <div
            class="flex gap-6 text-sm text-gray-400 dark:text-gray-400 eye-care:text-lime-700"
          >
            <NuxtLink
              to="/privacy"
              class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors"
            >
              นโยบายความเป็นส่วนตัว
            </NuxtLink>
            <NuxtLink
              to="/terms"
              class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors"
            >
              ข้อตกลงการใช้งาน
            </NuxtLink>
            <NuxtLink
              to="/cookies"
              class="hover:text-primary dark:hover:text-primary eye-care:hover:text-lime-900 transition-colors"
            >
              นโยบายคุกกี้
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Footer is a simple component, no complex logic needed
</script>

<style scoped>
/* Custom styles for footer if needed */
</style>
