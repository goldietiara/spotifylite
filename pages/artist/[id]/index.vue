<script setup>
import { useAuthStore } from "~/stores/auth";
import { useArtistStore } from "~/stores/artist";
const bgColor = ref("");

///current user store
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

///get artist
const artistStore = useArtistStore();
const { artist, artistAlbum, refetchArtist } = storeToRefs(artistStore);

const isOpen = ref(false);
const isArtistOpen = ref(false);
const client = useSupabaseClient();

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
  await getImageColor(artist.value.header);
});
</script>

<template>
  <main
    class="relative w-full h-full overflow-y-auto bg-contain"
    :style="{
      backgroundImage: `url(${artist.header})`,
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
        <h1 class="text-7xl font-extrabold mb-5">{{ artist.name }}</h1>
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
            class="mb-5"
          />

          <UModal v-model="isOpen">
            <FormCreateArtist
              :type="'update'"
              :data="artist"
              :onCloseModal="() => (isOpen = onCloseModal)"
              :onIsRefetch="() => (refetch = true)"
            />
          </UModal>

          <div class="flex flex-col gap-10">
            <CardsPlaylistUserCard
              :type="'album'"
              :data="artistAlbum"
              :owner="artist"
              :name="'Albums'"
            />

            <CardsPlaylistUserCard
              :type="'album'"
              :data="artistAlbum"
              :owner="artist"
              :name="`Featuring ${artist.name}`"
            />
            <CardsPlaylistUserCard
              :data="followers"
              :type="'user'"
              :name="'Fans also like'"
            />
          </div>
          <Footer></Footer>
        </div>
      </div>
    </section>
  </main>
</template>
