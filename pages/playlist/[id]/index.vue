<script setup>
const userSession = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const bgColor = ref("");

const userStore = useUserStore();
const { playlistById, getPlaylist, userById } = storeToRefs(userStore);
const { getPlaylistById } = userStore;
const isOpen = ref(false);
const userLikedSongs = ref([]);
const getPlaylistSongs = ref([]);

const getCurrentPlaylist = async () => {
  try {
    await getPlaylistById(route.params.id);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

watchEffect(async () => {
  await getCurrentPlaylist();
});

watch(playlistById, async () => {
  getImageColor(getPlaylist.value.image);
  console.log(getPlaylist.value);
  console.log(playlistById.value);
});

const getImageColor = async (image) => {
  try {
    const color = await getColorFromImage(image);
    bgColor.value = color;
    console.log(bgColor.value);
  } catch (error) {
    console.error(error.message);
  }
};

const q = ref("");

const searchIcon = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return getPlaylistSongs.value;
  }
  return getPlaylistSongs.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

// const isUser = computed(() => {
//   userById.value.email === userSession.value.user_metadata.email;
//   if (isUser) {
//     console.log(isUser);
//     return true;
//   }
// });

const likedSongs = (id) => {
  const result = userLikedSongs.value.find((v) => v.id === id);
  if (result) {
    return true;
  }
};
</script>

<template>
  <main class="relative w-full h-full overflow-y-auto">
    <!-- <div
      class="h-screen w-full absolute top-0 z-0"
      :style="{
        background: `linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, ${bgColor} 100%)`,
      }"
    ></div> -->

    <section class="z-20 pt-20">
      <CardsPlaylistProfileHeader :type="'playlist'" :data="getPlaylist" />

      <!-- <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6 flex flex-col gap-5">
          <div class="flex px-3 py-3.5 pt-5 justify-between items-center">
            <PlayerDetailFollow
              :type="'playlist'"
              @open-modal="isOpen = true"
            />

            <div
              class="mr-0 h-[32px] w-[32px] rounded-full flex justify-center items-center hover:bg-white/10 hover:cursor-pointer transition-all duration-300"
              @click="searchIcon = !searchIcon"
              v-if="!searchIcon"
            >
              <UIcon
                name="i-ph-magnifying-glass"
                class="bg-gray-400 flex-shrink-0 h-5 w-5"
              />
            </div>

            <UInput
              v-else
              v-model="q"
              placeholder="Search in Playlist"
              icon="i-ph-magnifying-glass"
              color="gray"
              variant="outline"
              :trailing="false"
              :sort="{ column: 'title' }"
              :ui="{
                wrapper: 'relative',
                icon: {
                  base: 'flex-shrink-0 text-gray-400 dark:text-gray-400',
                },
              }"
            />
          </div>
          <UModal v-model="isOpen">
            <FormPlaylistUserUpdate
              :type="'playlist'"
              :data="getPlaylist"
              :runtimeConfig="runtimeConfig"
              :onCloseModal="() => (isOpen = onCloseModal)"
            />
          </UModal>

          <Table
            :filteredRows="filteredRows"
            :likedSongs="likedSongs"
            :data="userById"
          />
        </div>
      </div> -->
      <Footer></Footer>
    </section>
  </main>
</template>
