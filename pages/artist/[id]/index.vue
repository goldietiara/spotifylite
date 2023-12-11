<script setup>
const route = useRoute();
const bgColor = ref("");
const artistId = ref(route.params.id);
const client = useSupabaseClient();

const userStore = useUserStore();
const { artistById } = storeToRefs(userStore);
const { getArtistById } = userStore;

const isOpen = ref(false);

const getCurrentArtist = async (id) => {
  try {
    artistById.value = await getArtistById(id);
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};

onBeforeMount(() => {
  getCurrentArtist(artistId.value);
});

onMounted(() => {
  watch(artistById, () => {
    getImageColor(artistById.value?.image);
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
  <main
    class="relative w-full h-full overflow-y-auto bg-contain"
    :style="{
      backgroundImage: `url(${artistById.header})`,
    }"
  >
    <section>
      <div
        class="bg-zinc-900/30 flex flex-col gap-2 text-sm font-light p-6 pt-32"
      >
        <div class="flex items-center gap-1">
          <UIcon
            class="bg-sky-500 text-3xl"
            name="i-ph-circle-wavy-check-fill"
          />
          <p>Verified Artist</p>
        </div>
        <h1 class="text-7xl font-extrabold mb-5">{{ artistById?.name }}</h1>
        <p class="text-base">2,506,606 monthly listeners</p>
      </div>

      <div class="relative bg-zinc-900">
        <div
          class="w-full h-[300px] absolute top-0 z-0 opacity-50"
          :style="{
            background: `linear-gradient(0deg, rgba(0,0,0,0) 20%, ${bgColor} 100%)`,
          }"
        ></div>

        <div class="py-3 px-6">
          <PlayerDetailFollow
            :type="'artist'"
            @open-modal="isOpen = true"
            class="mt-4 mb-9"
          />

          <UModal v-model="isOpen">
            <FormCreateArtist
              :data="artistById"
              :type="'artist'"
              :onCloseModal="() => (isOpen = onCloseModal)"
              :client="client"
            />
          </UModal>

          <div class="flex flex-col gap-10">
            <CardsPlaylistUserCard
              :data="artistById"
              :type="'album'"
              :name="'Popular'"
            />

            <CardsPlaylistUserCard
              :data="artistById"
              :userProfile="artistById"
              :type="'user'"
              :name="'Following'"
            />
            <CardsPlaylistUserCard
              :data="artistById"
              :userProfile="artistById"
              :type="'user'"
              :name="'Followers'"
            />
          </div>
          <Footer></Footer>
        </div>
      </div>
    </section>
  </main>
</template>
