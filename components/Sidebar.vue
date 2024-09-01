<script setup lang="ts">

const router = useRouter();
const logout = async() =>{
  const supaAuth = useSupabaseClient();
  const { error} = await supaAuth.auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="w-80 text-white p-4 bg-white">
    <div class="flex items-center mb-4">
      <img class="text-main" style="width: 40px;" src="../assets/images/ph--cat.svg" />
      <h5 class="text-base font-bold text-main font-inter ml-2">
        Cat Adoption Platform
      </h5>
    </div>
    <hr class="border-t-2 border-1 border-gray-300 mb-4">
    <ul>
      <li class="mt-20 mb-5">
        <a href="#" class="text-placeholder font-bold font-inter">MAIN MENU</a>
      </li>
      <div class="flex items-center">
        <img class="text-main" style="width: 40px;" src="../assets/images/cat--bold.svg" />
        <li><a href="#" class="text-main font-inter font-bold ml-5">Cat List</a></li>
      </div>
      <button @click="logout" class="bg-red-600 text-white px-4 py-2 rounded mt-14">
        Exit
      </button>
    </ul>
  </div>
</template>


