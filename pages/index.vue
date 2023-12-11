<script setup>
const userSession = useSupabaseUser();

watchEffect(() => {
  if (!userSession.value) {
    return navigateTo("/login");
  }
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
