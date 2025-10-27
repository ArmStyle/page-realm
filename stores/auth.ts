import { defineStore } from 'pinia'
import { navigateTo, useNuxtApp } from 'nuxt/app'
import Cookies from 'js-cookie'

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

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  initialized: boolean
  lastLoginTime: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    initialized: false,
    lastLoginTime: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn && !!state.user,
    userCoins: (state) => state.user?.coins || 0,
    userRole: (state) => state.user?.role_name || 'User'
  },

  actions: {
    // Login with email and password
    async login(credentials: { login: string; password: string }) {
      this.isLoading = true
      this.error = null
      
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.login(credentials)
        
        if (response.success && response.user && response.token) {
          this.user = response.user
          this.isLoggedIn = true
          this.lastLoginTime = Date.now()
          
          // Redirect to intended page or home
          await navigateTo(response.redirectTo || '/')
          return { success: true, message: response.message }
        } else {
          this.error = response.message || 'เข้าสู่ระบบไม่สำเร็จ'
          return { success: false, message: this.error }
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
        console.error('Login error:', error)
        return { success: false, message: this.error }
      } finally {
        this.isLoading = false
      }
    },

    // Get user profile from server
    async fetchUserProfile() {
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.getUserProfile()
        
        if (response.success && response.user) {
          this.user = response.user
          this.isLoggedIn = true
          return { success: true, user: response.user }
        } else {
          this.logout()
          return { success: false, message: response.message }
        }
      } catch (error: any) {
        console.error('Profile fetch error:', error)
        this.logout()
        return { success: false, message: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้' }
      }
    },

    // Update user profile
    async updateProfile(data: { username?: string; email?: string }) {
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.updateProfile(data)
        
        if (response.success && response.user) {
          this.user = response.user
          return { success: true, message: response.message }
        } else {
          return { success: false, message: response.message }
        }
      } catch (error: any) {
        console.error('Profile update error:', error)
        return { success: false, message: 'ไม่สามารถอัปเดตข้อมูลได้' }
      }
    },

    // Logout
    async logout() {
      try {
        const { $authService } = useNuxtApp()
        await $authService.logout()
      } catch (error) {
        console.warn('Logout API call failed:', error)
      }
      
      // Clear local state
      this.user = null
      this.isLoggedIn = false
      this.error = null
      
      // Navigate to login page
      await navigateTo('/')
    },

    // Initialize auth state from cookies
    async initAuth() {
      if (this.initialized || typeof window === 'undefined') {
        return
      }

      this.initialized = true
      
      try {
        const { $authService } = useNuxtApp()
        const user = $authService.getUserFromCookie()
        const token = $authService.getTokenFromCookie()
        
        if (token && user) {
          // Set user from cookie first
          this.user = user
          this.isLoggedIn = true
          
          // ไม่ต้อง verify token ถ้าเพิ่ง login ไปไม่เกิน 5 นาที (300,000 ms)
          const timeSinceLogin = this.lastLoginTime ? Date.now() - this.lastLoginTime : Infinity
          const shouldSkipVerify = timeSinceLogin < 300000 // 5 minutes
          
          if (!shouldSkipVerify) {
            // Verify token with server in the background
            try {
              const verifyResponse = await $authService.verifyToken()
              if (!verifyResponse.success) {
                // Token is invalid, clear auth
                this.clearAuth()
              } else if (verifyResponse.user) {
                // Update with fresh user data
                this.user = verifyResponse.user
              }
            } catch (error) {
              // If verification fails, clear auth
              console.warn('Token verification failed:', error)
              this.clearAuth()
            }
          }
        } else {
          this.clearAuth()
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        this.clearAuth()
      }
    },

    // Clear auth state
    clearAuth() {
      console.log('clearAuth() called')
      this.user = null
      this.isLoggedIn = false
      this.error = null
      this.initialized = false
      this.lastLoginTime = null
      
      // Clear cookies
      Cookies.remove('auth_token')
      Cookies.remove('user')
    },

    // Update user profile
    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      }
    },

    // Update user coins
    updateCoins(amount: number) {
      if (this.user) {
        this.user.coins = amount
        
        // Update cookie with new data
        const token = Cookies.get('auth_token')
        if (token) {
          Cookies.set('user', JSON.stringify(this.user), { expires: 7 })
        }
      }
    },

    // Clear error
    clearError() {
      this.error = null
    }
  }
})
