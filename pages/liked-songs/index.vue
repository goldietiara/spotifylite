<script setup>
import Table from "../../../components/table.vue";

const authStore = useAuthStore();
const {
  currentUser,
  likedSongs,
  userProfile,
  userPlaylist,
  totalLikedSongs,
  refetch,
  pending,
} = storeToRefs(authStore);

/// FIX LATER: refetch data when unlike songs

const q = ref("");
const searchIcon = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return likedSongs.value;
  }
  return likedSongs.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const isLiked = (id) => {
  const result = likedSongs.value.find((v) => v.id === id);
  if (result) {
    return true;
  }
};

watchEffect(() => {
  console.log(likedSongs.value);
});
</script>

<template>
  <main class="relative w-full h-full overflow-y-auto">
    <div
      class="h-screen w-full absolute top-0 z-0 bg-gradient-to-t from-zinc-900 via-indigo-700 to-violet-400"
    ></div>

    <section class="z-20 pt-20">
      <!-- HEADER -->
      <div
        class="flex flex-wrap justify-start items-end gap-7 h-[250px] w-full text-white px-6 z-10"
      >
        <div
          alt="playlist/user-image"
          class="w-[250px] h-[250px] shadow-zinc-900 shadow-2xl drop-shadow-2xl z-10 bg-cover bg-center flex justify-center items-center bg-gradient-to-br from-indigo-700 via-indigo-400 to-cyan-200"
        >
          <UIcon name="i-ph-heart-fill" class="text-8xl"></UIcon>
        </div>
        <div class="flex flex-col gap-5 text-sm font-light z-20 self-end">
          <p>Playlist</p>
          <h1 class="text-6xl font-bold">Liked Songs</h1>

          <div class="flex items-center gap-1">
            <div
              :style="{
                backgroundImage: `url(${currentUser.image})`,
              }"
              alt="user-profile"
              class="rounded-full w-[30px] h-[30px] bg-cover bg-center"
            />

            <nuxt-link
              :to="`user/${currentUser.id}`"
              class="font-semibold hover:underline hover:underline-offset-4 hover:cursor-pointer"
            >
              {{ currentUser.name }}
            </nuxt-link>

            <UIcon name="i-ph-dot-outline-fill" />
            <p v-if="likedSongs && likedSongs.length">
              {{
                `${totalLikedSongs} ${totalLikedSongs > 1 ? "songs" : "song"}`
              }}
            </p>
            <USkeleton v-else class="w-[50px] h-[20px]" />
          </div>
        </div>
      </div>

      <!-- SONG LISTSS -->
      <div>TABLE</div>

      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6 flex flex-col gap-5">
          <div class="flex px-3 py-3.5 pt-5 justify-between items-center">
            <PlayerDetailFollow :type="'liked playlist'" />

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

          <Table
            :type="'liked playlist'"
            :likedSongs="isLiked"
            :filteredRows="filteredRows"
            :userId="userProfile.id"
            :userPlaylist="userPlaylist"
            :pending="pending"
            :onIsPending="() => (pending = true)"
            :onIsRefetch="() => (refetch = true)"
          />
        </div>
      </div>
      <Footer></Footer>
    </section>
  </main>
</template>
