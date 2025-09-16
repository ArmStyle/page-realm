/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        'primary-dark': '#5a67d8',
        eyecare: {
          bg: '#f5f3f0',
          card: '#f9f7f4',
          text: '#2d3748',
          border: '#d4c5a9',
          muted: '#4a5568',
        },
        'eyecare-dark': {
          bg: '#1a1611',
          card: '#231f1a',
          text: '#e8e2d4',
          border: '#3a342a',
          muted: '#b8b0a0',
          accent: '#2d271f',
        }
      },
      fontFamily: {
        'thai': ['Sarabun', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}