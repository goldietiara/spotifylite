<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import type { TPlaylist } from "~/types";

const router = useRouter();

const {
  filteredRows,
  likedSongs,
  type,
  userId,
  playlistId,
  userPlaylist,
  pending,
} = defineProps([
  "filteredRows",
  "likedSongs",
  "type",
  "userId",
  "playlistId",
  "userPlaylist",
  "pending",
]);
const emit = defineEmits(["isRefetch", "isPending"]);
// const load = ref(false);
const loadId = ref(0);
const currentPlaylistId = ref(0);
watchEffect(() => console.log(userId));
watchEffect(() => {
  currentPlaylistId.value = playlistId;
});

const columns = [
  {
    key: "id",
    label: "#",
    class: " w-[50px]",
    sortable: true,
  },
  {
    key: "name",
    label: "Title",
    sortable: true,
  },
  {
    key: "albumName",
    label: "Album",
    sortable: true,
  },
  {
    key: "like",
  },
];

async function likingSong(id: number, userId: number) {
  loadId.value = id;
  emit("isPending", true);
  console.log(id);
  console.log(userId);

  try {
    const result = await useFetch(`/api/liking-song/`, {
      method: "patch",
      body: {
        songId: id,
        userProfileId: userId,
      },
    });

    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
  emit("isRefetch", true);
}

async function UnLike(id: number, userId: number) {
  loadId.value = id;
  emit("isPending", true);
  console.log(id);
  console.log(userId);

  try {
    await useFetch(`/api/unlike-song/`, {
      method: "patch",
      body: {
        songId: id,
        userProfileId: userId,
      },
    });

    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
  emit("isRefetch", true);
}

async function addToPlaylist(id: number, playlistId: number) {
  console.log(id);
  console.log(userId);

  try {
    await useFetch(`/api/update-playlist-add-song`, {
      method: "patch",
      body: {
        songId: id,
        playlistId: playlistId,
      },
    });

    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
  emit("isRefetch", true);
}

async function removeFromPlaylist(id: number, playlistId: number) {
  console.log(id);
  console.log(userId);

  try {
    await useFetch(`/api/update-playlist-remove-song`, {
      method: "patch",
      body: {
        songId: id,
        playlistId: playlistId,
      },
    });

    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
  emit("isRefetch", true);
}

const dropdownItems = [
  [
    {
      label: "Add to playlist",
      icon: "i-ph-plus",
      slot: "adding",
      class: `${type === "playlist" ? "hidden" : ""} grid`,
      ///FIX LATER: will add validation, this option will be hidden only on user own playlist
    },
    {
      label: "Remove from this playlist",
      icon: "i-ph-trash-simple",
      slot: "remove",
      class: `${type !== "playlist" ? "hidden" : ""} grid`,
    },
  ],
];

const playlist = [
  userPlaylist.map((v: { name: string; id: number }) => {
    return { label: v.name, id: v.id };
  }),
];
</script>

<template>
  <UTable
    :rows="filteredRows"
    :columns="columns"
    :ui="{
      default: {
        sortButton: {
          icon: '',
        },
      },
    }"
    :sort-asc-icon="'i-heroicons-chevron-up-20-solid'"
    :sort-desc-icon="'i-heroicons-chevron-down-20-solid'"
    :sort-button="{
      color: 'black',
      size: 'lg',
      variant: 'ghost',
    }"
  >
    <template #id-data="{ row, index }">
      {{ index + 1 }}
    </template>

    <template #name-data="{ row }">
      <div class="flex justify-start gap-4 items-center">
        <div
          v-show="type !== 'album'"
          :style="{ backgroundImage: `url(${row.Album.image})` }"
          alt="playlist/songs-image"
          class="h-[50px] min-w-[50px] bg-cover bg-center rounded-sm"
        ></div>
        <div>
          <h1
            class="font-semibold text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ row.name }}
          </h1>
          <p
            class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
            @click="router.push(`/artist/${row.Album.Artist.id}`)"
          >
            {{ row.Album.Artist.name }}
          </p>
        </div>
      </div>
    </template>
    <template #albumName-data="{ row }">
      <p
        class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        @click="router.push(`/album/${row.Album.id}`)"
      >
        {{ row.Album.name }}
      </p>
    </template>
    <template #like-data="{ row }">
      <div class="px-5 w-fit flex gap-5 items-center">
        <UTooltip
          :text="
            likedSongs(row.id)
              ? 'Remove from Your Library'
              : 'Save to Your Library'
          "
        >
          <UIcon
            v-if="pending && loadId === row.id"
            class="bg-green-500 animate-spin text-xl"
            name="i-ph-circle-notch-bold"
          />
          <div v-else class="-mb-1">
            <UIcon
              v-if="likedSongs(row.id)"
              @click="UnLike(row.id, userId)"
              class="text-xl bg-green-400 hover:bg-green-300 hover:cursor-pointer hover:scale-110"
              name="i-ph-heart-fill"
            />

            <UIcon
              v-else
              @click="likingSong(row.id, userId)"
              class="text-xl opacity-0 hover:cursor-pointer group-hover:opacity-100 hover:bg-gray-200 hover:scale-110 transition-all duration-100 ease-in-out"
              name="i-ph-heart"
            />
          </div>
        </UTooltip>

        <UDropdown :items="dropdownItems" :popper="{ placement: 'auto' }">
          <UIcon
            name="i-majesticons-more-menu"
            class="text-4xl bg-gray-400 hover:scale-110 hover:bg-gray-200 transition-all ease-out duration-150"
          />
          <template #remove="{ item }">
            <p @click="removeFromPlaylist(row.id, currentPlaylistId)">
              {{ item.label }} {{ row.id }}
            </p>
          </template>
          <template #adding="{ item }">
            <UDropdown
              mode="hover"
              :items="playlist"
              :popper="{ placement: 'auto' }"
            >
              <p class="flex gap-3 items-center w-full">
                <UIcon :name="item.icon" /> {{ item.label }}
              </p>
              <template #item="{ item }">
                <p
                  class="text-left w-full"
                  @click="addToPlaylist(row.id, item.id)"
                >
                  {{ item.label }}
                </p>
              </template>
            </UDropdown>
          </template>
        </UDropdown>
      </div>
    </template>
  </UTable>
</template>
