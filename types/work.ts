export interface Work {
  id: string
  title: string
  description: string
  type: 'novel' | 'comic'
  category: string
  tags: string[]
  coverImage?: string
  publishStatus: 'draft' | 'published' | 'pending'
  ageRating: 'all' | 'teen' | 'mature'
  createdAt: Date
  updatedAt: Date
  viewCount: number
  favoriteCount: number
  chapterCount: number
  status: 'ongoing' | 'completed' | 'hiatus'
}

export interface WorkStats {
  totalWorks: number
  totalViews: number
  totalFavorites: number
  totalFollowers: number
}

export interface CreateWorkForm {
  title: string
  type: 'novel' | 'comic'
  category: string
  description: string
  tags: string[]
  publishStatus: 'draft' | 'published' | 'pending'
  ageRating: 'all' | 'teen' | 'mature'
  coverImage: File | null
  coverPreview: string | null
}
