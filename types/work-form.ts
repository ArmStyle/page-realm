export interface WorkFormType {
  coverImage?: File | null
  title: string
  primaryCategory: string
  secondaryCategory: string
  description: string
  synopsis: string
  tags: string[]
  contentWarnings: string[]
  status: 'published' | 'hidden'
  allowComments: boolean
  isCompleted: boolean
}
