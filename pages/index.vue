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
        :novels="popularManga"
      />

      <!-- Ranking Section -->
      <!-- <RankingSection
        :top-novels="topNovels"
        :top-manga="topManga"
        :top-new-releases="topNewReleases"
      /> -->

      <!-- Last Update Section -->
      <!-- <LastUpdateSection
        :items="lastUpdates"
        :show-load-more="true"
        :loading="false"
        @load-more="handleLoadMore"
        @item-click="handleItemClick"
        @refresh="handleRefresh"
      /> -->


    </ContentWrapper>
  </div>
</template>

<script setup lang="ts">
import type { Series } from '~/types/series'

// ใช้ composable สำหรับ popular novels
const { 
  series: popularNovelsData, 
  loading: loadingNovels,
  fetchPopularSeries: fetchPopularNovels 
} = useSeries()

// ใช้ composable สำหรับ popular manga
const { 
  series: popularMangaData, 
  loading: loadingManga,
  fetchPopularSeries: fetchPopularManga 
} = useSeries()

// Transform API data to component format
const transformSeries = (seriesItem: Series) => {
  try {
    return {
      id: seriesItem.id,
      title: seriesItem.title,
      author: seriesItem.author_name,
      category: seriesItem.category_name,
      rating: seriesItem.rating,
      chapters: seriesItem.chapter_count,
      // views: seriesItem.views >= 1000 
      //   ? `${(seriesItem.views / 1000).toFixed(0)}K` 
      //   : seriesItem.views.toString(),
      slug: seriesItem.id.toString(), // ใช้ ID แทน slug หรือสร้าง slug จาก title
      isNew: false, // สามารถเช็คจาก created_at ได้
      cover: seriesItem.cover_image_url,
    }
  } catch (error) {
    return null
  }
}

// Computed properties for transformed data
const popularNovels = computed(() => 
  popularNovelsData.value
    .map(transformSeries)
    .filter(item => item !== null)
)

const popularManga = computed(() => 
  popularMangaData.value
    .map(transformSeries)
    .filter(item => item !== null)
)

// Load data on mount
onMounted(async () => {
  await fetchPopularNovels(15, 'novel')
  await fetchPopularManga(15, 'manga')
})

// Navigation functions
const navigateToNovel = (slug: string) => {
  navigateTo(`/read/${slug}`);
};

const navigateToCategory = (slug: string) => {
  navigateTo(`/category/${slug}`);
};

// LastUpdate handlers
const handleLoadMore = () => {
  // TODO: Load more updates from API
  console.log('Loading more updates...');
};

const handleItemClick = (slug: string) => {
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
