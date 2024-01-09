<script setup>
import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "~/stores/user";
const bgColor = ref("");

///FIX LATER: check if current user is on its own profile/playlist

///current user store
const authStore = useAuthStore();
const { currentUser, following, refetch, pending } = storeToRefs(authStore);

///user store
const userStore = useUserStore();
const {
  userById,
  userByIdProfile,
  userByIdPlaylist,
  userByIdFollowing,
  userByIdFollowers,
  refetchUserById,
  totalFollowers,
  totalFollowing,
  totalPlaylist,
} = storeToRefs(userStore);

const isOpen = ref(false);
const isArtistOpen = ref(false);
const route = useRoute();
const userId = parseInt(route.params.id);

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

const ifFollowed = computed(() => {
  if (!following) return;
  const followed = following.value.find((v) => v.id === userId);
  if (followed) {
    return true;
  } else return false;
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
        :type="'user'"
        :data="userById"
        :totalFollowers="totalFollowers"
        :totalFollowing="totalFollowing"
        :totalPlaylist="totalPlaylist"
      />

      <div class="mt-10 relative">
        <div class="w-full h-[500px] bg-zinc-900/20 absolute top-0 z-0"></div>
        <div class="pb-3 pt-12 px-6 flex flex-col gap-5">
          <PlayerDetailFollow
            :isArtist="userById.isArtist"
            :artistId="userById.artistId"
            :type="'user'"
            :authId="parseInt(currentUser.id)"
            :paramsId="userId"
            :isFollowed="ifFollowed"
            :pending="pending"
            :onIsPending="() => (pending = true)"
            :onIsRefetch="() => (refetch = true)"
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
