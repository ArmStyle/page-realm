<template>
  <section :class="sectionClasses">
    <slot />
  </section>
</template>

<script setup>
// Section wrapper component with full-width background and proper negative margins
const props = defineProps({
  bgClass: {
    type: String,
    default: ''
  },
  py: {
    type: String,
    default: 'py-16'
  }
})

const sectionClasses = computed(() => {
  return [
    props.py,
    props.bgClass,
    '-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8'
  ].filter(Boolean).join(' ')
})
</script>
