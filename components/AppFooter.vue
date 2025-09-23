<template>
  <footer class="bg-gray-900 text-white mt-6">
    <!-- Main Footer Content -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="text-xl font-bold">PageRealm</h4>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            แพลตฟอร์มอ่านนิยายและการ์ตูนออนไลน์ที่ดีที่สุด 
            พร้อมเนื้อหาคุณภาพสูงและการอัปเดตทุกวัน
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
              <span class="text-lg">📘</span>
            </a>
            <a href="#" class="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors">
              <span class="text-lg">💬</span>
            </a>
            <a href="#" class="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
              <span class="text-lg">✉️</span>
            </a>
          </div>
        </div>

        <!-- For Readers -->
        <div>
          <h5 class="font-bold text-lg mb-4 text-primary">สำหรับนักอ่าน</h5>
          <ul class="space-y-3 text-gray-400">
            <li>
              <NuxtLink to="/novels" class="hover:text-white transition-colors flex items-center gap-2">
                📖 นิยาย
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/manga" class="hover:text-white transition-colors flex items-center gap-2">
                🎨 การ์ตูน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/rankings" class="hover:text-white transition-colors flex items-center gap-2">
                🏆 จัดอันดับ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/coins" class="hover:text-white transition-colors flex items-center gap-2">
                💰 วิธีเติมเหรียญ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/favorites" class="hover:text-white transition-colors flex items-center gap-2">
                ❤️ รายการโปรด
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- For Writers -->
        <div>
          <h5 class="font-bold text-lg mb-4 text-primary">สำหรับนักเขียน</h5>
          <ul class="space-y-3 text-gray-400">
            <li>
              <NuxtLink to="/writer" class="hover:text-white transition-colors flex items-center gap-2">
                ✍️ เริ่มเขียน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/guide" class="hover:text-white transition-colors flex items-center gap-2">
                📚 คู่มือใช้งาน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tips" class="hover:text-white transition-colors flex items-center gap-2">
                💡 เคล็ดลับการเขียน
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/monetize" class="hover:text-white transition-colors flex items-center gap-2">
                💼 โอกาสรายได้
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/analytics" class="hover:text-white transition-colors flex items-center gap-2">
                📊 สถิติผลงาน
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support & Info -->
        <div>
          <h5 class="font-bold text-lg mb-4 text-primary">ช่วยเหลือ</h5>
          <ul class="space-y-3 text-gray-400">
            <li>
              <NuxtLink to="/help" class="hover:text-white transition-colors flex items-center gap-2">
                ❓ ศูนย์ช่วยเหลือ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-white transition-colors flex items-center gap-2">
                📞 ติดต่อเรา
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/report" class="hover:text-white transition-colors flex items-center gap-2">
                🚨 รายงานปัญหา
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/feedback" class="hover:text-white transition-colors flex items-center gap-2">
                💭 แสดงความคิดเห็น
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-white transition-colors flex items-center gap-2">
                ℹ️ เกี่ยวกับเรา
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Copyright -->
          <div class="text-center md:text-left">
            <p class="text-gray-400">
              &copy; 2025 PageRealm. สงวนลิขสิทธิ์ทุกประการ
            </p>
          </div>

          <!-- Legal Links -->
          <div class="flex gap-6 text-sm text-gray-400">
            <NuxtLink to="/privacy" class="hover:text-white transition-colors">
              นโยบายความเป็นส่วนตัว
            </NuxtLink>
            <NuxtLink to="/terms" class="hover:text-white transition-colors">
              ข้อตกลงการใช้งาน
            </NuxtLink>
            <NuxtLink to="/cookies" class="hover:text-white transition-colors">
              นโยบายคุกกี้
            </NuxtLink>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-4 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>
            🌟 พัฒนาด้วยความใส่ใจเพื่อประสบการณ์การอ่านที่ดีที่สุด | 
            เซิร์ฟเวอร์ในประเทศไทย เพื่อความเร็วสูงสุด
          </p>
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
