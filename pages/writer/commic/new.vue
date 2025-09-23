<template>
  <ContentWrapper>
    <WorkForm
      v-model="form"
      :isSubmitting="isSubmitting"
      :errors="errors"
      :currentCoverUrl="''"
      @submit="handleSubmit"
      @file-error="handleFileError"
    />
  </ContentWrapper>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WorkForm from "~/components/WorkForm.vue";
import ContentWrapper from "~/components/ContentWrapper.vue";
import type { WorkFormType } from "~/types/work-form";

definePageMeta({ ssr: false });

const form = ref<WorkFormType>({
  coverImage: null,
  title: "",
  primaryCategory: "",
  secondaryCategory: "",
  description: "",
  synopsis: "",
  tags: [],
  contentWarnings: [],
  status: "published",
  allowComments: true,
  isCompleted: false,
});
let coverImageString: string | undefined = undefined;
const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);

function validate() {
  errors.value = {};
  if (!form.value.title.trim()) errors.value.title = "กรุณากรอกชื่อเรื่อง";
  if (!form.value.primaryCategory) errors.value.category = "กรุณาเลือกหมวดหมู่";
  if (!form.value.description.trim())
    errors.value.description = "กรุณากรอกคำโปรย";
  if (form.value.description.length > 200)
    errors.value.description = "คำโปรยต้องไม่เกิน 200 ตัวอักษร";
  if (!form.value.coverImage) errors.value.coverImage = "กรุณาเลือกรูปหน้าปก";
}

async function handleSubmit() {
  console.log("Submitting form:", form.value); // Debug log
  validate();
  if (Object.keys(errors.value).length > 0) return;
  isSubmitting.value = true;
  try {
    coverImageString = undefined;
    if (process.client && form.value.coverImage instanceof File) {
      coverImageString = await fileToBase64(form.value.coverImage);
    }
    let workStatus: "ongoing" | "completed" | "hiatus" = "ongoing";
    if (form.value.status === "hidden") workStatus = "hiatus";
    // alert ข้อมูลที่กรอก
    alert(
      "ข้อมูลที่กรอก:\n" +
        JSON.stringify(
          {
            ...form.value,
            coverImage: coverImageString,
            status: workStatus,
          },
          null,
          2
        )
    );
    // reset form
    Object.assign(form.value, {
      coverImage: null,
      title: "",
      category: "manga",
      description: "",
      synopsis: "",
      tags: [],
      contentWarnings: [],
      status: "published",
      allowComments: true,
    });
  } catch (e) {
    alert("เกิดข้อผิดพลาด");
  } finally {
    isSubmitting.value = false;
  }
}
function fileToBase64(file: File): Promise<string> {
  if (!process.client) throw new Error("fileToBase64 can only run on client");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function handleFileError(msg: string) {
  errors.value.coverImage = msg;
}
</script>
