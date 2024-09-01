<script setup>
const showModalAdopt = ref(false);
const selectedCatId = ref(0);

const openModal = (catId) => {
  showModalAdopt.value = true;
  selectedCatId.value = catId;
};

const closeModal = () => {
  showModalAdopt.value = false;
};

const catItems = ref([]);

const { data, pending } = await useFetch("/api/cat", { method: "GET" });

catItems.value = data.value;

const router = useRouter();
const logout = async () => {
  const supaAuth = useSupabaseClient();
  const { error } = await supaAuth.auth.signOut();
  router.push("/login");
};
</script>

<template>
  <UContainer>
    <div class="flex items-center mt-6 mb-4">
      <img
        class="text-main"
        style="width: 40px"
        src="../assets/images/ph--cat.svg"
      />
      <div>
        <h5 class="text-lg font-bold text-main font-inter ml-2">
          Cat Adoption Platform
        </h5>
      </div>
      <button
        @click="logout"
        class="bg-red-600 justify-end text-white px-4 py-2 rounded ml-14"
      >
        Exit
      </button>
    </div>
    <hr class="border-t-2 border-1 border-gray-300 mb-4" />
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4 text-main">Cats for Adoption</h2>

      <p class="mb-4 text-text-secondary">
        Explore our list of lovable cats looking for their forever homes.
      </p>
      <div v-if="pending" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="cat in catItems"
          :key="cat.id"
          class="border p-4 rounded-lg w-72"
        >
          <img
            :src="cat.imageUrl"
            :alt="cat.name"
            class="w-full h-44 object-cover rounded-lg mb-2"
          />
          <h3 class="text-xl font-bold text-text-primary">{{ cat.name }}</h3>
          <p class="text-text-secondary">{{ cat.description }}</p>
          <button
            @click="openModal(cat.id)"
            :disabled="cat.adoptions.some((adoption) => adoption.isAgree)"
            class="bg-background-card px-4 py-2 rounded mt-2 w-60"
            :class="{
              'opacity-50 ': cat.adoptions.some((adoption) => adoption.isAgree),
            }"
          >
            Adopt
          </button>
        </div>
        <ModalAdopt
          :show="showModalAdopt"
          @close="closeModal"
          :catId="selectedCatId"
        />
      </div>
    </div>
  </UContainer>
</template>
