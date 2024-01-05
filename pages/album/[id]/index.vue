<script setup>
import { useAuthStore } from "~/stores/auth";
import { useAlbumStore } from "~/stores/album";

///get logged in user
const authStore = useAuthStore();
const { currentUser, likedSongs, userProfile, userPlaylist, refetch } =
  storeToRefs(authStore);
///get current playlist
const albumStore = useAlbumStore();
const { album, albumSongs, albumOwner, refetchAlbum } = storeToRefs(albumStore);

const bgColor = ref("");
const isOpen = ref(false);

///search functionality
const q = ref("");
const searchIcon = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return albumSongs.value;
  }
  return albumSongs.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

///get logged in user liked songs
const isLiked = (id) => {
  const result = likedSongs.value.find((v) => v.id === id);
  if (result) {
    return true;
  }
};

///get background color
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
  await getImageColor(album.value.image);
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
      <CardsPlaylistProfileHeader
        :type="'album'"
        :data="album"
        :owner="albumOwner"
      />
      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6 flex flex-col gap-5">
          <div class="flex px-3 py-3.5 pt-5 justify-between items-center">
            <PlayerDetailFollow :type="'album'" @open-modal="isOpen = true" />

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
              placeholder="Search in Album"
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
              :type="'album'"
              :data="album"
              :onCloseModal="() => (isOpen = onCloseModal)"
              :onIsRefetch="() => (refetchAlbum = true)"
            />
          </UModal>

          <Table
            :type="'album'"
            :likedSongs="isLiked"
            :filteredRows="filteredRows"
            :userPlaylist="userPlaylist"
            :userId="userProfile.id"
            :onIsRefetch="() => (refetch = true)"
          />
        </div>
      </div>
      <Footer></Footer>
    </section>
  </main>
</template>
