// User model
export interface User {
  id: number
  username: string
  displayname: string
  email: string
  coins: number
  avatar: string | null
  role_id: number
  role_name: string
  role_description: string
  created_at: string
  updated_at: string
  avatar_url: string
}

// User roles
export type UserRole = 'admin' | 'writer' | 'user'

// Request types
export interface LoginCredentials {
  login: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

export interface ProfileUpdateData {
  username?: string
  email?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

// Response types
export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
  redirectTo?: string
}
