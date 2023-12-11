<script setup>
const router = useRouter();
const { data, type, name, artist } = defineProps([
  "data",
  "type",
  "name",
  "artist",
]);

const go = (id) => {
  if (type === "playlist") {
    router.push(`/playlist/${id}`);
  } else if (type === "user") {
    router.push(`/user/${id}`);
  } else router.push(`/album/${id}`);
};
</script>

<template>
  <div class="flex flex-col gap-5 z-10">
    <h1 class="text-xl font-bold text-gray-200">{{ name }}</h1>
    <div class="mx-5 flex gap-5">
      <!-- vfor -->
      <div
        class="w-[190px] h-[270px] rounded-lg overflow-clip bg-zinc-900 group cursor-pointer"
        v-for="(value, index) in type === 'playlist'
          ? data.playlist
          : data.album"
        :key="index"
        @click="go(value.id)"
      >
        <div
          class="w-full h-full flex flex-col gap-3 items-center p-4 bg-white/5 group-hover:bg-white/10 transition-all ease-out duration-150"
        >
          <div
            :style="{
              backgroundImage: `url(${value.image})`,
            }"
            alt="playlist/people-image"
            class="w-[160px] h-[160px] bg-cover bg-center relative"
            :class="type === 'user' ? 'rounded-full' : 'rounded-lg'"
          >
            <UButton
              :ui="{
                rounded: 'rounded-full',
              }"
              class="p-3 hover:scale-110 transition-all ease-out duration-200 opacity-0 absolute bottom-0 right-2 group-hover:bottom-2 group-hover:opacity-100"
              v-show="type === 'playlist'"
            >
              <UIcon name="i-heroicons-play-20-solid" class="text-xl" />
            </UButton>
          </div>
          <div
            class="text-sm text-gray-400 w-full flex flex-col font-light items-start"
          >
            <h1 class="text-gray-200 font-semibold">
              {{ value.name || "Playlist Name" }}
            </h1>
            <p>
              {{
                type === "user"
                  ? `Profile`
                  : type === "artist"
                  ? `Artist`
                  : `by ${data.name}`
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
