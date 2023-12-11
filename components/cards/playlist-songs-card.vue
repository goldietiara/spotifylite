<script setup>
import { defineProps } from "vue";

const router = useRouter();
const { data, song, type, owner } = defineProps([
  "data",
  "type",
  "song",
  "owner",
]);
const go = (id) => {
  router.push(`/playlist/${id}`);
};
</script>

<template>
  <div
    class="py-2 px-3 flex gap-3 items-center text-white/90 ease-in-out transition-all duration-150 rounded-md hover:bg-zinc-50/5"
    :class="type === 'playlist' && 'hover:cursor-pointer'"
    @click="type === 'playlist' && go(data.id)"
  >
    <div
      :style="{ backgroundImage: `url(${data?.image})` }"
      alt="playlist/songs-image"
      class="h-[50px] min-w-[50px] bg-cover bg-center rounded-md bg-zinc-800 flex justify-center items-center"
    >
      <UIcon
        v-show="!data.image"
        class="text-lg opacity-50"
        name="i-ph-image-square"
      />
    </div>

    <div class="max-w-full min-w-[0px]">
      <h1 class="whitespace-nowrap text-ellipsis overflow-hidden">
        {{ type !== "playlist" ? song : data.name }}
      </h1>
      <p
        class="text-xs text-white/70 whitespace-nowrap text-ellipsis overflow-hidden"
      >
        {{ type !== "playlist" ? owner.name : `Playlist - ${owner}` }}
      </p>
    </div>
  </div>
</template>
