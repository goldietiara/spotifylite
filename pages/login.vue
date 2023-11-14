<script setup>
definePageMeta({
  layout: "login-signup",
});

const client = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

const login = async (prov) => {
  const { data, error } = await client.auth.signInWithOAuth({
    provider: prov,
    redirectTo: window.location.origin,
  });

  if (error) console.log(error);
};
</script>

<template>
  <p>{{ userSession }}</p>
  <div
    class="py-5 md:py-10 flex-col flex gap-5 items-center w-[800px] h-full rounded-lg"
  >
    <h1 class="text-center leading-snug text-5xl font-bold py-10">
      Log in to Spotify
    </h1>
    <UButton
      @click="login('google')"
      size="xl"
      color="black"
      variant="solid"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="py-4 dark:bg-black dark:text-gray-200 outline outline-1 outline-gray-400 hover:outline-gray-200 dark:hover:bg-black"
      ><UIcon class="text-xl mx-3" name="i-ph-google-logo-bold" />
      <p class="pr-5">Continue with Google</p>
    </UButton>
    <UButton
      @click="login('github')"
      size="xl"
      color="black"
      variant="solid"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="py-4 dark:bg-black dark:text-gray-200 outline outline-1 outline-gray-400 hover:outline-gray-200 dark:hover:bg-black"
      ><UIcon class="text-xl mx-3" name="i-ph-github-logo-fill" />
      <p class="pr-5">Continue with Github</p>
    </UButton>
    <p class="text-gray-400 text-sm">
      Don't have an account?
      <a
        class="text-gray-200 underline underline-2 underline-offset-2 hover:text-green-500 hover:cursor-pointer"
        >Sign up for Spotify</a
      >
    </p>
  </div>
</template>
