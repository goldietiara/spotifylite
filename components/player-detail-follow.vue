<script setup>
const {
  type,
  isArtist,
  artistId,
  authId,
  paramsId,
  isFollowed,
  isLiked,
  pending,
} = defineProps([
  "type",
  "isArtist",
  "artistId",
  "authId",
  "paramsId",
  "isFollowed",
  "isLiked",
  "pending",
]);
const emit = defineEmits([
  "openModal",
  "openArtistModal",
  "isRefetch",
  "isPending",
]);
watchEffect(() => {
  console.log(`auth: ${authId}`);
  console.log(`user: ${paramsId}`);
});

const items = [
  [
    {
      label: `Edit ${
        type === "playlist"
          ? "Playlist"
          : type === "album"
          ? "Album"
          : "Profile"
      }`,
      icon: "i-heroicons-pencil-square-20-solid",
      class: `${authId === paramsId ? "flex" : "hidden"}`,
      click: () => {
        emit("openModal", true);
      },
    },
    {
      label: "Copy link to profile",
      icon: "i-heroicons-arrow-up-tray-20-solid",
      click: () => {
        console.log("shared");
      },
    },
    {
      label: `${isArtist ? "Artists account" : "Get access to Artists"}`,
      icon: "i-ph-shooting-star",
      class: `${type !== "user" && "hidden"}`,
      click: () => {
        if (isArtist) {
          navigateTo(`/artist/${artistId}`);
        } else if (!isArtist) {
          emit("openArtistModal", true);
        }
      },
    },
    {
      label: "Release new album",
      icon: "i-ph-vinyl-record",
      class: `${type !== "artist" && "hidden"}`,
      click: () => {
        navigateTo("/new-release");
      },
    },
  ],
];

async function follow(userId, currentUserId) {
  emit("isPending", true);

  try {
    await useFetch(`/api/follow-user`, {
      method: "patch",
      body: {
        userId: userId,
        currentUserId: currentUserId,
      },
    });
  } catch (error) {
    console.log(`error updating user: ${error}`);
  }
  emit("isRefetch", true);
}

async function unfollow(userId, currentUserId) {
  emit("isPending", true);

  try {
    await useFetch(`/api/unfollow-user`, {
      method: "patch",
      body: {
        userId: userId,
        currentUserId: currentUserId,
      },
    });
  } catch (error) {
    console.log(`error updating user: ${error}`);
  }
  emit("isRefetch", true);
}

async function liking(id, currentUserId) {
  emit("isPending", true);

  if (type === "playlist") {
    try {
      await useFetch(`/api/liking-playlist`, {
        method: "patch",
        body: {
          playlistId: id,
          userProfileId: currentUserId,
        },
      });
    } catch (error) {
      console.log(`error updating user: ${error}`);
    }
  }
  if (type === "album") {
    try {
      await useFetch(`/api/liking-album`, {
        method: "patch",
        body: {
          albumId: id,
          userProfileId: currentUserId,
        },
      });
    } catch (error) {
      console.log(`error updating user: ${error}`);
    }
  }

  emit("isRefetch", true);
}

async function unlike(id, currentUserId) {
  emit("isPending", true);

  if (type === "playlist") {
    try {
      await useFetch(`/api/unlike-playlist`, {
        method: "patch",
        body: {
          playlistId: id,
          userProfileId: currentUserId,
        },
      });
    } catch (error) {
      console.log(`error updating user: ${error}`);
    }
  }
  if (type === "album") {
    try {
      await useFetch(`/api/unlike-album`, {
        method: "patch",
        body: {
          albumId: id,
          userProfileId: currentUserId,
        },
      });
    } catch (error) {
      console.log(`error updating user: ${error}`);
    }
  }

  emit("isRefetch", true);
}
</script>

<template>
  <div class="flex items-center gap-5">
    <!-- player -->
    <UButton
      v-show="type !== 'user'"
      size="xl"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="p-4 hover:scale-110 transition-all ease-out duration-100 z-20 focus:scale-100 active:scale-95"
    >
      <UIcon name="i-heroicons-play-20-solid" class="text-3xl" />
    </UButton>

    <!-- follow/unfollow -->
    <UButton
      v-show="paramsId !== authId && type === 'user'"
      size="xl"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="p-2 hover:scale-110 transition-all ease-out duration-100 z-20 bg-transparent dark:bg-transparent hover:bg-transparent hover:outline-white dark:hover:bg-transparent focus:outline focus:scale-100 active:scale-95 outline-2 outline outline-gray-400"
    >
      <UIcon
        v-if="pending"
        class="bg-green-500 animate-spin text-xl px-5"
        name="i-ph-circle-notch-bold"
      />
      <p
        v-else
        @click="
          isFollowed ? unfollow(paramsId, authId) : follow(paramsId, authId)
        "
        class="px-3 text-white"
      >
        {{ isFollowed ? "Following" : "Follow" }}
      </p>
    </UButton>

    <!-- like/unlike -->

    <div v-show="type === 'playlist' || type === 'album'" class="-mb-1">
      <UIcon
        v-if="pending"
        class="bg-green-500 animate-spin text-xl px-5"
        name="i-ph-circle-notch-bold"
      />
      <div v-else>
        <UIcon
          @click="liking(paramsId, authId)"
          class="text-3xl hover:scale-110 transition-all ease-out duration-150 z-20 cursor-pointer focus:scale-100 active:scale-95"
          :class="isLiked ? 'bg-green-500' : 'bg-gray-400 hover:bg-gray-200'"
          :name="isLiked ? 'i-ph-heart-fill' : 'i-ph-heart'"
        />
      </div>
    </div>

    <!-- user option? -->
    <UDropdown
      v-show="type !== 'liked playlist'"
      :items="items"
      :popper="{ placement: 'auto' }"
      :ui="{
        background: 'bg-zinc-800 dark:bg-zinc-800',
        item: {
          active:
            'bg-zinc-700 dark:bg-zinc-700 text-gray-200 dark:text-gray-200',
        },
      }"
    >
      <UIcon
        name="i-ph-dots-three"
        class="text-4xl bg-gray-400 hover:scale-110 hover:bg-gray-200 transition-all ease-out duration-150 z-20 focus:scale-100 active:scale-95"
      />
      <!-- <UIcon
        name="i-majesticons-more-menu"
        class="text-6xl bg-gray-400 hover:scale-110 hover:bg-gray-200 transition-all ease-out duration-150 z-20"
      /> -->
    </UDropdown>
  </div>
</template>
