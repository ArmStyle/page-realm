export default defineNuxtPlugin(() => {
  if (process.client) {
    const theme =
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.remove('light', 'dark', 'eyecare');
    document.documentElement.classList.add(theme);
  }
});
