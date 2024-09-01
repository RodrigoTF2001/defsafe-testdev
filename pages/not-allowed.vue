<script setup>
const router = useRouter()
const goToAdopt = () => {
  router.push('/adopt');
};
</script>
<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 class="text-4xl font-bold text-gray-800 mb-6 font-inter">403 Forbidden</h1>
        <p class="text-lg text-gray-600 mb-8 font-inter">You don't have permission to access this page.</p>
        <button
          @click="goToAdopt"
          class=" bg-background-card text-white py-3 px-6 rounded-lg transition-all"
        >
          Return
        </button>
      </div>
    </div>
  </template>
  




