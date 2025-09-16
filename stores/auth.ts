import { defineStore } from 'pinia'
import { navigateTo, useNuxtApp } from 'nuxt/app'

export interface User {
  id: string
  profileName: string
  profileImg: string
  username: string
  email: string
  coin: number
}

export interface AuthState {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
  }),

  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => state.isLoggedIn && !!state.user,
    userCoin: (state) => state.user?.coin || 0,
    userProfileImg: (state) => state.user?.profileImg || '/default-avatar.png'
  },

  actions: {
    // Login with username/email and password
    async login(credentials: { usernameOrEmail: string; password: string }) {
      this.isLoading = true
      this.error = null
      
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.login(credentials)
        
        if (response.success && response.user && response.token) {
          this.user = response.user
          this.isLoggedIn = true
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
          }
          
          // Redirect to intended page or home
          await navigateTo(response.redirectTo || '/')
        } else {
          this.error = response.message || 'เข้าสู่ระบบไม่สำเร็จ'
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
        console.error('Login error:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Login with Google
    async loginWithGoogle() {
      this.isLoading = true
      this.error = null
      
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.loginWithGoogle()
        
        if (response.success && response.user && response.token) {
          this.user = response.user
          this.isLoggedIn = true
          
          // Save to localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
          }
          
          await navigateTo(response.redirectTo || '/')
        } else {
          this.error = response.message || 'เข้าสู่ระบบด้วย Google ไม่สำเร็จ'
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบด้วย Google'
        console.error('Google login error:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Register
    async register(userData: {
      username: string
      email: string
      password: string
      confirmPassword: string
      recaptcha: string
    }) {
      this.isLoading = true
      this.error = null
      
      try {
        const { $authService } = useNuxtApp()
        const response = await $authService.register(userData)
        
        if (response.success) {
          // Auto login after successful registration
          await this.login({
            usernameOrEmail: userData.username,
            password: userData.password
          })
        } else {
          this.error = response.message || 'สมัครสมาชิกไม่สำเร็จ'
        }
      } catch (error: any) {
        this.error = error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก'
        console.error('Registration error:', error)
      } finally {
        this.isLoading = false
      }
    },

    // Logout
    logout() {
      this.user = null
      this.isLoggedIn = false
      this.error = null
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
      navigateTo('/login')
    },

    // Initialize auth state from localStorage
    initAuth() {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user')
        
        if (token && userData) {
          try {
            this.user = JSON.parse(userData)
            this.isLoggedIn = true
          } catch (error) {
            console.error('Error parsing stored user data:', error)
            this.clearAuth()
          }
        }
      }
    },

    // Clear auth state
    clearAuth() {
      this.user = null
      this.isLoggedIn = false
      this.error = null
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
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

    // Update user coin
    updateCoin(amount: number) {
      if (this.user) {
        this.user.coin = amount
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      }
    },

    // Clear error
    clearError() {
      this.error = null
    }
  }
})
