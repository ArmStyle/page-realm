<template>
  <WriterLayout>
    <ContentWrapper>
      <WorkForm type="comic" @success="onSuccess" @error="onError" />
    </ContentWrapper>
  </WriterLayout>
</template>

<script setup lang="ts">
import WorkForm from '~/components/WorkForm.vue';

function onSuccess(data: any) {
  // handle success (optional)
}
function onError(msg: string) {
  // handle error (optional)
}
</script>
