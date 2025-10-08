export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  // Initialize auth state from cookies (non-blocking)
  if (process.client) {
    authStore.initAuth().catch(console.error)
  }
  
  // Check if route requires authentication
  const protectedRoutes = ['/writer', '/profile', '/dashboard']
  const isProtectedRoute = protectedRoutes.some(route => to.path.startsWith(route))
  
  
  if (isProtectedRoute && !authStore.isAuthenticated) {
    return navigateTo('/')
  }
})
