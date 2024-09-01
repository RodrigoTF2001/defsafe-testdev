<script setup>
import { z } from "zod";
const isSubmmitedOpen = ref(false);

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  catId: {
    type: Number,
    required: true,
  },
});

const openModalSubmmited = () => {
  isSubmmitedOpen.value = true;
};

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};

const schema = z.object({
  fullName: z
    .string()
    .min(1, "Name is required")
    .refine((value) => value.trim().split(" ").length >= 2, {
      message: "Full name must contain at least two words",
    })
    .refine(
      (value) =>
        value
          .trim()
          .split(" ")
          .every((word) => word.length >= 2),
      {
        message:
          "Each word in the full name must be at least 2 characters long",
      }
    ),
  email: z.string().email("Invalid email address"),
  description: z.string().min(1, "Description is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  isAgree: z
    .boolean()
    .refine((val) => val === true, "You must agree to take care of this cat"),
});

const state = reactive({
  fullName: undefined,
  email: undefined,
  description: undefined,
  phone: undefined,
  isAgree: false,
  catId: computed(() => props.catId), 
});

const isFormValid = computed(() => {
  const result = schema.safeParse(state);
  return result.success;
});

const handleSubmit = async () => {
  if (isFormValid.value) {
    await $fetch("/api/adopt", {
      method: "POST",
      body: state,
    });
    openModalSubmmited();
  }
};
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-80"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-md mx-4 sm:mx-auto sm:max-w-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-text-primary">Adoption Form</h2>
        <button @click="emitClose" class="text-danger">X</button>
      </div>
      <hr class="border-t-2 border-gray-300 mb-4" />
      <UForm :state="state" :schema="schema">
        <UFormGroup class="mb-4" name="fullName">
          <label class="block text-main font-bold">Full Name</label>
          <UInput
            v-model="state.fullName"
            type="text"
            placeholder="Enter your full name"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            class="w-full p-2 rounded"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" name="email">
          <label class="block text-main font-bold">Email</label>
          <UInput
            type="email"
            v-model="state.email"
            placeholder="Enter your email"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            class="w-full p-2 rounded"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" name="phone">
          <label class="block text-main font-bold">Telephone</label>
          <UInput
            v-model="state.phone"
            placeholder="Enter your telephone"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            class="w-full p-2 rounded"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" name="description">
          <label class="block text-main font-bold">
            Why would you want to adopt this cat?
          </label>
          <UTextarea
            v-model="state.description"
            placeholder="Write here..."
            :style="{ backgroundColor: 'white', color: 'gray' }"
            class="w-full p-2 rounded"
          ></UTextarea>
        </UFormGroup>
        <UFormGroup name="isAgree">
          <div class="flex items-center">
            <UCheckbox
              v-model="state.isAgree"
              :style="{ backgroundColor: 'gray' }"
            />
            <label for="agree" class="text-main font-bold ml-2">
              I agree to take care of this cat
            </label>
          </div>
        </UFormGroup>

        <div class="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            @click="emitClose"
            class="bg-cancel-button text-text-secondary px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            class="bg-background-card text-white px-4 py-2 rounded"
            @click="handleSubmit"
          >
            Submit Application
          </button>
        </div>
      </UForm>
    </div>
  </div>
  <ApplicationSubmited :showSubmmited="isSubmmitedOpen" />
</template>
