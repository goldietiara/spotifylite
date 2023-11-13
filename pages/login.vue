<script setup>
definePageMeta({
  layout: "login-signup",
});
</script>

<template>
  <div
    class="py-10 flex-col flex gap-5 items-center w-[800px] h-full rounded-lg"
  >
    <h1 class="text-5xl font-bold py-10">Log in to Spotify</h1>
    <UButton
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
      size="xl"
      color="black"
      variant="solid"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="py-4 dark:bg-black dark:text-gray-200 outline outline-1 outline-gray-400 hover:outline-gray-200 dark:hover:bg-black"
      ><UIcon class="text-xl mx-3" name="i-ph-github-logo-fill" />
      <p class="pr-5">Continue with Google</p>
    </UButton>
  </div>
</template>
