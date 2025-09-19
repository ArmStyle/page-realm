import { defineStore } from 'pinia'
import type { Work, WorkStats } from '~/types/work'

export const useWorksStore = defineStore('works', () => {
  // State
  const works = ref<Work[]>([])
  const stats = ref<WorkStats>({
    totalWorks: 0,
    totalViews: 0,
    totalFavorites: 0,
    totalFollowers: 0
  })
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const publishedWorks = computed(() => 
    works.value.filter(work => work.publishStatus === 'published')
  )

  const draftWorks = computed(() => 
    works.value.filter(work => work.publishStatus === 'draft')
  )

  const pendingWorks = computed(() => 
    works.value.filter(work => work.publishStatus === 'pending')
  )

  // Actions
  const fetchWorks = async (type?: string) => {
    loading.value = true
    error.value = null
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for demonstration
      const mockWorks: Work[] = [
        {
          id: '1',
          title: 'การผจญภัยของนักรบเวทมนตร์',
          description: 'เรื่องราวของนักรบหนุ่มที่ต้องเดินทางเพื่อช่วยเหลือโลกจากความมืดมิด พร้อมเพื่อนๆ ที่เชื่อใจได้',
          type: 'novel',
          category: 'fantasy',
          tags: ['ผจญภัย', 'เวทมนตร์', 'มิตรภาพ'],
          publishStatus: 'published',
          ageRating: 'teen',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-09-10'),
          viewCount: 1500,
          favoriteCount: 120,
          chapterCount: 15,
          status: 'ongoing'
        },
        {
          id: '2',
          title: 'ชีวิตประจำวันของนักเรียนม.ปลาย',
          description: 'เรื่องราวตลกๆ ของนักเรียนมัธยมปลายและการใช้ชีวิตในโรงเรียน',
          type: 'novel',
          category: 'slice-of-life',
          tags: ['โรงเรียน', 'ตลก', 'วัยรุ่น'],
          publishStatus: 'draft',
          ageRating: 'all',
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date('2024-09-08'),
          viewCount: 0,
          favoriteCount: 0,
          chapterCount: 3,
          status: 'ongoing'
        },
        {
          id: '3',
          title: 'นักสู้อวกาศ',
          description: 'การต่อสู้ในจักรวาลที่เต็มไปด้วยอันตรายและการผจญภัย',
          type: 'comic',
          category: 'sci-fi',
          tags: ['อวกาศ', 'แอคชั่น', 'หุ่นยนต์'],
          publishStatus: 'published',
          ageRating: 'teen',
          createdAt: new Date('2024-03-01'),
          updatedAt: new Date('2024-09-12'),
          viewCount: 2500,
          favoriteCount: 200,
          chapterCount: 8,
          status: 'ongoing'
        },
        {
          id: '4',
          title: 'โรงเรียนแห่งเวทมนตร์',
          description: 'ชีวิตในโรงเรียนที่สอนเวทมนตร์และการผจญภัยของนักเรียน',
          type: 'comic',
          category: 'fantasy',
          tags: ['เวทมนตร์', 'โรงเรียน', 'ผจญภัย'],
          publishStatus: 'published',
          ageRating: 'all',
          createdAt: new Date('2024-04-15'),
          updatedAt: new Date('2024-09-05'),
          viewCount: 1800,
          favoriteCount: 150,
          chapterCount: 12,
          status: 'ongoing'
        }
      ]
      
      // Filter by type if specified
      if (type) {
        works.value = mockWorks.filter(work => work.type === type)
      } else {
        works.value = mockWorks
      }
      
      // Update stats based on filtered works
      const filteredWorks = type ? works.value : mockWorks
      stats.value = {
        totalWorks: filteredWorks.length,
        totalViews: filteredWorks.reduce((sum, work) => sum + work.viewCount, 0),
        totalFavorites: filteredWorks.reduce((sum, work) => sum + work.favoriteCount, 0),
        totalFollowers: 45 // Mock data
      }
    } catch (err) {
      error.value = 'ไม่สามารถโหลดผลงานได้'
      console.error('Error fetching works:', err)
    } finally {
      loading.value = false
    }
  }

  const createWork = async (workData: Partial<Work>) => {
    loading.value = true
    error.value = null
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newWork: Work = {
        id: Date.now().toString(),
        title: workData.title || '',
        description: workData.description || '',
        type: workData.type || 'novel',
        category: workData.category || '',
        tags: workData.tags || [],
        publishStatus: workData.publishStatus || 'draft',
        ageRating: workData.ageRating || 'all',
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0,
        favoriteCount: 0,
        chapterCount: 0,
        status: 'ongoing'
      }
      
      works.value.push(newWork)
      
      // Update stats
      stats.value.totalWorks = works.value.length
      
      return newWork
    } catch (err) {
      error.value = 'ไม่สามารถสร้างผลงานได้'
      console.error('Error creating work:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateWork = async (id: string, updates: Partial<Work>) => {
    loading.value = true
    error.value = null
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = works.value.findIndex(work => work.id === id)
      if (index !== -1) {
        works.value[index] = {
          ...works.value[index],
          ...updates,
          updatedAt: new Date()
        }
      }
    } catch (err) {
      error.value = 'ไม่สามารถอัปเดตผลงานได้'
      console.error('Error updating work:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteWork = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      works.value = works.value.filter(work => work.id !== id)
      stats.value.totalWorks = works.value.length
    } catch (err) {
      error.value = 'ไม่สามารถลบผลงานได้'
      console.error('Error deleting work:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getWorkById = (id: string) => {
    return works.value.find(work => work.id === id)
  }

  return {
    // State
    works: readonly(works),
    stats: readonly(stats),
    loading: readonly(loading),
    error: readonly(error),
    
    // Getters
    publishedWorks,
    draftWorks,
    pendingWorks,
    
    // Actions
    fetchWorks,
    createWork,
    updateWork,
    deleteWork,
    getWorkById
  }
})
