<template>
  <ContentWrapper>
    <WorkForm type="novel" @success="onSuccess" @error="onError" />
  </ContentWrapper>
</template>

<script setup lang="ts">
import WorkForm from '~/components/WorkForm.vue';
import ContentWrapper from '~/components/ContentWrapper.vue';

function onSuccess(data: any) {
  // handle success (optional)
}
function onError(msg: string) {
  // handle error (optional)
}
</script>
