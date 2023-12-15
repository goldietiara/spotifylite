<script setup>
import { useAuthStore } from "~/stores/auth";
import { usePlaylistStore } from "~/stores/playlist";
import { useAlbumStore } from "~/stores/album";
import { useArtistStore } from "~/stores/artist";

import PlaylistSongCard from "./cards/playlist-songs-card.vue";

const route = useRoute();

const runtimeConfig = useRuntimeConfig();
const userSession = useSupabaseUser();

///current user store
const authStore = useAuthStore();
const { getCurrentUser } = authStore;
const {
  userProfile,
  currentUser,
  userPlaylist,
  likedSongs,
  likedPlaylist,
  following,
  followers,
  userIsArtist,
  refetch,
} = storeToRefs(authStore);

///user store
const userStore = useUserStore();
const { getCurrentUserById } = userStore;
const {
  userById,
  userByIdProfile,
  userByIdPlaylist,
  userByIdFollowing,
  userByIdFollowers,
  refetchUserById,
} = storeToRefs(userStore);

///playlist store
const playlistStore = usePlaylistStore();
const { getCurrentPlaylist } = playlistStore;
const { playlist, playlistSongs, playlistOwner, refetchPlaylist } =
  storeToRefs(playlistStore);

///album store
const albumStore = useAlbumStore();
const { getCurrentAlbum } = albumStore;
const { album, albumSongs, albumOwner, refetchAlbum } = storeToRefs(albumStore);

///artist store
const artistStore = useArtistStore();
const { getCurrentArtist } = artistStore;
const { artist, artistAlbum, refetchArtist } = storeToRefs(artistStore);

const search = ref("");
const width = ref(false);
const load = ref(false);

/// FIX-LATER: playlist not showing the right result, when refreshing page on user page
/// FIX-LATER: must add validation for the playlist form

/// styling
function currentPage(currentPath) {
  if (route.path === currentPath) {
    return "text-white/90";
  } else return "text-white/40";
}

/// search current user playlist function
const data = ref([]);

watch(currentUser, () => {
  data.value = userPlaylist.value;
});

watch(search, () => {
  data.value = userPlaylist.value.filter((v) =>
    v.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

/// create new playlist
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

watch(currentUser, () => {
  console.log(state);
});

async function createPlaylist(data) {
  load.value = true;

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

/// checked user is logged in
watchEffect(() => {
  if (!userSession.value) {
    return navigateTo("/login");
  }
});

/// fetch logged in user
const getUser = async () => {
  console.log("fetch current user");
  try {
    currentUser.value = await getCurrentUser(
      userSession.value.user_metadata.email
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log("current user fetched");
};

/// fetch playlist by id
const getPlaylist = async (id) => {
  console.log(`fetching playlist: ${route.path}`);
  try {
    playlist.value = await getCurrentPlaylist(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(`playlist fetched: ${route.path}`);
};

/// fetch album by id
const getAlbum = async (id) => {
  console.log(`fetching album: ${route.path}`);
  try {
    album.value = await getCurrentAlbum(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(`album fetched: ${route.path}`);
};

/// fetch artist by id
const getArtist = async (id) => {
  console.log(`fetching artist: ${route.path}`);
  try {
    artist.value = await getCurrentArtist(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(`artist fetched: ${route.path}`);
};

/// fetch user by id
const getUserById = async (id) => {
  console.log(`fetching artist: ${route.path}`);
  try {
    userById.value = await getCurrentUserById(id);
  } catch (error) {
    console.log(error);
    throw error;
  }
  console.log(`artist fetched: ${route.path}`);
};

// onBeforeMount(async () => {
//   await getUser();
// });

watchEffect(async () => {
  await getUser();
});

///re-fetch after adding new playlist
watch(refetch, async () => {
  if (!refetch.value) return;
  await getUser();
  console.log("refetch current user");
  refetch.value = false;
});

watch(currentUser, () => {
  userPlaylist.value = currentUser.value.playlist;
  userProfile.value = currentUser.value.userProfile;

  likedSongs.value = userProfile.value.likedSongs;
  likedPlaylist.value = userProfile.value.likedPlaylist;
  following.value = userProfile.value.followers;
  followers.value = userProfile.value.following;
});

watchEffect(async () => {
  console.log(currentUser.value);
  if (route.name === "playlist-id") {
    await getPlaylist(route.params.id);
  } else if (route.name === "album-id") {
    await getAlbum(route.params.id);
  } else if (route.name === "artist-id") {
    await getArtist(route.params.id);
  } else if (route.name === "user-id") {
    await getUserById(route.params.id);
  } else if (route.name === "new-release") {
    await getArtist(currentUser.value.id);
  }
});

watch(playlist, () => {
  playlistOwner.value = playlist.value.userProfile.User;
  playlistSongs.value = playlist.value.songs;
  console.log(playlist.value);
});

watch(album, () => {
  albumOwner.value = album.value.Artist;
  albumSongs.value = album.value.songs;
  console.log(album.value);
});

///re-fetch after updating playlist data
watch(refetchPlaylist, async () => {
  if (!refetchPlaylist.value) return;
  await getPlaylist(route.params.id);
  console.log("refetch current user");
  refetch.value = false;
});

watch(artist, () => {
  artistAlbum.value = artist.value.album;
  console.log(artist.value);
});

///re-fetch after updating artist data
watch(refetchArtist, async () => {
  if (!refetchArtist.value) return;
  await getArtist(route.params.id);
  console.log("refetch current user");
  refetch.value = false;
});

watch(userById, () => {
  userByIdProfile.value = userById.value.userProfile;
  userByIdPlaylist.value = userById.value.playlist;
  userByIdFollowing.value = userById.value.following;
  userByIdFollowers.value = userById.value.followers;

  console.log(userById.value);
});

///re-fetch after updating user data
watch(refetchUserById, async () => {
  if (!refetchUserById.value) return;
  await getUserById(route.params.id);
  console.log("refetch current user");
  refetch.value = false;
});
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
          <nuxt-link
            to="/liked-songs"
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
          </nuxt-link>

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
      <div v-show="refetch === true" class="py-2 px-3 flex gap-3 items-center">
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
