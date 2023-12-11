<script setup>
import Table from "../../../components/table.vue";

const router = useRouter();
const userSession = useSupabaseUser();
const userStore = useUserStore();
const { userByEmail, getUserLikes, getUserLikesPlaylist } =
  storeToRefs(userStore);
const { getUserByEmail } = userStore;

const isOpen = ref(false);

const getCurrentPlaylist = async (email) => {
  try {
    userByEmail.value = await getUserByEmail(email);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

onBeforeMount(() => {
  getCurrentPlaylist(userSession.value.user_metadata.email);
});

onMounted(() => {
  watch(userByEmail, () => {
    getUserLikes.value;
    console.log(userByEmail.value);
  });
});

const q = ref("");

const searchIcon = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return getUserLikesPlaylist.value;
  }
  return getUserLikesPlaylist.value.filter((person) => {
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

const go = (id) => {
  router.push(`/user/${id}`);
};
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
          <h1 class="text-6xl font-bold">Liked Playlist</h1>

          <div class="flex items-center gap-1">
            <div
              :style="{
                backgroundImage: `url(${userByEmail.image})`,
              }"
              v-show="type !== 'user'"
              alt="user-profile"
              class="rounded-full w-[30px] h-[30px] bg-cover bg-center"
            />

            <p
              :class="
                type !== 'user' &&
                'font-semibold hover:underline hover:underline-offset-4 hover:cursor-pointer'
              "
              @click="go(userByEmail.id)"
            >
              {{ userByEmail.name }}
            </p>

            <UIcon name="i-ph-dot-outline-fill" />
            <p
              :class="
                type === 'user' &&
                ' hover:underline hover:underline-offset-4 hover:cursor-pointer'
              "
            >
              {{ `${getUserLikesPlaylist.length} songs` }}
            </p>
          </div>
        </div>
      </div>

      <!-- SONG LISTSS -->
      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6 flex flex-col gap-5">
          <div class="flex px-3 py-3.5 pt-5 justify-between items-center">
            <PlayerDetailFollow
              :type="'liked playlist'"
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
              :data="data"
              :type="'playlist'"
              :onCloseModal="() => (isOpen = onCloseModal)"
            />
          </UModal>

          <Table
            :type="'playlist'"
            :likedSongs="likedSongs"
            :filteredRows="filteredRows"
            :data="userByEmail.userProfile"
          />
        </div>
      </div>
      <Footer></Footer>
    </section>
  </main>
</template>
