<script setup>
import PlaylistSongCard from "./cards/playlist-songs-card.vue";

const route = useRoute();
const router = useRouter();
const search = ref("");
const width = ref(false);
function currentPage(currentPath) {
  if (route.path === currentPath) {
    return "text-white/90";
  } else return "text-white/40";
}

const playlist = [
  {
    id: 11,
    userId: 1,
    playlistName: "My Sweet Joy",
    img: "/playlist1.jpeg",
    user: "owy",
  },
  {
    id: 12,
    userId: 1,
    playlistName: "Seasons in the Sun",
    img: "/playlist2.jpeg",
    user: "ry",
  },
  {
    id: 13,
    userId: 1,
    playlistName: "Get your Protein",
    img: "/playlist3.jpeg",
    user: "owy",
  },
];

const data = ref(playlist);

watch(search, () => {
  data.value = playlist.filter((v) =>
    v.playlistName.toLowerCase().includes(search.value.toLowerCase())
  );
});

const push = (id) => {
  router.push(`/playlist/${id}`);
};
</script>

<template>
  <div
    class="flex flex-col gap-2 min-w-0 h-full"
    :class="width ? 'w-[100px]' : 'w-full'"
  >
    <section
      class="flex flex-col gap-1 bg-zinc-900 w-full h-fit py-2 px-3 rounded-lg"
      :class="width && `items-center`"
    >
      <nuxt-link
        class="py-2 px-3 flex gap-4 font-semibold items-center hover:text-white/90 ease-in-out transition-all duration-300 hover:cursor-pointer"
        :class="currentPage(`/`)"
        to="/"
      >
        <UIcon
          class="text-3xl shrink-0"
          name="i-majesticons-home"
          v-if="route.path === '/'"
        />
        <UIcon
          v-else
          class="text-3xl shrink-0"
          name="i-majesticons-home-line"
        />
        <span v-show="!width"> Home </span>
      </nuxt-link>

      <nuxt-link
        class="py-2 px-3 flex gap-4 font-semibold items-center hover:text-white/90 ease-in-out transition-all duration-300 hover:cursor-pointer"
        :class="currentPage(`/search`)"
        to="/search"
      >
        <!-- name="i-heroicons-search"          v-if="route.path === '/about'" -->

        <UIcon
          class="text-3xl shrink-0"
          name="i-majesticons-search"
          v-if="route.path === '/about'"
        />
        <UIcon
          v-else
          class="text-3xl shrink-0"
          name="i-majesticons-search-line"
        />

        <span v-show="!width"> Search </span>
      </nuxt-link>
    </section>

    <section
      class="flex flex-col bg-zinc-900 w-full h-full py-2 px-3 rounded-lg overflow-hidden"
    >
      <div
        class="py-2 px-3 flex gap-4 font-semibold items-center text-white/40 hover:text-white/90 ease-in-out transition-all duration-300 hover:cursor-pointer"
        @click="width = !width"
        :class="width && 'justify-center'"
      >
        <UIcon class="text-3xl shrink-0" name="i-majesticons-folder" />
        <span v-show="!width"> Your Library </span>
      </div>

      <div
        class="mt-3 mx-3 mb-2 px-2 flex items-center gap-1 bg-zinc-100/5 rounded-sm text-2xl text-white/70"
        v-show="!width"
      >
        <UIcon name="i-majesticons-search-line" />

        <input
          type="text"
          placeholder="search your library"
          class="py-2 px-3 text-xs bg-transparent focus:outline-none text-inherit w-full"
          v-model.trim="search"
        />
        <UIcon
          name="i-heroicons-x-mark-20-solid"
          :class="search.length > 0 ? `` : ` text-white/0`"
          @click="search = ''"
        />
      </div>

      <div v-if="data.length >= 1">
        <div
          @click="router.push(`/liked-songs`)"
          class="py-2 px-3 flex gap-3 items-center text-white/90 ease-in-out transition-all duration-150 rounded-md hover:bg-zinc-50/5 hover:cursor-pointer"
        >
          <div
            class="h-[50px] min-w-[50px] flex justify-center items-center rounded-md bg-gradient-to-br from-indigo-700 via-indigo-400 to-cyan-200"
          >
            <UIcon class="text-xl" name="i-majesticons-heart" />
          </div>

          <div class="max-w-fit min-w-[0px]">
            <h1 class="whitespace-nowrap text-ellipsis overflow-hidden">
              Liked Songs
            </h1>
            <p
              class="text-xs text-white/70 whitespace-nowrap text-ellipsis overflow-hidden"
            >
              Songs - 20 songs
            </p>
          </div>
        </div>
        <PlaylistSongCard
          v-for="v in data"
          :key="v.id"
          :v="v"
          @click="push(v.id)"
        />
      </div>

      <div
        v-else
        class="px-3 flex flex-col justify-center gap-3 text-center max-w-fit min-w-0 h-full"
      >
        <h1
          class="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden"
        >
          Could't find {{ search }}
        </h1>
        <p class="text-xs">
          try searching again using a different <br />
          spelling or keyword.
        </p>
      </div>
    </section>
  </div>
</template>
