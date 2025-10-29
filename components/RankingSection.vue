<template>
  <SectionWrapper>
    <div class="mb-5">
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white">
        🏆 อันดับยอดนิยม
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        อันดับความนิยมประจำสัปดาห์
      </p>
    </div>

    <!-- Ranking Categories in Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Top 5 Popular Novels -->
      <div class="novels-section ranking-card">
        <div class="ranking-header">
          <div class="novels-icon ranking-icon">
            📚
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">นิยายยอดนิยม</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Top 5 อันดับ</p>
          </div>
        </div>
        
        <div class="ranking-list">
          <div
            v-for="(novel, index) in topNovels"
            :key="novel.id"
            class="ranking-item"
            @click="navigateToDetail(novel.slug)"
          >
            <!-- Ranking Number -->
            <div
              class="ranking-number"
              :class="getRankingStyle(index + 1)"
            >
              {{ index + 1 }}
            </div>
            
            <!-- Cover Image -->
            <img
              :src="novel.cover"
              :alt="novel.title"
              class="ranking-cover"
            />
            
            <!-- Novel Info -->
            <div class="ranking-info">
              <h4 class="ranking-title">
                {{ novel.title }}
              </h4>
              <p class="ranking-author">
                {{ novel.author }}
              </p>
              <div class="ranking-stats">
                <span class="rating-badge">⭐ {{ novel.rating }}</span>
                <span class="views-count">{{ novel.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top 5 Popular Manga -->
      <div class="manga-section ranking-card">
        <div class="ranking-header">
          <div class="manga-icon ranking-icon">
            🎨
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">การ์ตูนยอดนิยม</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Top 5 อันดับ</p>
          </div>
        </div>
        
        <div class="ranking-list">
          <div
            v-for="(manga, index) in topManga"
            :key="manga.id"
            class="ranking-item"
            @click="navigateToDetail(manga.slug)"
          >
            <!-- Ranking Number -->
            <div
              class="ranking-number"
              :class="getRankingStyle(index + 1)"
            >
              {{ index + 1 }}
            </div>
            
            <!-- Cover Image -->
            <img
              :src="manga.cover"
              :alt="manga.title"
              class="ranking-cover"
            />
            
            <!-- Manga Info -->
            <div class="ranking-info">
              <h4 class="ranking-title">
                {{ manga.title }}
              </h4>
              <p class="ranking-author">
                {{ manga.author }}
              </p>
              <div class="ranking-stats">
                <span class="rating-badge">⭐ {{ manga.rating }}</span>
                <span class="views-count">{{ manga.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top 5 New Releases -->
      <div class="new-releases-section ranking-card">
        <div class="ranking-header">
          <div class="new-releases-icon ranking-icon">
            ✨
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">เรื่องใหม่มาแรง</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Top 5 อันดับ</p>
          </div>
        </div>
        
        <div class="ranking-list">
          <div
            v-for="(item, index) in topNewReleases"
            :key="item.id"
            class="ranking-item"
            @click="navigateToDetail(item.slug)"
          >
            <!-- Ranking Number -->
            <div
              class="ranking-number"
              :class="getRankingStyle(index + 1)"
            >
              {{ index + 1 }}
            </div>
            
            <!-- Cover Image -->
            <img
              :src="item.cover"
              :alt="item.title"
              class="ranking-cover"
            />
            
            <!-- Item Info -->
            <div class="ranking-info">
              <h4 class="ranking-title">
                {{ item.title }}
              </h4>
              <p class="ranking-author">
                {{ item.author }}
              </p>
              <div class="ranking-stats">
                <span class="new-badge">NEW</span>
                <span class="views-count">{{ item.views }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
// Props
const props = defineProps({
  topNovels: {
    type: Array,
    default: () => []
  },
  topManga: {
    type: Array,
    default: () => []
  },
  topNewReleases: {
    type: Array,
    default: () => []
  }
})

// Methods
const getRankingStyle = (rank) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-500 text-white'
    case 2:
      return 'bg-gray-400 text-white'
    case 3:
      return 'bg-orange-500 text-white'
    default:
      return 'bg-blue-500 text-white'
  }
}

const navigateToDetail = (slug) => {
  navigateTo(`/${slug}`)
}
</script>

<style scoped>
/* Theme-aware ranking card backgrounds */
.ranking-card {
  padding: 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ranking-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Novels Section - Blue Theme */
.novels-section {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
  border-color: rgba(59, 130, 246, 0.2);
}

.dark .novels-section {
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(29, 78, 216, 0.15) 50%, rgba(37, 99, 235, 0.1) 100%);
  border-color: rgba(59, 130, 246, 0.3);
}

.novels-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.dark .novels-icon {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
}

/* Manga Section - Green Theme */
.manga-section {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
  border-color: rgba(34, 197, 94, 0.2);
}

.dark .manga-section {
  background: linear-gradient(135deg, rgba(20, 83, 45, 0.2) 0%, rgba(21, 128, 61, 0.15) 50%, rgba(34, 197, 94, 0.1) 100%);
  border-color: rgba(34, 197, 94, 0.3);
}

.manga-icon {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

.dark .manga-icon {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  box-shadow: 0 4px 12px rgba(74, 222, 128, 0.2);
}

/* New Releases Section - Purple Theme */
.new-releases-section {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%);
  border-color: rgba(168, 85, 247, 0.2);
}

.dark .new-releases-section {
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.2) 0%, rgba(126, 34, 206, 0.15) 50%, rgba(168, 85, 247, 0.1) 100%);
  border-color: rgba(168, 85, 247, 0.3);
}

.new-releases-icon {
  background: linear-gradient(135deg, #a855f7, #9333ea);
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
}

.dark .new-releases-icon {
  background: linear-gradient(135deg, #c084fc, #a855f7);
  box-shadow: 0 4px 12px rgba(192, 132, 252, 0.2);
}

/* Common icon styles */
.ranking-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.125rem;
}

/* Ranking header */
.ranking-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Ranking list */
.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Ranking item */
.ranking-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.ranking-item:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dark .ranking-item {
  background: rgba(55, 65, 81, 0.5);
  border-color: rgba(75, 85, 99, 0.3);
}

.dark .ranking-item:hover {
  background: rgba(75, 85, 99, 0.7);
  border-color: rgba(107, 114, 128, 0.5);
}

/* Ranking number */
.ranking-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* Ranking number colors */
.ranking-number.bg-yellow-500 {
  background: linear-gradient(135deg, #eab308, #f59e0b);
  color: white;
  box-shadow: 0 2px 8px rgba(234, 179, 8, 0.3);
}

.ranking-number.bg-gray-400 {
  background: linear-gradient(135deg, #9ca3af, #6b7280);
  color: white;
  box-shadow: 0 2px 8px rgba(156, 163, 175, 0.3);
}

.ranking-number.bg-orange-500 {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
}

.ranking-number.bg-blue-500 {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

/* Cover image */
.ranking-cover {
  width: 3rem;
  height: 4rem;
  object-fit: cover;
  border-radius: 0.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

/* Ranking info */
.ranking-info {
  flex: 1;
  min-width: 0;
}

.ranking-title {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.dark .ranking-title {
  color: white;
}

.ranking-author {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.dark .ranking-author {
  color: #9ca3af;
}

/* Ranking stats */
.ranking-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.rating-badge {
  font-size: 0.75rem;
  color: #d97706;
  font-weight: 500;
}

.dark .rating-badge {
  color: #fbbf24;
}

.views-count {
  font-size: 0.75rem;
  color: #6b7280;
}

.dark .views-count {
  color: #9ca3af;
}

.new-badge {
  font-size: 0.75rem;
  background: #fef2f2;
  color: #dc2626;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 500;
  border: 1px solid #fecaca;
}

.dark .new-badge {
  background: rgba(185, 28, 28, 0.3);
  color: #fca5a5;
  border-color: rgba(220, 38, 38, 0.5);
}

/* Responsive design */
@media (max-width: 1024px) {
  .ranking-card {
    padding: 1.25rem;
  }
  
  .ranking-icon {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .ranking-card {
    padding: 1rem;
  }
  
  .ranking-item {
    padding: 0.625rem;
  }
  
  .ranking-cover {
    width: 2.5rem;
    height: 3.5rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .ranking-card {
    background: white;
    border: 2px solid #374151;
  }
  
  .dark .ranking-card {
    background: #111827;
    border: 2px solid #e5e7eb;
  }
  
  .ranking-item {
    background: #f9fafb;
    border: 1px solid #d1d5db;
  }
  
  .dark .ranking-item {
    background: #1f2937;
    border: 1px solid #6b7280;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .ranking-card,
  .ranking-item,
  .ranking-icon {
    transition: none;
  }
  
  .ranking-card:hover,
  .ranking-item:hover {
    transform: none;
  }
}

/* Print styles */
@media print {
  .ranking-card {
    background: white !important;
    border: 1px solid #d1d5db;
    box-shadow: none;
  }
  
  .ranking-item {
    background: #f9fafb !important;
    border: 1px solid #e5e7eb;
  }
  
  .ranking-icon {
    background: #6b7280 !important;
  }
}

/* Custom scrollbar for ranking lists */
.ranking-list::-webkit-scrollbar {
  width: 4px;
}

.ranking-list::-webkit-scrollbar-track {
  background: transparent;
}

.ranking-list::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.ranking-list::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}

/* Focus styles for accessibility */
.ranking-item:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.dark .ranking-item:focus-visible {
  outline-color: #60a5fa;
}

/* Animation for ranking cards entrance */
.ranking-card {
  animation: slideInUp 0.6s ease-out;
}

.ranking-card:nth-child(1) {
  animation-delay: 0.1s;
}

.ranking-card:nth-child(2) {
  animation-delay: 0.2s;
}

.ranking-card:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Disable animation on reduced motion */
@media (prefers-reduced-motion: reduce) {
  .ranking-card {
    animation: none;
  }
}
</style>
