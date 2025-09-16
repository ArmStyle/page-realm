export default defineNuxtPlugin(() => {
  const settingsStore = useSettingsStore()
  
  // Initialize settings from localStorage
  settingsStore.initSettings()
  
  // Handle keyboard shortcuts
  const handleKeyboard = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === '=' || event.key === '+') {
        event.preventDefault()
        settingsStore.setFontSize(settingsStore.fontSize + 2)
      } else if (event.key === '-') {
        event.preventDefault()
        settingsStore.setFontSize(settingsStore.fontSize - 2)
      }
    }
  }
  
  document.addEventListener('keydown', handleKeyboard)
  
  // Cleanup on route change
  const router = useRouter()
  router.beforeEach(() => {
    document.removeEventListener('keydown', handleKeyboard)
  })
})