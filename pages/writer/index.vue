<script setup>
definePageMeta({
  layout: 'default'
})

// Redirect to dashboard when accessing /writer
await navigateTo('/writer/dashboard')
</script>

<template>
  <div></div>
</template>