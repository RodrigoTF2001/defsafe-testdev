<script setup>
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
    <div class="bg-white p-8 rounded-lg w-1/6">
      <div class="flex flex-col items-center mb-6">
        <img class="w-10" src="../assets/images/trash.svg" alt="excluir" />
        <h2 class="text-xl font-bold text-text-primary">Are You Sure?</h2>
      </div>

      <p class="text-center">
        Are you sure want to delete this cat profile? This action cannot be
        undone.
      </p>

      <div class="flex justify-center mt-8">
        <button
          type="button"
          @click="emitClose"
          class="bg-cancel-button mr-4 text-text-secondary px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button @click="handleDelete" class="bg-red-600 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

