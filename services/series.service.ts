import axios from 'axios'
import type { AxiosInstance } from 'axios'
import Cookies from 'js-cookie'
import type {
  Series,
  SeriesType,
  SeriesFilters,
  CreateSeriesData,
  UpdateSeriesData,
  SeriesListResponse,
  SeriesResponse,
  BasicResponse,
} from '~/types/series'

class SeriesService {
  private api: AxiosInstance

  constructor() {
    this.api = axios.create({
      baseURL: '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Set base URL from runtime config or environment
    if (typeof window !== 'undefined') {
      try {
        const config = useRuntimeConfig()
        this.api.defaults.baseURL = config.public.apiBaseUrl as string
      } catch (error) {
        // Fallback to hardcoded URL if runtime config is not available
        this.api.defaults.baseURL = 'https://mistpageapi-production.up.railway.app/api'
      }
    } else {
      // Server-side fallback
      this.api.defaults.baseURL = 'https://mistpageapi-production.up.railway.app/api'
    }

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          if (typeof window !== 'undefined') {
            console.log('401 error - unauthorized access')
          }
        }
        return Promise.reject(error)
      }
    )
  }

  /**
   * Get all series with filtering and pagination
   * @param filters - Filtering options
   */
  async getAllSeries(filters?: SeriesFilters): Promise<SeriesListResponse> {
    try {
      const params = new URLSearchParams()
      
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.limit) params.append('limit', filters.limit.toString())
      if (filters?.search) params.append('search', filters.search)
      if (filters?.category_id) params.append('category_id', filters.category_id.toString())
      if (filters?.series_type) params.append('series_type', filters.series_type)
      if (filters?.status) params.append('status', filters.status)
      if (filters?.sort) params.append('sort', filters.sort)

      const { data } = await this.api.get(`/series?${params.toString()}`)

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์',
      }
    }
  }

  /**
   * Get popular series (sorted by views and rating)
   * @param limit - Number of series to return
   * @param seriesType - Filter by series type (manga or novel)
   */
  async getPopularSeries(limit: number = 10, seriesType?: SeriesType): Promise<SeriesListResponse> {
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      if (seriesType) {
        params.append('series_type', seriesType)
      }

      const { data } = await this.api.get(`/series/popular?${params.toString()}`)

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์ยอดนิยม',
      }
    }
  }

  /**
   * Get latest series (sorted by creation date)
   * @param limit - Number of series to return
   * @param seriesType - Filter by series type (manga or novel)
   */
  async getLatestSeries(limit: number = 10, seriesType?: SeriesType): Promise<SeriesListResponse> {
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      if (seriesType) {
        params.append('series_type', seriesType)
      }

      const { data } = await this.api.get(`/series/latest?${params.toString()}`)

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์ล่าสุด',
      }
    }
  }

  /**
   * Get writer's own series (Writer/Admin only)
   */
  async getMySeries(): Promise<SeriesListResponse> {
    try {
      const { data } = await this.api.get('/series/my-series')

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์ของคุณ',
      }
    }
  }

  /**
   * Get user's favorite series
   */
  async getFavoriteSeries(): Promise<SeriesListResponse> {
    try {
      const { data } = await this.api.get('/series/favorites')

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์ที่ชื่นชอบ',
      }
    }
  }

  /**
   * Get series by ID (increments view count)
   * @param id - Series ID
   */
  async getSeriesById(id: number): Promise<SeriesResponse> {
    try {
      const { data } = await this.api.get(`/series/${id}`)

      return {
        success: data.success || true,
        data: data.series,
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลซีรีส์',
      }
    }
  }

  /**
   * Create new series (Writer/Admin only)
   * @param seriesData - Series data to create
   */
  async createSeries(seriesData: CreateSeriesData): Promise<SeriesResponse> {
    try {
      const { data } = await this.api.post('/series', seriesData)

      return {
        success: data.success || true,
        data: data.series,
        message: data.message || 'สร้างซีรีส์สำเร็จ',
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการสร้างซีรีส์',
      }
    }
  }

  /**
   * Update series (Writer can update own series, Admin can update any)
   * @param id - Series ID
   * @param seriesData - Series data to update
   */
  async updateSeries(id: number, seriesData: UpdateSeriesData): Promise<SeriesResponse> {
    try {
      const { data } = await this.api.put(`/series/${id}`, seriesData)

      return {
        success: data.success || true,
        data: data.series,
        message: data.message || 'อัปเดตซีรีส์สำเร็จ',
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตซีรีส์',
      }
    }
  }

  /**
   * Delete series (Writer can delete own series, Admin can delete any)
   * @param id - Series ID
   */
  async deleteSeries(id: number): Promise<BasicResponse> {
    try {
      const { data } = await this.api.delete(`/series/${id}`)

      return {
        success: data.success || true,
        message: data.message || 'ลบซีรีส์สำเร็จ',
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการลบซีรีส์',
      }
    }
  }

  /**
   * Add series to user's favorites
   * @param id - Series ID
   */
  async addToFavorites(id: number): Promise<BasicResponse> {
    try {
      const { data } = await this.api.post(`/series/${id}/favorite`)

      return {
        success: data.success || true,
        message: data.message || 'เพิ่มเข้ารายการโปรดสำเร็จ',
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มเข้ารายการโปรด',
      }
    }
  }

  /**
   * Remove series from user's favorites
   * @param id - Series ID
   */
  async removeFromFavorites(id: number): Promise<BasicResponse> {
    try {
      const { data } = await this.api.delete(`/series/${id}/favorite`)

      return {
        success: data.success || true,
        message: data.message || 'ลบออกจากรายการโปรดสำเร็จ',
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'เกิดข้อผิดพลาดในการลบออกจากรายการโปรด',
      }
    }
  }
}

export default SeriesService
