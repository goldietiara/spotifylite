<script setup>
import { storeToRefs } from "pinia";
import CardsPlaylistHeader from "../../../components/cards/playlist-header.vue";
import Table from "../../../components/table.vue";

const centerColor = ref("");

const route = useRoute();
const store = useStore();

const { songs } = store;
const { currentPlaylist } = storeToRefs(store);
const currentPlaylistId = parseInt(route.params.id);
const data = currentPlaylist.value.find((v) => v.id === currentPlaylistId);
const PlaylistSongs = {
  songs: [],
  likedSongs: data.likedSongs,
};

data.songsId.forEach((playlistSong) => {
  const matchedSong = songs.find((song) => song.id === playlistSong.id);
  if (matchedSong) {
    PlaylistSongs.songs.push(matchedSong);
  }
});

const getImageColor = async () => {
  try {
    const color = await getColorFromImage(data.img);
    centerColor.value = color;
  } catch (error) {
    console.error(error.message);
  }
};

onMounted(getImageColor);
</script>

<template>
  <main
    class="w-full h-full bg-gradient-to-t from-zinc-900 to-transparent pt-24"
    :style="{ backgroundColor: centerColor }"
  >
    <section class="py-4 px-6 flex flex-col gap-5">
      <CardsPlaylistHeader :data="data" class="mt-5" />
    </section>

    <section
      class="mt-5 px-5 w-full h-fit bg-gradient-to-br from-zinc-900/20 via-zinc-900/40 to-zinc-900/70"
    >
      <Table :PlaylistSongs="PlaylistSongs" />
    </section>
    <Footer></Footer>
  </main>
</template>
