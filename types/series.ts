// Series model type
export interface Series {
  id: number
  title: string
  description: string
  cover_image: string | null
  cover_image_url: string
  author_id: number
  author_name: string
  category_id: number
  category_name: string
  series_type: 'manga' | 'novel'
  status: 'ongoing' | 'completed' | 'hiatus'
  views: number
  rating: number
  rating_count: number
  chapter_count: number
  is_favorite?: boolean
  created_at: string
  updated_at: string
}

// Series type literals
export type SeriesType = 'manga' | 'novel'
export type SeriesStatus = 'ongoing' | 'completed' | 'hiatus'
export type SeriesSortOption = 'latest' | 'popular' | 'rating' | 'title'

// Import Pagination from api types
import type { Pagination } from './api'

// Request/Query types
export interface SeriesFilters {
  page?: number
  limit?: number
  search?: string
  category_id?: number
  series_type?: SeriesType
  status?: SeriesStatus
  sort?: SeriesSortOption
}

export interface CreateSeriesData {
  title: string
  description: string
  cover_image?: string
  category_id: number
  series_type: SeriesType
  status: SeriesStatus
}

export interface UpdateSeriesData {
  title?: string
  description?: string
  cover_image?: string
  category_id?: number
  series_type?: SeriesType
  status?: SeriesStatus
}

// Response types
export interface SeriesListResponse {
  success: boolean
  message?: string
  data?: {
    series: Series[]
    pagination: Pagination
  }
}

export interface SeriesResponse {
  success: boolean
  message?: string
  data?: {
    series: Series
  }
}

export interface BasicResponse {
  success: boolean
  message?: string
}
