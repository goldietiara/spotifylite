<script setup>
const router = useRouter();
const { data, type, name, owner } = defineProps([
  "data",
  "type",
  "name",
  "owner",
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
  <div v-if="data" class="flex flex-col gap-5 z-10">
    <div class="flex justify-between">
      <h1 class="text-xl font-bold text-gray-200">{{ name }}</h1>
      <p
        v-show="data.length > 4"
        class="text-gray-200 text-sm cursor-pointer underline-offset-2 hover:underline"
      >
        show all
      </p>
    </div>
    <div class="mx-5 flex gap-5 flex-wrap">
      <!-- vfor -->
      <div
        class="w-[190px] h-[270px] rounded-lg overflow-clip bg-zinc-900 group cursor-pointer"
        v-for="(value, index) in data"
        :key="index"
        @click="go(value.id)"
      >
        <div
          class="w-full h-full flex flex-col gap-3 items-center p-4 bg-white/5 group-hover:bg-white/10 transition-all ease-out duration-150"
        >
          <div
            v-if="data"
            :style="{
              backgroundImage: `url(${value.image})`,
            }"
            alt="playlist/people-image"
            class="relative w-[160px] h-[160px] bg-cover bg-center bg-zinc-700/30 flex justify-center items-center"
            :class="type === 'user' ? 'rounded-full' : 'rounded-lg'"
          >
            <UIcon
              v-show="!value.image"
              class="opacity-30 text-6xl"
              name="i-ph-music-notes"
            />
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
          <USkeleton
            v-else
            class="w-[160px] h-[160px]"
            :ui="{ background: 'bg-zinc-700' }"
          />

          <div
            class="text-sm text-gray-400 w-[160px] flex flex-col font-light items-start"
          >
            <h1
              v-if="data"
              class="text-gray-200 font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{ value.name || "Playlist Name" }}
            </h1>
            <USkeleton
              v-else
              class="w-[100px] h-[20px] mb-1"
              :ui="{ background: 'bg-zinc-700' }"
            />

            <p
              v-if="data"
              class="whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{
                type !== "user"
                  ? `by ${
                      owner.name
                        ? owner.name
                        : value.Artist
                        ? value.Artist.name
                        : value.userProfile.User.name
                    }`
                  : value.Artist
                  ? "Artist"
                  : "Profile"
              }}
            </p>
            <USkeleton
              v-else
              class="w-[70px] h-[15px]"
              :ui="{ background: 'bg-zinc-700' }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex flex-col gap-5 z-10">
    <USkeleton class="w-[160px] h-[30px]" :ui="{ background: 'bg-zinc-700' }" />
    <div
      class="w-[190px] h-[270px] rounded-lg overflow-clip bg-zinc-900 group cursor-pointer mx-5"
    >
      <div
        class="w-full h-full flex flex-col gap-3 items-center p-4 bg-white/5"
      >
        <USkeleton
          class="w-[160px] h-[160px]"
          :ui="{ background: 'bg-zinc-700' }"
        />

        <div
          class="text-sm text-gray-400 w-[160px] flex flex-col font-light items-start"
        >
          <USkeleton
            class="w-[100px] h-[20px] mb-1"
            :ui="{ background: 'bg-zinc-700' }"
          />

          <USkeleton
            class="w-[70px] h-[15px]"
            :ui="{ background: 'bg-zinc-700' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
