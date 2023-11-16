<script setup>
const router = useRouter();
</script>

<template>
  <div
    class="flex items-center gap-2 mx-10 my-5 md:justify-start justify-center"
    @click="router.push('/')"
  >
    <UIcon name="i-ph-spotify-logo-fill" class="text-4xl" />
    <h1 class="text-2xl text-gray-200 font-bold">Spotify</h1>
  </div>

  <div class="h-fit w-full flex justify-center mt-10">
    <slot></slot>
  </div>
</template>
