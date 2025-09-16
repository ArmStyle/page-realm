<template>
  <div>
    <!-- Hero Section -->
    <section
      class="relative bg-gradient-to-br from-primary via-primary-dark to-purple-700 text-white py-24 overflow-hidden"
    >
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
          >
            เทพธิดาแห่งความมืด
          </h1>
          <p class="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            เมื่อโลกตกอยู่ในความมืดมิด<br />
            เทพธิดาผู้ยิ่งใหญ่จะต้องลุกขึ้นมาต่อสู้เพื่อปกป้องมนุษยชาติ<br />
            ในการผจญภัยที่จะเปลี่ยนแปลงชะตากรรมของทุกคน
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              to="/read/goddess-of-darkness"
              class="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              📖 เริ่มอ่านเลย
            </NuxtLink>
            <button
              class="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all"
            >
              🔖 เพิ่มในรายการ
            </button>
          </div>
        </div>
      </div>

      <!-- Decorative elements -->
      <div
        class="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl"
      ></div>
      <div
        class="absolute top-1/2 right-20 w-16 h-16 bg-yellow-300/30 rounded-full blur-lg"
      ></div>
    </section>

    <!-- Main Content with max-width wrapper -->
    <ContentWrapper>
      <!-- Popular Novels Section -->
      <RecommendSwipe
        title="🤩นิยายยอดฮิต...ติดใจ"
        subtitle="เรื่องราวที่ทุกคนหลงใหล อ่านแล้วติดตามต่อ"
        :novels="popularNovels"
      />
      <RecommendSwipe
        title="การ์ตูนยอดฮิต...ตลอดกาล"
        subtitle="เรื่องราวที่ทุกคนหลงใหล อ่านแล้วติดตามต่อ"
        :novels="popularNovels"
      />

      <!-- Ranking Section -->
      <RankingSection
        :top-novels="topNovels"
        :top-manga="topManga"
        :top-new-releases="topNewReleases"
      />

      <!-- Last Update Section -->
      <LastUpdateSection
        :items="lastUpdates"
        :show-load-more="true"
        :loading="false"
        @load-more="handleLoadMore"
        @item-click="handleItemClick"
        @refresh="handleRefresh"
      />

      <!-- Features Section -->
      <SectionWrapper bg-class="bg-white dark:bg-gray-800">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            📚 PageRealm
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            แพลตฟอร์มอ่านนิยายและการ์ตูนออนไลน์ที่ดีที่สุด<br />
            พร้อมเนื้อหาคุณภาพสูงและการอัปเดตทุกวัน
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl"
            >
              📖
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              อ่านฟรี
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              เข้าถึงนิยายและการ์ตูนหลากหลายแนวโดยไม่เสียค่าใช้จ่าย
            </p>
          </div>

          <div
            class="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl"
            >
              🔄
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              อัปเดตทุกวัน
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              ติดตามเรื่องราวใหม่ๆ ที่อัปเดตสม่ำเสมอทุกวัน
            </p>
          </div>

          <div
            class="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20"
          >
            <div
              class="w-16 h-16 mx-auto mb-4 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl"
            >
              👁️
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
              ถนอมสายตา
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              ปรับแต่งการอ่านให้เหมาะกับสายตาด้วยระบบที่ทันสมัย
            </p>
          </div>
        </div>
      </SectionWrapper>

      <!-- Categories Section -->
      <SectionWrapper bg-class="bg-gray-50 dark:bg-gray-900">
        <h2
          class="text-3xl font-bold text-gray-800 dark:text-white mb-10 text-center"
        >
          หมวดหมู่ยอดนิยม
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div
            v-for="category in categories"
            :key="category.name"
            class="text-center group cursor-pointer"
            @click="navigateToCategory(category.slug)"
          >
            <div
              class="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              {{ category.emoji }}
            </div>
            <h3
              class="font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors"
            >
              {{ category.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {{ category.count }} เรื่อง
            </p>
          </div>
        </div>
      </SectionWrapper>

    </ContentWrapper>
  </div>
</template>

<script setup>
// Sample data matching the pagerealm.vercel.app structure
const popularNovels = [
  {
    id: 1,
    title: "เทพธิดาแห่งความมืด",
    author: "นักเขียนลึกลับ",
    category: "แฟนตาซี",
    rating: 4.8,
    chapters: 125,
    views: "89K",
    slug: "goddess-of-darkness",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&h=350&fit=crop",
  },
  {
    id: 2,
    title: "รักนี้ในโลกมายากล",
    author: "ปากกาทอง",
    category: "โรแมนซ์",
    rating: 4.6,
    chapters: 89,
    views: "156K",
    slug: "love-in-magic-world",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop",
  },
  {
    id: 3,
    title: "ดาบพิฆาตมาร",
    author: "อาจารย์ดาบ",
    category: "แอคชั่น",
    rating: 4.9,
    chapters: 203,
    views: "92K",
    slug: "demon-slayer-sword",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 4,
    title: "นักสืบเมืองปริศนา",
    author: "เชอร์ล็อคไทย",
    category: "สืบสวน",
    rating: 4.7,
    chapters: 76,
    views: "178K",
    slug: "mystery-city-detective",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 5,
    title: "มหาศึกนักรบเวทย์",
    author: "นักเขียนเวทมนตร์",
    category: "แฟนตาซี",
    rating: 4.5,
    chapters: 156,
    views: "143K",
    slug: "magic-warrior-battle",
    cover:
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=250&h=350&fit=crop",
  },
  {
    id: 6,
    title: "จักรพรรดิแห่งดาว",
    author: "อวกาศนิยาย",
    category: "ไซไฟ",
    rating: 4.7,
    chapters: 298,
    views: "267K",
    slug: "star-emperor",
    cover:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=250&h=350&fit=crop",
  },
  {
    id: 7,
    title: "นางฟ้าผู้พิทักษ์",
    author: "นักเขียนสวรรค์",
    category: "แฟนตาซี",
    rating: 4.4,
    chapters: 94,
    views: "78K",
    slug: "guardian-angel",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=350&fit=crop",
  },
  {
    id: 8,
    title: "ยอดนักสู้มิติคู่ขนาน",
    author: "มิติเขียน",
    category: "ไซไฟ",
    rating: 4.6,
    chapters: 167,
    views: "134K",
    slug: "parallel-dimension-fighter",
    cover:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=350&fit=crop",
  },
  {
    id: 9,
    title: "นักเวทย์หน้าใส",
    author: "เวทมนต์คิวท์",
    category: "แฟนตาซี",
    rating: 4.3,
    chapters: 67,
    views: "95K",
    slug: "cute-wizard",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1578662015886-3683d21bfe50?w=250&h=350&fit=crop",
  },
  {
    id: 10,
    title: "ราชินีแห่งความตาย",
    author: "ปีศาจเขียน",
    category: "สยองขวัญ",
    rating: 4.8,
    chapters: 112,
    views: "201K",
    slug: "queen-of-death",
    cover:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=250&h=350&fit=crop",
  },
  {
    id: 11,
    title: "ฮีโร่แห่งอะคาเดมี",
    author: "โรงเรียนเขียน",
    category: "แอคชั่น",
    rating: 4.6,
    chapters: 189,
    views: "176K",
    slug: "academy-hero",
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 12,
    title: "เจ้าหญิงพิทักษ์ป่า",
    author: "ธรรมชาติเขียน",
    category: "แฟนตาซี",
    rating: 4.5,
    chapters: 145,
    views: "118K",
    slug: "forest-guardian-princess",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=350&fit=crop",
  },
  {
    id: 13,
    title: "ฮีโร่แห่งอนาคต",
    author: "ไซไฟเขียน",
    category: "ไซไฟ",
    rating: 4.7,
    chapters: 134,
    views: "167K",
    slug: "future-hero",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=350&fit=crop",
  },
  {
    id: 14,
    title: "นักสู้ดวงดาว",
    author: "ดาวเขียน",
    category: "แอคชั่น",
    rating: 4.4,
    chapters: 98,
    views: "89K",
    slug: "star-fighter",
    cover:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=250&h=350&fit=crop",
  },
  {
    id: 15,
    title: "ราชาแห่งแสง",
    author: "แสงเขียน",
    category: "แฟนตาซี",
    rating: 4.8,
    chapters: 211,
    views: "234K",
    slug: "king-of-light",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1578662015886-3683d21bfe50?w=250&h=350&fit=crop",
  },
  {
    id: 16,
    title: "เทพีแห่งน้ำแข็ง",
    author: "น้ำแข็งเขียน",
    category: "แฟนตาซี",
    rating: 4.6,
    chapters: 156,
    views: "145K",
    slug: "ice-goddess",
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 17,
    title: "รักแรกในโลกเกม",
    author: "เกมเมอร์เขียน",
    category: "โรแมนซ์",
    rating: 4.3,
    chapters: 87,
    views: "123K",
    slug: "first-love-in-game-world",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop",
  },
  {
    id: 18,
    title: "เวทมนตร์แห่งมิติ",
    author: "มิติเวทย์",
    category: "แฟนตาซี",
    rating: 4.5,
    chapters: 178,
    views: "189K",
    slug: "dimension-magic",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 19,
    title: "นักฆ่าแห่งเงา",
    author: "เงาเขียน",
    category: "แอคชั่น",
    rating: 4.7,
    chapters: 143,
    views: "167K",
    slug: "shadow-assassin",
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 20,
    title: "ดาบเทพแห่งสวรรค์",
    author: "สวรรค์เขียน",
    category: "แฟนตาซี",
    rating: 4.9,
    chapters: 267,
    views: "298K",
    slug: "heaven-divine-sword",
    cover:
      "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=250&h=350&fit=crop",
  },
  {
    id: 21,
    title: "จักรพรรดินีแห่งไฟ",
    author: "ไฟเขียน",
    category: "แฟนตาซี",
    rating: 4.6,
    chapters: 189,
    views: "234K",
    slug: "fire-empress",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=250&h=350&fit=crop",
  },
  {
    id: 22,
    title: "ปีศาจน้อยผู้น่ารัก",
    author: "ปีศาจคิวท์",
    category: "แฟนตาซี",
    rating: 4.4,
    chapters: 76,
    views: "89K",
    slug: "cute-little-demon",
    cover:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&h=350&fit=crop",
  },
  {
    id: 23,
    title: "กษัตริย์แห่งเวลา",
    author: "เวลาเขียน",
    category: "ไซไฟ",
    rating: 4.8,
    chapters: 198,
    views: "276K",
    slug: "time-king",
    cover:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=350&fit=crop",
  },
  {
    id: 24,
    title: "นางฟ้าแห่งดนตรี",
    author: "ดนตรีเขียน",
    category: "โรแมนซ์",
    rating: 4.5,
    chapters: 123,
    views: "156K",
    slug: "music-angel",
    cover:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=350&fit=crop",
  },
  {
    id: 25,
    title: "มหาเวทย์แห่งความมืด",
    author: "ความมืดเขียน",
    category: "แฟนตาซี",
    rating: 4.7,
    chapters: 234,
    views: "298K",
    slug: "dark-archmage",
    cover:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=250&h=350&fit=crop",
  },
  {
    id: 26,
    title: "ฮีโร่โรงเรียนมายากล",
    author: "โรงเรียนเขียน",
    category: "แฟนตาซี",
    rating: 4.6,
    chapters: 167,
    views: "189K",
    slug: "magic-school-hero",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 27,
    title: "นักรบแห่งฟ้าผ่า",
    author: "ฟ้าผ่าเขียน",
    category: "แอคชั่น",
    rating: 4.5,
    chapters: 145,
    views: "167K",
    slug: "lightning-warrior",
    cover:
      "https://images.unsplash.com/photo-1578662015886-3683d21bfe50?w=250&h=350&fit=crop",
  },
  {
    id: 28,
    title: "เจ้าหญิงแห่งทะเล",
    author: "ทะเลเขียน",
    category: "แฟนตาซี",
    rating: 4.4,
    chapters: 98,
    views: "123K",
    slug: "sea-princess",
    cover:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop",
  },
  {
    id: 29,
    title: "ยอดนักสู้แห่งจักรวาล",
    author: "จักรวาลเขียน",
    category: "ไซไฟ",
    rating: 4.8,
    chapters: 278,
    views: "345K",
    slug: "universe-fighter",
    cover:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 30,
    title: "มังกรทองแห่งตำนาน",
    author: "มังกรเขียน",
    category: "แฟนตาซี",
    rating: 4.9,
    chapters: 312,
    views: "567K",
    slug: "golden-dragon-legend",
    isNew: true,
    cover:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
];

const categories = [
  { name: "แฟนตาซี", emoji: "🔮", count: 1247, slug: "fantasy" },
  { name: "โรแมนซ์", emoji: "💕", count: 892, slug: "romance" },
  { name: "แอคชั่น", emoji: "⚔️", count: 634, slug: "action" },
  { name: "สืบสวน", emoji: "🔍", count: 423, slug: "mystery" },
  { name: "ไซไฟ", emoji: "🚀", count: 567, slug: "scifi" },
  { name: "สยองขวัญ", emoji: "👻", count: 298, slug: "horror" },
];

// Top 5 Novels for ranking
const topNovels = [
  {
    id: 1,
    title: "เทพธิดาแห่งความมืด",
    author: "นักเขียนลึกลับ",
    rating: 4.8,
    views: "89K",
    slug: "goddess-of-darkness",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&h=350&fit=crop",
  },
  {
    id: 20,
    title: "ดาบเทพแห่งสวรรค์",
    author: "สวรรค์เขียน",
    rating: 4.9,
    views: "298K",
    slug: "heaven-divine-sword",
    cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=250&h=350&fit=crop",
  },
  {
    id: 29,
    title: "ยอดนักสู้แห่งจักรวาล",
    author: "จักรวาลเขียน",
    rating: 4.8,
    views: "345K",
    slug: "universe-fighter",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 19,
    title: "นักฆ่าแห่งเงา",
    author: "เงาเขียน",
    rating: 4.7,
    views: "167K",
    slug: "shadow-assassin",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 6,
    title: "จักรพรรดิแห่งดาว",
    author: "อวกาศนิยาย",
    rating: 4.7,
    views: "267K",
    slug: "star-emperor",
    cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=250&h=350&fit=crop",
  },
];

// Top 5 Manga for ranking
const topManga = [
  {
    id: 31,
    title: "นักสู้ซามูไรโบราณ",
    author: "มังงะซึยาม่า",
    rating: 4.9,
    views: "456K",
    slug: "ancient-samurai-warrior",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 32,
    title: "เทพีการ์ตูนสีชมพู",
    author: "มังงะคิวท์",
    rating: 4.8,
    views: "389K",
    slug: "pink-manga-goddess",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=350&fit=crop",
  },
  {
    id: 33,
    title: "มหาศึกนินจาแห่งอนาคต",
    author: "นินจะเมกะ",
    rating: 4.7,
    views: "234K",
    slug: "future-ninja-battle",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&h=350&fit=crop",
  },
  {
    id: 34,
    title: "โรงเรียนยอดฮีโร่",
    author: "สคูลมังงะ",
    rating: 4.6,
    views: "312K",
    slug: "hero-academy-school",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 35,
    title: "ราชินีแห่งมนตรา",
    author: "แฟนตาซีมังงะ",
    rating: 4.5,
    views: "278K",
    slug: "magic-queen",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=350&fit=crop",
  },
];

// Top 5 New Releases
const topNewReleases = [
  {
    id: 30,
    title: "มังกรทองแห่งตำนาน",
    author: "มังกรเขียน",
    rating: 4.9,
    views: "567K",
    slug: "golden-dragon-legend",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 26,
    title: "ฮีโร่โรงเรียนมายากล",
    author: "โรงเรียนเขียน",
    rating: 4.6,
    views: "189K",
    slug: "magic-school-hero",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 21,
    title: "จักรพรรดินีแห่งไฟ",
    author: "ไฟเขียน",
    rating: 4.6,
    views: "234K",
    slug: "fire-empress",
    cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=250&h=350&fit=crop",
  },
  {
    id: 15,
    title: "ราชาแห่งแสง",
    author: "แสงเขียน",
    rating: 4.8,
    views: "234K",
    slug: "king-of-light",
    cover: "https://images.unsplash.com/photo-1578662015886-3683d21bfe50?w=250&h=350&fit=crop",
  },
  {
    id: 12,
    title: "เจ้าหญิงพิทักษ์ป่า",
    author: "ธรรมชาติเขียน",
    rating: 4.5,
    views: "118K",
    slug: "forest-guardian-princess",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=250&h=350&fit=crop",
  },
];

// Last 10 Updates
const lastUpdates = [
  {
    id: 1,
    title: "เทพธิดาแห่งความมืด",
    author: "นักเขียนลึกลับ",
    slug: "goddess-of-darkness",
    latestChapter: 125,
    updateTime: "2 ชม.",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=250&h=350&fit=crop",
  },
  {
    id: 30,
    title: "มังกรทองแห่งตำนาน",
    author: "มังกรเขียน",
    slug: "golden-dragon-legend",
    latestChapter: 312,
    updateTime: "4 ชม.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 20,
    title: "ดาบเทพแห่งสวรรค์",
    author: "สวรรค์เขียน",
    slug: "heaven-divine-sword",
    latestChapter: 267,
    updateTime: "6 ชม.",
    cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=250&h=350&fit=crop",
  },
  {
    id: 29,
    title: "ยอดนักสู้แห่งจักรวาล",
    author: "จักรวาลเขียน",
    slug: "universe-fighter",
    latestChapter: 278,
    updateTime: "8 ชม.",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 31,
    title: "นักสู้ซามูไรโบราณ",
    author: "มังงะซึยาม่า",
    slug: "ancient-samurai-warrior",
    latestChapter: 89,
    updateTime: "12 ชม.",
    cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=250&h=350&fit=crop",
  },
  {
    id: 21,
    title: "จักรพรรดินีแห่งไฟ",
    author: "ไฟเขียน",
    slug: "fire-empress",
    latestChapter: 189,
    updateTime: "14 ชม.",
    cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=250&h=350&fit=crop",
  },
  {
    id: 19,
    title: "นักฆ่าแห่งเงา",
    author: "เงาเขียน",
    slug: "shadow-assassin",
    latestChapter: 143,
    updateTime: "18 ชม.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=250&h=350&fit=crop",
  },
  {
    id: 32,
    title: "เทพีการ์ตูนสีชมพู",
    author: "มังงะคิวท์",
    slug: "pink-manga-goddess",
    latestChapter: 56,
    updateTime: "1 วัน",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=250&h=350&fit=crop",
  },
  {
    id: 26,
    title: "ฮีโร่โรงเรียนมายากล",
    author: "โรงเรียนเขียน",
    slug: "magic-school-hero",
    latestChapter: 167,
    updateTime: "1 วัน",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=250&h=350&fit=crop",
  },
  {
    id: 15,
    title: "ราชาแห่งแสง",
    author: "แสงเขียน",
    slug: "king-of-light",
    latestChapter: 211,
    updateTime: "2 วัน",
    cover: "https://images.unsplash.com/photo-1578662015886-3683d21bfe50?w=250&h=350&fit=crop",
  },
];

// Navigation functions
const navigateToNovel = (slug) => {
  navigateTo(`/read/${slug}`);
};

const navigateToCategory = (slug) => {
  navigateTo(`/category/${slug}`);
};

// LastUpdate handlers
const handleLoadMore = () => {
  // TODO: Load more updates from API
  console.log('Loading more updates...');
};

const handleItemClick = (slug) => {
  console.log('Item clicked:', slug);
  // Additional tracking or actions
};

const handleRefresh = () => {
  // TODO: Refresh latest updates from API
  console.log('Refreshing updates...');
};

// SEO
useHead({
  title: "PageRealm - อ่านมังงะและนิยายออนไลน์",
  meta: [
    {
      name: "description",
      content:
        "แพลตฟอร์มอ่านมังงะและนิยายออนไลน์ที่ดีที่สุด พร้อมเนื้อหาคุณภาพสูงและการอัปเดตทุกวัน",
    },
  ],
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
