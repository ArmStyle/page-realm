// Generic API response types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
}

export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  success: boolean
  message?: string
  data?: {
    items: T[]
    pagination: Pagination
  }
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// Common query parameters
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface SearchParams extends PaginationParams {
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}

// Upload types
export interface UploadResponse {
  success: boolean
  message?: string
  data?: {
    url: string
    filename: string
    path: string
  }
}
