<template>
  <div class="space-y-8 container !max-w-[1000px] mx-auto">
    <ClientOnly>
      <!-- Cover Image & Basic Information -->
      <Card>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Cover Image (Left) -->
          <div class="lg:col-span-4">
            <FileUpload
              v-model="form.coverImage"
              label="รูปหน้าปก"
              required
              :error="errors.coverImage"
              help="อัปโหลดรูปหน้าปกสำหรับผลงาน (ขนาด 3:4 ไม่เกิน 2MB)"
              @error="handleFileError"
              :initial-url="currentCoverUrl"
            />
          </div>

          <!-- Basic Information (Right) -->
          <div class="lg:col-span-8">
            <h2
              class="text-xl font-semibold mb-6"
              style="color: var(--color-heading)"
            >
              ข้อมูลพื้นฐาน
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Title -->
              <div class="md:col-span-2">
                <BaseInput
                  v-model="form.title"
                  label="ชื่อเรื่อง"
                  placeholder="ใส่ชื่อเรื่อง..."
                  required
                  :maxlength="120"
                  :error="errors.title"
                  :show-counter="true"
                />
              </div>

              <!-- Category: Primary -->
              <div>
                <BaseSelect
                  v-model="form.primaryCategory"
                  label="หมวดหมู่หลัก"
                  :options="categoryOptions"
                  placeholder="เลือกหมวดหมู่หลัก"
                  required
                  :error="errors.primaryCategory"
                />
              </div>
              <!-- Category: Secondary -->
              <div>
                <BaseSelect
                  v-model="form.secondaryCategory"
                  label="หมวดหมู่รอง"
                  :options="secondaryCategoryOptions"
                  placeholder="เลือกหมวดหมู่รอง"
                  :error="errors.secondaryCategory"
                  :disabled="!form.primaryCategory"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Short Description -->
        <div class="mt-6">
          <BaseTextarea
            v-model="form.description"
            id="description"
            label="คำโปรย"
            :maxlength="200"
            placeholder="เขียนคำโปรยสั้นๆ..."
            required
            :error="errors.description"
            class="w-full"
            showCounter
          />
        </div>
        <QuillEditor
          v-model="form.synopsis"
          label="เรื่องย่อ"
          placeholder="เขียนเรื่องย่อโดยละเอียด..."
          required
          :error="errors.synopsis"
          help="เขียนเรื่องย่อที่น่าสนใจเพื่อดึงดูดผู้อ่าน"
        />
      </Card>

      <!-- Tags and Content Warnings -->
      <Card>
        <h2
          class="text-xl font-semibold mb-6"
          style="color: var(--color-heading)"
        >
          แท็กและคำเตือน
        </h2>

        <div class="space-y-6">
          <!-- Tags -->
          <TagInput
            v-model="form.tags"
            label="แท็ก"
            placeholder="เพิ่มแท็ก... (กด Enter หรือ Space  เพื่อเพิ่ม)"
            :max-tags="40"
            :max-tag-length="30"
            :error="errors.tags"
          />

          <!-- Content Warnings -->
          <TagInput
            v-model="form.contentWarnings"
            label="คำเตือนเนื้อหา"
            placeholder="เพิ่มคำเตือนเนื้อหา... (กด Enter หรือ Space  เพื่อเพิ่ม)"
            :max-tags="10"
            :max-tag-length="30"
            :error="errors.contentWarnings"
          />
        </div>
      </Card>

      <!-- Settings -->
      <Card>
        <h2
          class="text-xl font-semibold mb-6"
          style="color: var(--color-heading)"
        >
          การตั้งค่า
        </h2>

        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300"
        >
          <!-- Status -->
          <div>
            <label class="block text-sm font-medium mb-3"> สถานะ </label>
            <div class="space-y-2 flex items-center gap-4">
              <div>
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="published"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span class="ml-2 text-sm">เผยแพร่ทันที</span>
                </label>
              </div>
              <div class="!mt-0">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="form.status"
                    type="radio"
                    value="hidden"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span class="ml-2 text-sm">ซ่อน</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <ToggleSwitch
          class="mt-4"
          v-model="form.isCompleted"
          label="จบแล้ว"
          :description="form.isCompleted ? 'จบสมบูรณ์แล้ว' : 'ยังไม่จบ'"
          :error="errors.isCompleted"
        />
        <ToggleSwitch
          class="mt-4"
          v-model="form.allowComments"
          label="แสดงความคิดเห็น"
          description="อนุญาตให้ผู้อ่านแสดงความคิดเห็นในผลงานนี้"
          :error="errors.allowComments"
        />
      </Card>

      <!-- Submit Buttons -->
      <div class="flex justify-end gap-4">
        <slot name="cancel-button">
          <NuxtLink
            to="/writer"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </NuxtLink>
        </slot>

        <form>
          <BaseButton
            :disabled="isSubmitting"
            :loading="isSubmitting"
            @click="handleSubmit"
          >
            บันทึก
          </BaseButton>
        </form>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import type { WorkFormType } from "~/types/work-form";

interface Props {
  type: "novel" | "comic";
  isEditMode?: boolean;
  currentCoverUrl?: string;
  modelValue?: WorkFormType;
}

const props = withDefaults(defineProps<Props>(), {
  isEditMode: false,
  currentCoverUrl: "",
  modelValue: undefined,
});

const emit = defineEmits<{
  success: [value: WorkFormType];
  error: [message: string];
  "update:modelValue": [value: WorkFormType];
}>();

const defaultCategory = computed(() =>
  props.type === "novel" ? "novel" : "manga"
);

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
  allowComments: false,
  isCompleted: false,
});

// Sync modelValue (edit mode)
watch(
  () => props.modelValue,
  (val) => {
    if (val) form.value = { ...val };
  },
  { immediate: true, deep: true }
);
// Emit update:modelValue on change
watch(
  form,
  (val, oldVal) => {
    // emit เฉพาะเมื่อค่าจริงๆ เปลี่ยน
    if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
      emit("update:modelValue", { ...val });
    }
  },
  { deep: true }
);

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);

function validate() {
  errors.value = {};
  if (!form.value.title.trim()) errors.value.title = "กรุณากรอกชื่อเรื่อง";
  if (!form.value.primaryCategory)
    errors.value.primaryCategory = "กรุณาเลือกหมวดหมู่";
  if (!form.value.description.trim())
    errors.value.description = "กรุณากรอกคำโปรย";
  if (form.value.description.length > 200)
    errors.value.description = "คำโปรยต้องไม่เกิน 200 ตัวอักษร";
  if (!form.value.coverImage && !props.currentCoverUrl)
    errors.value.coverImage = "กรุณาเลือกรูปหน้าปก";
}

async function handleSubmit() {
  console.log("Submitting form:", form.value);
  validate();
  if (Object.keys(errors.value).length > 0) return;
  isSubmitting.value = true;
  try {
    let coverImageString: string | undefined = undefined;
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
            coverImage: coverImageString || props.currentCoverUrl,
            category: defaultCategory.value,
            status: workStatus,
          },
          null,
          2
        )
    );
    emit("success", { ...form.value });
    emit("update:modelValue", { ...form.value });
    if (!props.isEditMode) {
      // reset form only if not edit mode
      Object.assign(form.value, {
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
    }
  } catch (e) {
    emit("error", "เกิดข้อผิดพลาด");
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
const handleFileError = (msg: string) => {
  errors.value.coverImage = msg;
};

// Category options
const categoryOptions = [
  { value: "romantic", text: "รักโรแมนติก" },
  { value: "drama", text: "ดราม่า" },
  { value: "comedy", text: "ตลก,คอมเมดี้" },
  { value: "fantasy", text: "แฟนตาซี" },
  { value: "online-game", text: "เกมออนไลน์" },
  { value: "martial", text: "กำลังภายใน" },
  { value: "action", text: "แอคชั่น" },
  { value: "adventure", text: "ผจญภัย" },
  { value: "sci-fi", text: "อดีต,อนาคต" },
  { value: "historical", text: "โบราณ,ย้อนยุค" },
  { value: "science", text: "ไซไฟ,วิทยาศาสตร์" },
  { value: "mystery", text: "ระทึกขวัญ" },
  { value: "detective", text: "สืบสวน" },
  { value: "slice-of-life", text: "สะท้อนชีวิต" },
  { value: "fanfic", text: "แฟนฟิค (FanFiction)" },
  { value: "yaoi", text: "วาย (Yaoi)" },
  { value: "yuri", text: "ยูริ (Yuri)" },
  { value: "harem", text: "ฮาเร็ม" },
  { value: "isekai", text: "ต่างโลก" },
  { value: "school-life", text: "ชีวิตในโรงเรียน" },
  { value: "reborn", text: "เกิดใหม่" },
  { value: "system", text: "ระบบ" },
];

// Prevent duplicate selection
const secondaryCategoryOptions = computed(() => {
  return categoryOptions.filter(
    (opt) => opt.value !== form.value.primaryCategory
  );
});
</script>
