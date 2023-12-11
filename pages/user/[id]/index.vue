<script setup>
const route = useRoute();
const bgColor = ref("");
const userId = ref(route.params.id);

const userStore = useUserStore();
const { userById } = storeToRefs(userStore);
const { getUserById } = userStore;

const isOpen = ref(false);
const isArtistOpen = ref(false);
const client = useSupabaseClient();

const getCurrentUser = async (id) => {
  try {
    userById.value = await getUserById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

onBeforeMount(() => {
  getCurrentUser(userId.value);
});

onMounted(() => {
  watch(userById, () => {
    getImageColor(userById.value?.image);
    console.log(userById.value);
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
      <CardsPlaylistProfileHeader :data="userById" :type="'user'" />

      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6">
          <PlayerDetailFollow
            :isArtist="userById.isArtist"
            :artistId="userById.artistId"
            :type="'user'"
            @open-modal="isOpen = true"
            @open-artist-modal="isArtistOpen = true"
            class="mb-5"
          />

          <UModal v-model="isOpen">
            <FormPlaylistUserUpdate
              :data="userById"
              :type="'user'"
              :onCloseModal="() => (isOpen = onCloseModal)"
            />
          </UModal>

          <UModal v-model="isArtistOpen">
            <FormCreateArtist
              :data="userById"
              :type="'artist'"
              :onCloseModal="() => (isArtistOpen = onCloseModal)"
              :client="client"
            />
          </UModal>

          <div class="flex flex-col gap-10">
            <CardsPlaylistUserCard
              :type="'playlist'"
              :data="userById"
              :name="'Public Playlist'"
            />

            <CardsPlaylistUserCard
              :data="userById"
              :userProfile="userById"
              :type="'user'"
              :name="'Following'"
            />
            <CardsPlaylistUserCard
              :data="userById"
              :userProfile="userById"
              :type="'user'"
              :name="'Followers'"
            />
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </main>
</template>
