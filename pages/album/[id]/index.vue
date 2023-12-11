<script setup>
const userSession = useSupabaseUser();
const route = useRoute();
const bgColor = ref("");
const albumId = ref(route.params.id);

const userStore = useUserStore();
const { albumById, getAlbum, getAlbumSongs, userByEmail, getUserLikes } =
  storeToRefs(userStore);
const { getAlbumById, getUserByEmail } = userStore;
const isOpen = ref(false);

const getCurrentAlbum = async (id) => {
  try {
    albumById.value = await getAlbumById(id);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};
const getCurrentUser = async (email) => {
  try {
    userByEmail.value = await getUserByEmail(email);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

onBeforeMount(() => {
  getCurrentAlbum(route.params.id);
  getCurrentUser(userSession.value.user_metadata.email);
});

onMounted(() => {
  watch(albumById, () => {
    getImageColor(getAlbum.value?.image);
  });
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
    return getAlbumSongs.value;
  }
  return getAlbumSongs.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const likedSongs = (id) => {
  const result = getUserLikes.value.find((v) => v.id === id);
  if (result) {
    return true;
  }
};
</script>

<template>
  <main class="relative w-full h-full overflow-y-auto">
    <div
      class="h-screen w-full absolute top-0 z-0"
      :style="{
        background: `linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, ${bgColor} 100%)`,
      }"
    ></div>

    <section class="z-20 pt-20">
      <CardsPlaylistProfileHeader :type="'artist'" :data="getAlbum" />

      <div class="mt-10 relative">
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
              :data="getAlbum"
              :type="'playlist'"
              :onCloseModal="() => (isOpen = onCloseModal)"
            />
          </UModal>

          <Table
            :filteredRows="filteredRows"
            :likedSongs="likedSongs"
            :data="userByEmail.userProfile"
          />
        </div>
      </div>
      <Footer></Footer>
    </section>
  </main>
</template>
