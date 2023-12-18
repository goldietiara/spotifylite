<script setup>
const { type, isArtist, artistId } = defineProps([
  "type",
  "isArtist",
  "artistId",
]);
const emit = defineEmits(["openModal", "openArtistModal"]);

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
</script>

<template>
  <div class="flex items-center gap-3">
    <UButton
      v-show="type !== 'user'"
      size="xl"
      :ui="{
        rounded: 'rounded-full',
      }"
      class="p-4 hover:scale-110 transition-all ease-out duration-100 z-20"
    >
      <UIcon name="i-heroicons-play-20-solid" class="text-3xl" />
    </UButton>

    <UDropdown
      v-show="type !== 'liked playlist'"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        background: 'bg-zinc-800 dark:bg-zinc-800',
        item: {
          active:
            'bg-zinc-700 dark:bg-zinc-700 text-gray-200 dark:text-gray-200',
        },
      }"
    >
      <UIcon
        name="i-majesticons-more-menu"
        class="text-6xl bg-gray-400 hover:scale-110 hover:bg-gray-200 transition-all ease-out duration-150 z-20"
      />
    </UDropdown>
  </div>
</template>
