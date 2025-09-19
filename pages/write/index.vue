<script setup>
definePageMeta({
  layout: 'default'
})

// Redirect to dashboard when accessing /write
await navigateTo('/write/dashboard')
</script>

<template>
  <div></div>
</template>