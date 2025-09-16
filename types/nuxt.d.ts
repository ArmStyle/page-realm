import AuthService from '../services/auth.service'

declare module '#app' {
  interface NuxtApp {
    $authService: InstanceType<typeof AuthService>
  }
}

declare module 'nuxt/schema' {
  interface NuxtApp {
    $authService: InstanceType<typeof AuthService>
  }
}

export {}
