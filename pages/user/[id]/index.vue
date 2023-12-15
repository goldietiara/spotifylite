<script setup>
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
const bgColor = ref("");

///FIX LATER: check if current user is on its own profile/playlist

///current user store
const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

///user store
const userStore = useUserStore();
const {
  userById,
  userByIdProfile,
  userByIdPlaylist,
  userByIdFollowing,
  userByIdFollowers,
  refetchUserById,
} = storeToRefs(userStore);

const isOpen = ref(false);
const isArtistOpen = ref(false);

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
  await getImageColor(userById.value.image);
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
      <CardsPlaylistProfileHeader :type="'user'" :data="userById" />

      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="py-3 px-6">
          <PlayerDetailFollow
            :isArtist="userById.isArtist"
            :artistId="userById.artistId"
            :type="'user'"
            @open-modal="isOpen = true"
            @open-artist-modal="isArtistOpen = true"
            class="mb-5"
          />

          <UModal v-model="isOpen">
            <FormPlaylistUserUpdate
              :type="'user'"
              :data="userById"
              :onCloseModal="() => (isOpen = onCloseModal)"
              :onIsRefetch="() => (refetchUserById = true)"
            />
          </UModal>

          <UModal v-model="isArtistOpen">
            <FormCreateArtist
              :type="'create'"
              :data="userById"
              :onCloseModal="() => (isArtistOpen = onCloseModal)"
              :onIsRefetch="() => (refetchUserById = true)"
            />
          </UModal>

          <div class="flex flex-col gap-10">
            <CardsPlaylistUserCard
              :type="'playlist'"
              :data="userByIdPlaylist"
              :owner="userById"
              :name="'Public Playlist'"
            />

            <CardsPlaylistUserCard
              :data="userByIdFollowing"
              :type="'user'"
              :name="'Following'"
            />
            <CardsPlaylistUserCard
              :data="userByIdFollowers"
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
