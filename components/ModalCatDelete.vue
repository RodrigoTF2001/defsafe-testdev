<script setup>

const { $toast } = useNuxtApp();

const props = defineProps({
  showDelete: {
    type: Boolean,
    required: true,
  },
  catId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const emitClose = () => {
  emit("close");
};
const handleDelete = async () => {
  try {
    await $fetch('/api/cat', {
      method: 'DELETE',
      body: { id: props.catId }
    });
    $toast.success('Cat register deleted with success!')
    window.location.reload()
  } catch (error) {
    console.error('Failed to delete the cat:', error);
  }
}
</script>

<template>
  <div
    v-if="showDelete"
    class="fixed inset-0 flex items-center justify-center bg-slate-300 bg-opacity-80"
  >
    <div class="bg-white p-6 rounded-lg max-w-64">
      <div class="flex flex-col items-center mb-4">
        <div class="relative rounded">
          <div class="absolute inset-0 bg-red-500 opacity-20"></div>
          <img class="w-8" src="../assets/images/trash.svg" alt="excluir" />
        </div>
        <h2 class="text-lg font-bold text-text-primary mt-4">Are You Sure?</h2>
      </div>

      <p class="text-center text-text-secondary">
        Are you sure you want to delete this cat profile? This action cannot be
        undone.
      </p>

      <div class="flex justify-center mt-6">
        <button
          type="button"
          @click="emitClose"
          class="bg-cancel-button text-text-secondary px-4 py-2 rounded mr-4"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          class="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
