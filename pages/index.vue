<script setup>
const router = useRouter()
const goToLogin = () => {
  router.push('/login');
};
</script>
<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Welcome to Cat Adoption</h1>
      <p class="text-lg text-gray-600 mb-8">Find your perfect feline friend today!</p>
      <button
        @click="goToLogin"
        class=" bg-background-card text-white py-3 px-6 rounded-lg transition-all"
      >
        Enter
      </button>
    </div>
  </div>
</template>




