<script setup lang="ts">
import { z } from "zod";
import catNames from "~/utils/catsNames";

const props = defineProps({
  showRegister: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const getRandomCatName = () => {
  const randomIndex = Math.floor(Math.random() * catNames.length);
  return catNames[randomIndex];
};

const setRandomCatName = () => {
  state.name = getRandomCatName();
};

const emitClose = () => {
  emit("close");
};

const schema = z.object({
  imageUrl: z.string().url("URL is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const state = reactive({
  imageUrl: "",
  name: "",
  description: "",
});

const isFormValid = computed(() => {
  const result = schema.safeParse(state);
  return result.success;
});

const handleSubmit = async () => {
  if (isFormValid.value) {
    await $fetch("/api/cat", {
      method: "POST",
      body: state,
    });
    window.location.reload()
  }
};
</script>

<template>
  <div
    v-if="showRegister"
    class="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-80"
  >
    <div class="bg-white p-8 rounded-lg w-1/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-text-primary">Register New Cat</h2>
        <button @click="emitClose" class="text-red-500">X</button>
      </div>
      <hr class="border-t-2 border-1 border-gray-300 mb-4" />
      <button
        @click="setRandomCatName"
        class="ml-2 text-white px-4 py-2 rounded"
      >
        <img
          class="text-main"
          style="width: 40px"
          src="../assets/images/cat--bold.svg"
          title="Nome pro gato"
        />
      </button>
      <UForm :schema="schema" :state="state">
        <UFormGroup class="mb-4" name="imageUrl">
          <label for="imageUrl" class="block text-main font-bold">Image</label>
          <UInput
            v-model="state.imageUrl"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            placeholder="Enter the URL of the image"
            name="imageUrl"
          />
        </UFormGroup>
        <UFormGroup class="mb-4" name="name">
          <label class="block text-main font-bold">Name</label>
          <div class="flex row-auto">
            <UInput
              v-model="state.name"
              :style="{ backgroundColor: 'white', color: 'gray' }"
              placeholder="Enter the cat's name"
              name="name"
              class="w-full"
            />
          </div>
        </UFormGroup>
        <UFormGroup class="mb-4" name="description">
          <label class="block text-main font-bold">Description</label>
          <UTextarea
            v-model="state.description"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            placeholder="Write here..."
            name="description"
          />
        </UFormGroup>

        <div class="flex justify-end mt-6">
          <button
            type="button"
            @click="emitClose"
            class="bg-cancel-button mr-4 text-text-secondary px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            :class="{
              'opacity-50': !isFormValid,
            }"
            @click="handleSubmit"
            class="bg-background-card text-white px-4 py-2 rounded"
            :disabled="!isFormValid"
          >
            Save
          </button>
        </div>
      </UForm>
    </div>
  </div>
</template>
