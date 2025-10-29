import SeriesService from '~/services/series.service'
import type { Series, SeriesFilters, SeriesType } from '~/types/series'

export const useSeries = () => {
  const seriesService = new SeriesService()

  // State
  const series = ref<Series[]>([])
  const currentSeries = ref<Series | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  })

  /**
   * Fetch all series with filters
   */
  const fetchSeries = async (filters?: SeriesFilters) => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getAllSeries(filters)

      if (response.success && response.data) {
        series.value = response.data.series
        pagination.value = response.data.pagination
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ได้'
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch popular series
   */
  const fetchPopularSeries = async (limit: number = 10, seriesType?: SeriesType) => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getPopularSeries(limit, seriesType)

      if (response.success && response.data) {
        // รองรับทั้งกรณีที่ data.series เป็น array และ data เป็น array โดยตรง
        if (Array.isArray(response.data.series)) {
          series.value = response.data.series
        } else if (Array.isArray(response.data)) {
          series.value = response.data
        } else {
          series.value = []
        }
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ยอดนิยมได้'
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch latest series
   */
  const fetchLatestSeries = async (limit: number = 10, seriesType?: SeriesType) => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getLatestSeries(limit, seriesType)

      if (response.success && response.data) {
        series.value = response.data.series
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ล่าสุดได้'
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch series by ID
   */
  const fetchSeriesById = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getSeriesById(id)

      if (response.success && response.data) {
        currentSeries.value = response.data.series
        return response.data.series
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ได้'
        return null
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch user's favorite series
   */
  const fetchFavoriteSeries = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getFavoriteSeries()

      if (response.success && response.data) {
        series.value = response.data.series
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ที่ชื่นชอบได้'
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch writer's own series
   */
  const fetchMySeries = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await seriesService.getMySeries()

      if (response.success && response.data) {
        series.value = response.data.series
      } else {
        error.value = response.message || 'ไม่สามารถดึงข้อมูลซีรีส์ของคุณได้'
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
    } finally {
      loading.value = false
    }
  }

  /**
   * Toggle favorite status
   */
  const toggleFavorite = async (id: number, isFavorite: boolean) => {
    try {
      const response = isFavorite
        ? await seriesService.removeFromFavorites(id)
        : await seriesService.addToFavorites(id)

      if (response.success) {
        // Update the series in the list
        const index = series.value.findIndex((s) => s.id === id)
        if (index !== -1) {
          series.value[index].is_favorite = !isFavorite
        }

        // Update current series if it's the same
        if (currentSeries.value?.id === id) {
          currentSeries.value.is_favorite = !isFavorite
        }

        return true
      } else {
        error.value = response.message || 'ไม่สามารถอัปเดตสถานะรายการโปรดได้'
        return false
      }
    } catch (err: any) {
      error.value = err.message || 'เกิดข้อผิดพลาด'
      return false
    }
  }

  return {
    // State
    series,
    currentSeries,
    loading,
    error,
    pagination,

    // Methods
    fetchSeries,
    fetchPopularSeries,
    fetchLatestSeries,
    fetchSeriesById,
    fetchFavoriteSeries,
    fetchMySeries,
    toggleFavorite,

    // Direct access to service for advanced usage
    seriesService,
  }
}
