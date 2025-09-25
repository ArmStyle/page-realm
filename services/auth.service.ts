import axios from 'axios'

export interface LoginCredentials {
  usernameOrEmail: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  confirmPassword: string
  recaptcha: string
}

export interface User {
  id: string
  profileName: string
  profileImg: string
  username: string
  email: string
  coin: number
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
  redirectTo?: string
}

class AuthService {
  private api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Mock API base URL
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  constructor() {
    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token')
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
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
          // Token expired or invalid, clear auth
          if (typeof window !== 'undefined') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  // Mock login function (replace with real API)
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock validation
      if (!credentials.usernameOrEmail || !credentials.password) {
        return {
          success: false,
          message: 'กรุณากรอก username/email และ password'
        }
      }

      // Mock successful login
      if (credentials.password === 'password123') {
        const mockUser: User = {
          id: '1',
          profileName: credentials.usernameOrEmail.includes('@') ? 'ผู้ใช้ใหม่' : credentials.usernameOrEmail,
          profileImg: 'https://placehold.co/40x40?text=U',
          username: credentials.usernameOrEmail.includes('@') ? credentials.usernameOrEmail.split('@')[0] : credentials.usernameOrEmail,
          email: credentials.usernameOrEmail.includes('@') ? credentials.usernameOrEmail : `${credentials.usernameOrEmail}@example.com`,
          coin: 1000
        }

        return {
          success: true,
          user: mockUser,
          token: 'mock_jwt_token_' + Date.now(),
          message: 'เข้าสู่ระบบสำเร็จ'
        }
      } else {
        return {
          success: false,
          message: 'username/email หรือ password ไม่ถูกต้อง'
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'
      }
    }
  }

  // Mock logout function
  async logout(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      message: 'ออกจากระบบสำเร็จ'
    }
  }

  // Mock Google login
  async loginWithGoogle(): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const mockUser: User = {
      id: '2',
      profileName: 'Google User',
      profileImg: 'https://placehold.co/40x40?text=G',
      username: 'googleuser',
      email: 'googleuser@gmail.com',
      coin: 500
    }
    return {
      success: true,
      user: mockUser,
      token: 'mock_google_token_' + Date.now(),
      message: 'เข้าสู่ระบบด้วย Google สำเร็จ'
    }
  }

  // Mock register function
  async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    if (!data.username || !data.email || !data.password || !data.confirmPassword || !data.recaptcha) {
      return {
        success: false,
        message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
      }
    }
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        message: 'รหัสผ่านไม่ตรงกัน'
      }
    }
    // Mock success
    return {
      success: true,
      message: 'สมัครสมาชิกสำเร็จ'
    }
  }

  // Verify token (mock)
  async verifyToken(): Promise<AuthResponse> {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      
      if (!token) {
        return {
          success: false,
          message: 'ไม่พบ token'
        }
      }

      // Simulate token verification
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock token validation
      if (token.startsWith('mock_')) {
        const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
        
        if (userData) {
          return {
            success: true,
            user: JSON.parse(userData)
          }
        }
      }

      return {
        success: false,
        message: 'Token ไม่ถูกต้อง'
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'เกิดข้อผิดพลาดในการตรวจสอบ token'
      }
    }
  }
}

export default AuthService
