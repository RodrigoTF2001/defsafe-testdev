<script setup lang="ts">
import { z } from "zod";

const supaAuth = useSupabaseClient();
const config = useRuntimeConfig();
const router = useRouter();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  email: "" as string,
  password: "" as string,
});

const handleSubmit = async () => {
  const adminEmail = config.public.admin_email;

  const encode = (text: string): string => {
    return btoa(text); // Codifica em Base64
  };

  const { data: authData, error: authError } =
    await supaAuth.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

  if (authError) {
    console.error("Error signing in:", authError.message);
    return;
  }

  // Get user data
  const { data: user, error: userError } = await supaAuth.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return;
  }

  if (authData.user && user) {
    const userEmail = user.user.email as string;
    if (userEmail !== adminEmail) {
      router.push("/adopt");
    } else{
      router.push("/admin-panel")
    }
  }
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div
      class="bg-main text-white p-6 lg:p-8 flex flex-col items-center justify-center mr-40 rounded-xl h-full lg:h-5/6"
      style="
        margin-bottom: 0;
        padding-bottom: 0;
        min-height: 750px;
        width: 650px;
        overflow: hidden;
      "
    >
      <h1
        style="width: 350px"
        class="text-9xl text-center lg:text-4xl font-bold mb-4 font-inter"
      >
        Welcome to the Cat Adoption Panel
      </h1>
      <img
        src="../assets/images/Cat.png"
        alt="Cat Image"
        style="width: 1400px; height: 800px; margin-bottom: -190px"
      />
    </div>

    <div class="p-8 lg:p-16 flex flex-col lg:w-1/3 w-80">
      <div class="flex items-center mb-8">
        <img
          class="text-main"
          style="width: 50px"
          src="../assets/images/ph--cat.svg"
        />
        <h5 class="text-base font-bold text-main font-inter ml-2">
          Cat Adoption Platform
        </h5>
      </div>
      <hr class="border-t-2 border-1 border-gray-300 mb-8" />
      <h4 class="text-xl font-bold mb-4 font-inter text-text-primary">Login</h4>
      <UForm :schema="schema" :state="state" class="space-y-4">
        <UFormGroup class="block text-sm font-bold text-main" name="email">
          <label for="email" class="text-sm font-bold font-inter text-main"
            >Email</label
          >
          <UInput
            v-model="state.email"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            placeholder="Enter the user name"
          />
        </UFormGroup>

        <UFormGroup name="password">
          <label for="password" class="text-sm font-bold font-inter text-main"
            >Password</label
          >
          <UInput
            class="text-sm font-bold text-main"
            v-model="state.password"
            :style="{ backgroundColor: 'white', color: 'gray' }"
            type="password"
            placeholder="Enter the password"
          />
        </UFormGroup>

        <button
          @click="handleSubmit"
          class="w-full py-2 px-4 bg-main text-white font-semibold rounded-md shadow-sm hover:bg-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main mt-4"
        >
          Login
        </button>
      </UForm>
    </div>
  </div>
</template>
