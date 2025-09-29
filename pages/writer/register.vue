<template>
  <WriterLayout>
    <ContentWrapper>
      <!-- ส่วนที่ 1: ข้อมูลส่วนตัว -->
      <Card>
        <h2 class="text-lg font-bold mb-2">สำนาบัตรประชาชน</h2>
        <p class="text-sm text-gray-500 mb-4">
          สามารถอัปโหลดที่เห็นรายละเอียดตัวอักษรและรูปภาพได้ชัดเจน
          ขนาดรูปไม่เกิน 2 MB
          <span class="text-red-500">(กรุณาเซ็นสำเนาถูกต้องกำกับ)</span>
        </p>
        <div
          class="border-2 border-dashed border-primary/60 rounded-lg flex flex-col items-center justify-center py-8 mb-4 cursor-pointer"
          @click="triggerIdCardInput"
        >
          <Icon :icon="'mdi:upload'" class="h-8 w-8 text-primary mb-2" />
          <input
            type="file"
            class="hidden"
            @change="onFileChange('idCard', $event)"
            ref="idCardInputRef"
          />
          <span class="text-primary text-sm"
            >เลือกไฟล์ หรือ ลากไฟล์มาวาง</span
          >
          <div v-if="errors.idCardFile" class="text-red-500 text-xs mt-2">
            {{ errors.idCardFile }}
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <BaseInput
            label="ชื่อ-นามสกุล"
            v-model="form.fullName"
            :error="errors.fullName"
          />
          <BaseInput
            label="เบอร์โทรศัพท์"
            v-model="form.phone"
            :error="errors.phone"
          />
          <BaseInput
            label="เลขบัตรประจำตัวประชาชน"
            v-model="form.idCardNumber"
            :error="errors.idCardNumber"
          />
          <BaseTextarea
            label="ที่อยู่ตามบัตรประจำตัวประชาชน"
            v-model="form.idCardAddress"
            :error="errors.idCardAddress"
          />
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                v-model="form.sameAddress"
                class="form-checkbox mr-2"
              />
              ใช้ที่อยู่ตามบัตรประชาชน
            </label>
          </div>
          <BaseTextarea
            label="ที่อยู่สำหรับจัดส่งเอกสาร"
            v-model="form.documentAddress"
            :disabled="form.sameAddress"
            :error="errors.documentAddress"
          />
        </div>
        <div class="divider my-6">
          <div class="flex-1 border-t border-gray-300"></div>
        </div>
        <!-- ส่วนที่ 2: สมุดบัญชี -->
        <h2 class="text-lg font-bold mb-2">หน้าสมุดบัญชี</h2>
        <p class="text-sm text-gray-500 mb-4">
          สามารถอัปโหลดที่เห็นรายละเอียดหน้าที่มีเลขบัญชีและชื่อบัญชีชัดเจน
          ขนาดรูปไม่เกิน 2 MB
        </p>
        <div
          class="border-2 border-dashed border-primary/60 rounded-lg flex flex-col items-center justify-center py-8 mb-4 cursor-pointer"
          @click="triggerBankBookInput"
        >
          <Icon :icon="'mdi:upload'" class="h-8 w-8 text-primary mb-2" />
          <input
            type="file"
            class="hidden"
            @change="onFileChange('bankBook', $event)"
            ref="bankBookInputRef"
          />
          <span class="text-primary text-sm"
            >เลือกไฟล์ หรือ ลากไฟล์มาวาง</span
          >
          <div v-if="errors.bankBookFile" class="text-red-500 text-xs mt-2">
            {{ errors.bankBookFile }}
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            label="ธนาคาร"
            v-model="form.bank"
            :options="bankOptions"
            :error="errors.bank"
          />
          <BaseInput
            label="ประเภทบัญชี"
            v-model="form.bankType"
            :error="errors.bankType"
          />
          <BaseInput
            label="ชื่อสาขา"
            v-model="form.branchName"
            :error="errors.branchName"
          />
          <BaseInput
            label="รหัสสาขา"
            v-model="form.branchCode"
            :error="errors.branchCode"
          />
          <BaseInput
            label="หมายเลขบัญชี"
            v-model="form.accountNumber"
            :error="errors.accountNumber"
          />
          <BaseInput
            label="ชื่อเจ้าของบัญชี"
            v-model="form.accountName"
            :error="errors.accountName"
          />
        </div>
        <div class="flex items-center mt-4">
          <input
            type="checkbox"
            v-model="form.acceptTerms"
            class="form-checkbox mr-2"
          />
          <span
            >ข้าพเจ้าพึงใจและยอมรับ
            <a href="#" class="text-primary underline">เงื่อนไขการใช้งาน</a>
            ในการลงทะเบียน</span
          >
        </div>
        <div v-if="errors.acceptTerms" class="text-red-500 text-xs mt-2">
          {{ errors.acceptTerms }}
        </div>
        <div class="flex justify-end mt-6">
          <BaseButton
            color="primary"
            :disabled="!form.acceptTerms"
            @click="submit"
            >บันทึก</BaseButton
          >
        </div>
      </Card>
    </ContentWrapper>
  </WriterLayout>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { Icon } from "@iconify/vue";

const idCardInputRef = ref<HTMLInputElement | null>(null);
const bankBookInputRef = ref<HTMLInputElement | null>(null);

function triggerIdCardInput() {
  idCardInputRef.value?.click();
}
function triggerBankBookInput() {
  bankBookInputRef.value?.click();
}

const form = reactive({
  // ส่วนที่ 1
  fullName: "",
  phone: "",
  idCardNumber: "",
  idCardAddress: "",
  sameAddress: false,
  documentAddress: "",
  idCardFile: null as File | null,
  // ส่วนที่ 2
  bank: "",
  bankType: "",
  branchName: "",
  branchCode: "",
  accountNumber: "",
  accountName: "",
  bankBookFile: null as File | null,
  acceptTerms: false,
});

type ErrorFields = typeof form;
const errors: Record<keyof ErrorFields, string> = reactive({
  fullName: "",
  phone: "",
  idCardNumber: "",
  idCardAddress: "",
  sameAddress: "", // ไม่ต้อง validate จริง
  documentAddress: "",
  idCardFile: "",
  bank: "",
  bankType: "",
  branchName: "",
  branchCode: "",
  accountNumber: "",
  accountName: "",
  bankBookFile: "",
  acceptTerms: "",
});

const bankOptions = [
  { label: "โปรดระบุ", value: "" },
  { label: "กสิกรไทย", value: "kbank" },
  { label: "ไทยพาณิชย์", value: "scb" },
  { label: "กรุงเทพ", value: "bbl" },
  { label: "กรุงไทย", value: "ktb" },
  { label: "กรุงศรีอยุธยา", value: "bay" },
  { label: "ทหารไทยธนชาต", value: "ttb" },
  { label: "ออมสิน", value: "gsb" },
  { label: "อื่นๆ", value: "other" },
];

function onFileChange(type: "idCard" | "bankBook", event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files || !files[0]) return;
  if (type === "idCard") form.idCardFile = files[0];
  else form.bankBookFile = files[0];
}

watch(
  () => form.sameAddress,
  (val) => {
    if (val) form.documentAddress = form.idCardAddress;
  }
);

function validate() {
  let valid = true;
  // reset
  (Object.keys(errors) as (keyof typeof errors)[]).forEach(
    (k) => (errors[k] = "")
  );

  if (!form.fullName) {
    errors.fullName = "กรุณากรอกชื่อ-นามสกุล";
    valid = false;
  }
  if (!form.phone) {
    errors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    valid = false;
  } else if (!/^0[0-9]{9}$/.test(form.phone)) {
    errors.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง";
    valid = false;
  }
  if (!form.idCardNumber) {
    errors.idCardNumber = "กรุณากรอกเลขบัตรประชาชน";
    valid = false;
  } else if (!/^\d{13}$/.test(form.idCardNumber)) {
    errors.idCardNumber = "เลขบัตรประชาชนไม่ถูกต้อง";
    valid = false;
  }
  if (!form.idCardAddress) {
    errors.idCardAddress = "กรุณากรอกที่อยู่ตามบัตร";
    valid = false;
  }
  if (!form.sameAddress && !form.documentAddress) {
    errors.documentAddress = "กรุณากรอกที่อยู่สำหรับจัดส่งเอกสาร";
    valid = false;
  }
  if (!form.idCardFile) {
    errors.idCardFile = "กรุณาอัปโหลดไฟล์บัตรประชาชน";
    valid = false;
  }
  if (!form.bank) {
    errors.bank = "กรุณาเลือกธนาคาร";
    valid = false;
  }
  if (!form.bankType) {
    errors.bankType = "กรุณากรอกประเภทบัญชี";
    valid = false;
  }
  if (!form.branchName) {
    errors.branchName = "กรุณากรอกชื่อสาขา";
    valid = false;
  }
  if (!form.branchCode) {
    errors.branchCode = "กรุณากรอกรหัสสาขา";
    valid = false;
  }
  if (!form.accountNumber) {
    errors.accountNumber = "กรุณากรอกหมายเลขบัญชี";
    valid = false;
  }
  if (!form.accountName) {
    errors.accountName = "กรุณากรอกชื่อเจ้าของบัญชี";
    valid = false;
  }
  if (!form.bankBookFile) {
    errors.bankBookFile = "กรุณาอัปโหลดไฟล์สมุดบัญชี";
    valid = false;
  }
  if (!form.acceptTerms) {
    errors.acceptTerms = "กรุณายอมรับเงื่อนไขการใช้งาน";
    valid = false;
  }
  return valid;
}

function submit() {
  if (!validate()) return;
  // TODO: ส่งข้อมูลไป backend
  alert("ส่งข้อมูลเรียบร้อย");
}
</script>

<style scoped></style>
