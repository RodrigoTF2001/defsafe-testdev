<template>
  <div
    v-if="showSubmmited"
    class="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-80"
  >
    <div class="bg-white p-8 rounded-lg w-full max-w-md mx-4 sm:mx-auto sm:max-w-lg">
      <div class="flex flex-col items-center mb-6">
        <div class="relative rounded-lg">
          <div class="absolute inset-0 bg-green-300 opacity-20"></div>
          <img class="w-10" src="../assets/images/el--ok.svg" alt="ok" />
        </div>
        <h2 class="text-xl font-bold text-text-primary mt-4">
          Application Submitted!
        </h2>
      </div>

      <p class="text-center text-text-secondary">
        Thank you for submitting your adoption application! Our team will
        review your application and get back to you shortly.
      </p>

      <div class="flex justify-center mt-8">
        <button
          type="button"
          @click="emitClose"
          class="bg-cancel-button text-text-secondary px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showSubmmited: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const emitClose = () => {
  window.location.reload()
};
</script>
