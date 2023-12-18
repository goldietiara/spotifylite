<script setup>
import { useAuthStore } from "~/stores/auth";
import { useArtistStore } from "~/stores/artist";

///all store
const store = useStore();
const { allUser, allPlaylist, allArtist, allAlbum } = storeToRefs(store);

///current store
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const bgColor = ref("");
const search = ref("");
const albums = ref([]);
const playlists = ref([]);
const artists = ref([]);
const users = ref([]);

///search function
watch([allUser, allPlaylist, allArtist, allAlbum], () => {
  albums.value = allAlbum.value;
  playlists.value = allPlaylist.value;
  artists.value = allArtist.value;
  users.value = allUser.value;
});

watch(search, () => {
  albums.value = allAlbum.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
  playlists.value = allPlaylist.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
  artists.value = allArtist.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
  users.value = allUser.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

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
  await getImageColor(currentUser.value.image);
});
</script>

<template>
  <main
    class="relative w-full h-full overflow-y-auto bg-contain"
    :style="{
      backgroundImage: `url(/search-page-4.jpg)`,
    }"
  >
    <section>
      <div
        class="bg-zinc-900/30 flex flex-col gap-5 text-sm font-light p-6 pt-32 h-[450px]"
      >
        <h1 class="w-full text-center font-semibold text-6xl tracking-wider">
          Browse all
        </h1>
        <UInput
          class="shadow-2xl drop-shadow-xl mx-10"
          color="gray"
          size="xl"
          v-model="search"
          placeholder="What do you want to listen to?"
          :ui="{
            rounded: 'rounded-full',
          }"
        />
      </div>

      <div class="relative bg-zinc-900 h-full min-h-screen">
        <!-- <div
          class="w-full h-[300px] absolute top-0 z-0 opacity-50 bg-center"
          :style="{
            background: `linear-gradient(0deg, rgba(0,0,0,0) 20%, ${bgColor} 100%)`,
          }"
        ></div> -->

        <div
          class="flex flex-col gap-10 mx-5 py-10"
          v-show="
            users.length || playlists.length || artists.length || albums.length
          "
        >
          <CardsPlaylistUserCard
            v-show="albums.length"
            :type="'playlist'"
            :data="albums.slice(0, 5)"
            :owner="albums"
            :name="'Album'"
          />
          <CardsPlaylistUserCard
            v-show="playlists.length"
            :type="'playlist'"
            :data="playlists.slice(0, 5)"
            :owner="playlists"
            :name="'Playlist'"
          />

          <CardsPlaylistUserCard
            v-show="artists.length"
            :type="'user'"
            :data="artists.slice(0, 5)"
            :name="'Artist'"
          />
          <CardsPlaylistUserCard
            v-show="users.length"
            :type="'user'"
            :data="users.slice(0, 5)"
            :name="'Profile'"
          />
        </div>
        <div
          v-show="
            search &&
            (!users.length ||
              !playlists.length ||
              !artists.length ||
              !albums.length)
          "
          class="mx-5 py-10 flex flex-col gap-5 items-center text-center"
        >
          <h1
            class="font-semibold text-3xl whitespace-nowrap text-ellipsis overflow-hidden"
          >
            Could't find {{ search }}
          </h1>
          <p class="text-xl">
            try searching again using a different <br />
            spelling or keyword.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
