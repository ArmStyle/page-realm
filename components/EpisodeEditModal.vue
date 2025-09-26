<template>
  <BaseModal
    :open="open"
    @close="handleClose"
    :title="isEdit ? 'แก้ไขตอน' : 'เพิ่มตอนใหม่'"
    size="2xl"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <BaseInput
        v-model="form.title"
        label="ชื่อตอน"
        :maxlength="120"
        required
        placeholder="กรอกชื่อตอน (ไม่เกิน 120 ตัวอักษร)"
      />

      <QuillEditor v-model="form.content" label="เนื้อหา" required />
      <BaseTextarea
        v-model="form.readerNote"
        label="ข้อความถึงนักอ่าน"
        :maxlength="200"
        placeholder="ข้อความถึงนักอ่าน (ไม่เกิน 200 ตัวอักษร)"
      />
      <div>
        <label class="block font-medium mb-1">สถานะ</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-1">
            <input type="radio" value="publish" v-model="form.status" />
            เผยแพร่ทันที
          </label>
          <label class="flex items-center gap-1">
            <input type="radio" value="hidden" v-model="form.status" /> ซ่อน
          </label>
          <label class="flex items-center gap-1">
            <input type="radio" value="schedule" v-model="form.status" />
            ตั้งเวลาเผยแพร่
          </label>
        </div>
        <div v-if="form.status === 'schedule'" class="mt-2">
          <BaseInput
            v-model="form.scheduledAt"
            type="datetime-local"
            label="เลือกวันและเวลาเผยแพร่"
            :min="minDateTime"
            required
          />
        </div>
      </div>
      <div>
        <label class="block font-medium mb-1">เหรียญ</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-1">
            <input type="radio" value="free" v-model="form.coinType" /> ฟรี
          </label>
          <label class="flex items-center gap-1">
            <input type="radio" value="coin" v-model="form.coinType" />
            กำหนดเหรียญ
          </label>
        </div>
        <div v-if="form.coinType === 'coin'" class="mt-2">
          <BaseInput
            v-model.number="form.coinAmount"
            type="number"
            min="1"
            label="จำนวนเหรียญที่ต้องใช้"
            required
          />
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <BaseButton variant="secondary" type="button" @click="handleClose"
          >ยกเลิก</BaseButton
        >
        <BaseButton variant="primary" type="submit">{{
          isEdit ? "บันทึก" : "เพิ่มตอน"
        }}</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineProps, defineEmits } from "vue";
import BaseModal from "~/components/BaseModal.vue";
import BaseInput from "~/components/BaseInput.vue";
import BaseTextarea from "~/components/BaseTextarea.vue";
import BaseButton from "~/components/BaseButton.vue";
import QuillEditor from "~/components/QuillEditor.vue";

const props = defineProps({
  open: Boolean,
  episode: Object,
  isEdit: Boolean,
});
const emit = defineEmits(["close", "save"]);

const now = new Date();
const pad = (n: number) => n.toString().padStart(2, "0");
const minDateTime = computed(() => {
  const y = now.getFullYear();
  const m = pad(now.getMonth() + 1);
  const d = pad(now.getDate());
  const h = pad(now.getHours());
  const min = pad(now.getMinutes());
  return `${y}-${m}-${d}T${h}:${min}`;
});

const defaultForm = {
  title: "",
  content: "",
  readerNote: "",
  status: "publish",
  scheduledAt: "",
  coinType: "free",
  coinAmount: 1,
};

const form = ref({ ...defaultForm });

watch(
  () => props.episode,
  (val) => {
    if (val) {
      form.value = { ...defaultForm, ...val };
    } else {
      form.value = { ...defaultForm };
    }
  },
  { immediate: true }
);

function handleClose() {
  emit("close");
}

function handleSubmit() {
  // Validate scheduledAt if status is schedule
  if (
    form.value.status === "schedule" &&
    form.value.scheduledAt <= minDateTime.value
  ) {
    alert("กรุณาเลือกวันและเวลาในอนาคต");
    return;
  }
  // Validate coin amount
  if (
    form.value.coinType === "coin" &&
    (!form.value.coinAmount || form.value.coinAmount < 1)
  ) {
    alert("กรุณากำหนดจำนวนเหรียญให้ถูกต้อง");
    return;
  }
  emit("save", { ...form.value });
  handleClose();
}
</script>
