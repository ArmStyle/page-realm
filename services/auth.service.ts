import axios from 'axios'
import Cookies from 'js-cookie'

export interface LoginCredentials {
  login: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
}

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

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  redirectTo?: string;
}

export interface ProfileUpdateData {
  username?: string;
  email?: string;
}

class AuthService {
  private api = axios.create({
    baseURL: "",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    // Set base URL from runtime config or environment
    if (typeof window !== "undefined") {
      try {
        const config = useRuntimeConfig();
        this.api.defaults.baseURL = config.public.apiBaseUrl as string;
      } catch (error) {
        // Fallback to hardcoded URL if runtime config is not available
        this.api.defaults.baseURL =
          "https://mistpageapi-production.up.railway.app/api";
      }
    } else {
      // Server-side fallback
      this.api.defaults.baseURL =
        "https://mistpageapi-production.up.railway.app/api";
    }

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = Cookies.get("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Check if this is a login request - if so, don't redirect
          const isLoginRequest = error.config?.url?.includes('/auth/login');
          
          if (!isLoginRequest) {
            // Token expired or invalid, clear auth and redirect
            this.clearAuthData();
            if (typeof window !== "undefined") {
              console.log('401 error - redirecting to home page');
              window.location.href = "/";
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Clear authentication data
  private clearAuthData() {
    Cookies.remove("auth_token");
    Cookies.remove("user");
  }

  // Save authentication data
  private saveAuthData(user: User, token: string) {
    // Save for 7 days
    const expires = 7;
    Cookies.set("auth_token", token, { expires });
    Cookies.set("user", JSON.stringify(user), { expires });
  }

  // Login function
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data } = await this.api.post("/auth/login", credentials);

      if (data.success) {
        this.saveAuthData(data.data.user, data.data.token);

        return {
          success: true,
          user: data.data.user,
          token: data.data.token,
          message: "เข้าสู่ระบบสำเร็จ",
        };
      } else {
        return {
          success: false,
          message: "ข้อมูลการเข้าสู่ระบบไม่ถูกต้อง",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
      };
    }
  }

  // Logout function
  async logout(): Promise<AuthResponse> {
    try {
      // Call logout endpoint if needed
      await this.api.post("/auth/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn("Logout API call failed:", error);
    }

    // Clear local auth data
    this.clearAuthData();

    return {
      success: true,
      message: "ออกจากระบบสำเร็จ",
    };
  }

  // Get current user profile
  async getUserProfile(): Promise<AuthResponse> {
    try {
      const { data } = await this.api.get("/users/profile");

      if (data.success && data.data.user) {
        // Update cookie with fresh user data
        const token = Cookies.get("auth_token");
        if (token) {
          this.saveAuthData(data.data.user, token);
        }

        return {
          success: true,
          user: data.data.user,
        };
      } else {
        return {
          success: false,
          message: data.message || "ไม่สามารถดึงข้อมูลผู้ใช้ได้",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
      };
    }
  }

  // Update user profile
  async updateProfile(data: ProfileUpdateData): Promise<AuthResponse> {
    try {
      const { data: responseData } = await this.api.put("/users/profile", data);

      if (responseData.success && responseData.data.user) {
        // Update cookie with updated user data
        const token = Cookies.get("auth_token");
        if (token) {
          this.saveAuthData(responseData.data.user, token);
        }

        return {
          success: true,
          user: responseData.data.user,
          message: responseData.message || "อัปเดตข้อมูลสำเร็จ",
        };
      } else {
        return {
          success: false,
          message: responseData.message || "ไม่สามารถอัปเดตข้อมูลได้",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message:
          error.response?.data?.message || "เกิดข้อผิดพลาดในการอัปเดตข้อมูล",
      };
    }
  }

  // Get user from cookie
  getUserFromCookie(): User | null {
    try {
      const userStr = Cookies.get("user");
      console.log('getUserFromCookie - userStr:', userStr ? 'found' : 'not found');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user from cookie:", error);
      return null;
    }
  }

  // Get token from cookie
  getTokenFromCookie(): string | null {
    const token = Cookies.get("auth_token") || null;
    console.log('getTokenFromCookie - token:', token ? 'found' : 'not found');
    return token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getTokenFromCookie();
    const user = this.getUserFromCookie();
    return !!(token && user);
  }

  // Verify token with server
  async verifyToken(): Promise<AuthResponse> {
    try {
      const token = this.getTokenFromCookie();

      if (!token) {
        return {
          success: false,
          message: "ไม่พบ token",
        };
      }

      // Get fresh user data from server
      const profileResponse = await this.getUserProfile();

      if (profileResponse.success && profileResponse.user) {
        return {
          success: true,
          user: profileResponse.user,
        };
      } else {
        // Token is invalid, clear auth data
        this.clearAuthData();
        return {
          success: false,
          message: "Token ไม่ถูกต้อง",
        };
      }
    } catch (error: any) {
      // Token is invalid, clear auth data
      this.clearAuthData();
      return {
        success: false,
        message: "Token ไม่ถูกต้อง",
      };
    }
  }
}

export default AuthService;
