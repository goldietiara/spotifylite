<script setup>
const bgColor = ref("");

const authStore = useAuthStore();
const { currentUser, userPlaylist, following, followers, refetch } =
  storeToRefs(authStore);

const isOpen = ref(false);
const isArtistOpen = ref(false);
const client = useSupabaseClient();

const getImageColor = async (image) => {
  try {
    const color = await getColorFromImage(image);
    bgColor.value = color;
    console.log(bgColor.value);
  } catch (error) {
    console.error(error.message);
  }
};

watchEffect(async () => {
  await getImageColor(currentUser.value.image);
});

watch(currentUser, async () => {
  await getImageColor(currentUser.value.image);
});
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
      <CardsPlaylistProfileHeader :type="'user'" :data="currentUser" />

      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6">
          <PlayerDetailFollow
            :isArtist="currentUser.isArtist"
            :artistId="currentUser.artistId"
            :type="'user'"
            @open-modal="isOpen = true"
            @open-artist-modal="isArtistOpen = true"
            class="mb-5"
          />

          <UModal v-model="isOpen">
            <FormPlaylistUserUpdate
              :type="'user'"
              :data="currentUser"
              :onCloseModal="() => (isOpen = onCloseModal)"
              :onIsRefetch="() => (refetch = true)"
            />
          </UModal>

          <UModal v-model="isArtistOpen">
            <FormCreateArtist
              :type="'artist'"
              :data="currentUser"
              :client="client"
              :onCloseModal="() => (isArtistOpen = onCloseModal)"
              :onIsRefetch="() => (refetch = true)"
            />
          </UModal>

          <div class="flex flex-col gap-10">
            <CardsPlaylistUserCard
              :type="'playlist'"
              :data="userPlaylist"
              :owner="currentUser"
              :name="'Public Playlist'"
            />

            <CardsPlaylistUserCard
              :data="following"
              :type="'user'"
              :name="'Following'"
            />
            <CardsPlaylistUserCard
              :data="followers"
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
