<template>
  <WriterLayout>
    <ContentWrapper>
      <Breadcrumb
        title="สร้างนิยายเรื่องใหม่"
        :back-label="'กลับหน้ารายการ'"
        :current="'สร้างนิยายเรื่องใหม่'"
        @back="goBack"
      />
      <WorkForm type="novel" @success="onSuccess" @error="onError" />
    </ContentWrapper>
  </WriterLayout>
</template>

<script setup lang="ts">
const router = useRouter();
function onSuccess(data: any) {
  // handle success (optional)
}
function onError(msg: string) {
  // handle error (optional)
}
function goBack() {
  router.push("/writer/novel");
}
</script>
