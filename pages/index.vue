<script setup>
import { useStore } from "~/stores/store";
import { useAuthStore } from "~/stores/auth";

const store = useStore();
const { allUser, allPlaylist, allArtist, allAlbum } = storeToRefs(store);

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const bgColor = ref("");

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
</script>
<template>
  <main class="relative w-full h-full overflow-y-auto">
    <div
      class="h-screen w-full absolute top-0 z-0"
      :style="{
        background: `linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 10%, ${bgColor} 100%)`,
      }"
    ></div>

    <section class="z-20 pt-20 py-3 px-6 flex flex-col gap-10">
      <div class="flex flex-col gap-10">
        <CardsPlaylistUserCard
          :type="'playlist'"
          :data="allAlbum.slice(0, 5)"
          :owner="allAlbum"
          :name="'Popular Album'"
        />
        <CardsPlaylistUserCard
          :type="'playlist'"
          :data="allPlaylist.slice(0, 5)"
          :owner="allPlaylist"
          :name="'Playlist'"
        />

        <CardsPlaylistUserCard
          :type="'user'"
          :data="allArtist.slice(0, 5)"
          :name="'Artist You Might Like'"
        />
        <CardsPlaylistUserCard
          :type="'user'"
          :data="allUser.slice(0, 5)"
          :name="'Lets Connect With Others'"
        />
      </div>
    </section>
    <Footer></Footer>
  </main>
</template>
