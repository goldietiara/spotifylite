<script setup>
import { defineProps } from "vue";

const { v } = defineProps(["v"]);
</script>

<template>
  <div
    class="py-2 px-3 flex gap-3 items-center text-white/90 ease-in-out transition-all duration-150 rounded-md hover:bg-zinc-50/5 hover:cursor-pointer"
  >
    <!-- <div
        class="h-[50px] min-w-[50px] bg-cover bg-center rounded-md"
        style="
          background-image: url(https://i.pinimg.com/564x/39/56/8f/39568f388d8fb70c33681c332fc9060b.jpg);
        "
      ></div> -->

    <img
      class="h-[50px] min-w-[50px] bg-cover bg-center rounded-md"
      :src="v.img"
      alt="playlist-cover"
    />

    <div class="max-w-fit min-w-[0px]">
      <h1 class="whitespace-nowrap text-ellipsis overflow-hidden">
        {{ v.playlistName }}
      </h1>
      <p
        class="text-xs text-white/70 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        Playlist - {{ v.user }}
      </p>
    </div>
  </div>
</template>
