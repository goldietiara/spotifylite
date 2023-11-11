<script setup>
const { data } = defineProps(["data"]);
</script>
<template>
  <div class="flex flex-wrap justify-start items-end gap-3">
    <img
      :src="data.img"
      alt="playlist-cover"
      class="w-[250px] h-[250px] shadow-zinc-900 shadow-2xl drop-shadow-2xl z-10"
    />
    <div class="mt-10 flex flex-col gap-3 text-sm font-light z-20">
      <p>Playlist</p>
      <h1 class="text-6xl font-bold">{{ data.playlistName }}</h1>
      <p>/ᐠ｡ꞈ｡ᐟ\♡ hello everynyan♡/ᐠ｡ꞈ｡ᐟ\</p>
      <div class="flex items-center gap-2">
        <img
          :src="data.userProfile"
          alt="user-profile"
          class="rounded-full w-[30px] h-[30px]"
        />
        <a
          class="font-semibold hover:underline hover:underline-offset-4 hover:cursor-pointer"
          >{{ data.user }}</a
        >-
        <p>1 like</p>
        -
        <p>{{ data.songsId.length }} songs</p>
      </div>
    </div>
  </div>
</template>
