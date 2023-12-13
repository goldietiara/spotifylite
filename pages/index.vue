<script setup>
import { onBeforeMount } from "vue";

const userSession = useSupabaseUser();
const authStore = useAuthStore();

const { getCurrentUser } = authStore;
const { currentUser } = storeToRefs(authStore);

definePageMeta({
  title: "Spotify - Web Player by Goldie",
});

watchEffect(() => {
  if (!userSession.value) {
    return navigateTo("/login");
  }
});

const getUser = async () => {
  console.log("clicked");
  try {
    currentUser.value = await getCurrentUser(
      userSession.value.user_metadata.email
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log("wawa");
};

onBeforeMount(async () => {
  await getUser();
});
</script>

<template>
  <div class="w-full h-full">
    <div class="flex flex-col gap-3 mt-40 items-center justify-center">
      <img
        :src="userSession.user_metadata.avatar_url"
        alt=""
        class="rounded-full w-[100px] h-[100px]"
      />
      <p>provider: {{ userSession.app_metadata.provider }}</p>
      <p>name: {{ userSession.user_metadata.name }}</p>
      <p>email: {{ userSession.email }}</p>
    </div>

    <div class="flex"></div>

    <p class="mt-10 mx-3 text-gray-400">
      {{ userSession }}
    </p>
  </div>
</template>
