<script setup>
const showModalRegister = ref(false);
const showModalDelete = ref(false);
const showModalUpdate = ref(false);
const selectedCatData = ref({});
const selectedCatId = ref(null);
const catItems = ref([]);

const { data, pending } = await useFetch("/api/cat", {
  method: "GET",
});
catItems.value = data.value;

const openModalRegister = () => {
  showModalRegister.value = true;
};

const openModalDelete = (catId) => {
  selectedCatId.value = catId;
  showModalDelete.value = true;
};

const openModalUpdate = (catId) => {
  selectedCatId.value = catId;
  selectedCatData.value = catItems.value.find((cat) => cat.id === catId);
  showModalUpdate.value = true;
};

const closeModal = () => {
  showModalRegister.value = false;
  showModalDelete.value = false;
  showModalUpdate.value = false;
};
</script>

<template>
  <div v-if="pending" class="text-center">
    <p>Loading...</p>
  </div>
  <div v-else class="w-full p-4 sm:w-3/4 sm:p-8 mx-auto mt-8">
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
      <h2
        class="text-xl sm:text-2xl font-bold text-text-primary font-inter mb-4 sm:mb-0"
      >
        Cat List
      </h2>
      <button
        @click="openModalRegister"
        class="bg-background-card text-white px-4 py-2 rounded font-inter"
      >
        New Cat
      </button>
    </div>

    <!-- Tabela padrão para dispositivos maiores -->
    <div class="hidden sm:block">
      <table class="w-full border-collapse table-auto">
        <thead>
          <tr class="bg-white text-left">
            <th class="border-b-2 p-3 sm:p-7 font-inter text-main">Image</th>
            <th class="border-b-2 p-3 font-inter text-main">Name</th>
            <th class="border-b-2 p-3 sm:p-4 font-inter text-main">
              Description
            </th>
            <th class="border-b-2 p-3 sm:p-8 font-inter text-main">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="cat in catItems" :key="cat.id">
            <td class="border-b p-2 sm:p-4 justify-center">
              <img
                :src="cat.imageUrl"
                :alt="cat.name"
                class="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full text-text-secondary"
              />
            </td>
            <td class="border-b p-2 sm:p-4 font-inter text-text-secondary">
              {{ cat.name }}
            </td>
            <td class="border-b p-2 sm:p-4 font-inter text-text-secondary">
              {{ cat.description }}
            </td>
            <td class="border-b p-2 sm:p-4 font-inter text-text-secondary">
              <button
                class="relative px-2 py-1 rounded mr-1 overflow-hidden"
                @click="openModalUpdate(cat.id)"
              >
                <div class="absolute inset-0 bg-purple-500 opacity-20"></div>
                <img
                  class="w-5 sm:w-7 z-20"
                  src="../assets/images/edit.svg"
                  alt="editar"
                />
              </button>
              <button
                class="relative px-2 py-1 rounded mr-1 overflow-hidden"
                @click="openModalDelete(cat.id)"
              >
                <div class="absolute inset-0 bg-red-500 opacity-20"></div>
                <img
                  class="w-5 sm:w-7 z-20"
                  src="../assets/images/trash.svg"
                  alt="excluir"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block sm:hidden">
      <div
        v-for="cat in catItems"
        :key="cat.id"
        class="mb-4 border p-4 rounded bg-white"
      >
        <div>
          <img
            :src="cat.imageUrl"
            :alt="cat.name"
            class="w-16 h-16 object-cover rounded-full text-text-secondary mr-4"
          />
          <div class="mb-6">
            <h3 class="text-lg font-bold text-text-primary mb-1">
              {{ cat.name }}
            </h3>
            <p class="text-text-secondary">{{ cat.description }}</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button
            class="relative px-2 py-1 rounded overflow-hidde text-white"
            @click="openModalUpdate(cat.id)"
          >
          <div class="absolute inset-0 bg-purple-500 opacity-20"></div>
            <img class="w-5" src="../assets/images/edit.svg" alt="editar" />
          </button>
          <button
            class="relative px-2 py-1 rounded overflow-hidde text-white "
            @click="openModalDelete(cat.id)"
          >
          <div class="absolute inset-0 bg-red-500 opacity-20 rounded-sm"></div>
            <img class="w-5" src="../assets/images/trash.svg" alt="excluir" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ModalCatRegister :showRegister="showModalRegister" @close="closeModal" />
    <ModalCatDelete
      :showDelete="showModalDelete"
      :catId="selectedCatId ?? 0"
      @close="closeModal"
    />
    <ModalCatUpdate
      :showUpdate="showModalUpdate"
      :cat="selectedCatData"
      :catId="selectedCatId ?? 0"
      @close="closeModal"
    />
  </div>
</template>
