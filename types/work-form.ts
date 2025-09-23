export interface WorkFormType {
  coverImage?: File | null
  title: string
  category: string
  description: string
  synopsis: string
  tags: string[]
  contentWarnings: string[]
  status: 'published' | 'hidden'
  allowComments: boolean
}
