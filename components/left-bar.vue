<script setup>
import { useAuthStore } from "~/stores/auth";
import PlaylistSongCard from "./cards/playlist-songs-card.vue";
import { useAsyncData } from "nuxt/app";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const search = ref("");
const width = ref(false);
const load = ref(false);
const refetch = ref(false);

function currentPage(currentPath) {
  if (route.path === currentPath) {
    return "text-white/90";
  } else return "text-white/40";
}

const data = ref([]);
watch(currentUser, () => {
  data.value = currentUser.value.playlist;
});

watch(search, () => {
  data.value = currentUser.value.playlist.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const state = reactive({
  id: currentUser.value.id,
  name: `New Playlist #${
    currentUser.value.playlist ? currentUser.value.playlist.length + 1 : 0
  }`,
  description: "New Playlist Description",
  image: `${runtimeConfig.public.bucketUrl}playlist-${
    currentUser.value.email
  }-${
    currentUser.value.playlist ? currentUser.value.playlist.length + 1 : 0
  }.jpg`,
  imageName: `playlist-${currentUser.value.email}-${
    currentUser.value.playlist && currentUser.value.playlist.length + 1
  }.jpg`,
});

watchEffect(() => {
  console.log(state);
});

async function createPlaylist(data) {
  try {
    const result = await useFetch(`/api/create-playlist/`, {
      method: "POST",
      body: {
        userId: data.id,
        name: data.name,
        description: data.description,
        image: "",
        imageName: "",
      },
    });

    await useFetch(`/api/update-add-user-playlist/`, {
      method: "PATCH",
      body: {
        id: data.id,
        playlist: result.data.value?.id,
      },
    });
    load.value = false;

    navigateTo(`/playlist/${result.data.value.id}`);
  } catch (error) {
    console.log(`something went wrong: ${error}`);
  }
  refetch.value = true;
}
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
        class="py-2 px-3 w-full flex font-semibold items-center text-white/40 ease-in-out transition-all duration-300"
        :class="width ? 'justify-center' : 'justify-between'"
      >
        <div
          class="flex items-center gap-4 hover:text-white/90 cursor-pointer"
          @click="width = !width"
        >
          <UIcon class="text-3xl shrink-0" name="i-ph-cardholder" />
          <span v-show="!width"> Your Library </span>
        </div>
        <UTooltip text="Create playlist">
          <UIcon
            v-show="width === false && load === false"
            class="text-2xl shrink-0 hover:text-white/90 cursor-pointer"
            name="i-ph-plus"
            @click="createPlaylist(state)"
          />
        </UTooltip>
        <UIcon
          v-show="width === false && load === true"
          class="bg-white/40 animate-spin text-xl"
          name="i-ph-circle-notch"
        />
      </div>

      <div
        class="mt-3 mx-3 mb-2 px-2 flex items-center gap-1 bg-zinc-100/5 rounded-sm text-2xl text-white/70"
        v-show="!width"
      >
        <UIcon name="i-ph-magnifying-glass" />

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
      <div v-if="currentUser.playlist">
        <div v-if="data.length > 0">
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
                <!-- {{ `Playlist - ${currentUser.playlist.length} songs` }} -->
              </p>
            </div>
          </div>

          <PlaylistSongCard
            :type="'playlist'"
            v-for="(data, index) in data"
            :key="index"
            :data="data"
            :owner="currentUser.name"
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
      </div>

      <div v-else class="py-2 px-3 flex gap-3 items-center">
        <USkeleton
          class="h-[50px] min-w-[50px] flex justify-center items-center rounded-md"
        />

        <div
          class="max-w-fit min-w-[0px] flex flex-col gap-1"
          v-show="width === false"
        >
          <USkeleton class="w-[100px] h-[25px]" />
          <USkeleton class="w-[50px] h-[15px]" />
        </div>
      </div>
    </section>
  </div>
</template>
