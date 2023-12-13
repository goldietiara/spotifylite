<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const router = useRouter();
const { filteredRows, likedSongs, type, data } = defineProps([
  "filteredRows",
  "likedSongs",
  "type",
  "data",
]);

// console.log(data.likedSongs);
// watch(data, () => {
//   likedSongs();
// });

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

const state = reactive({
  like: "",
});

watch(state, () => console.log(state));

const schema = z.object({
  like: z.string(),
});

type Schema = z.infer<typeof schema>;

async function likingSong(id: number, userId: number) {
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

    return result;
    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
}
async function UnLike(id: number, userId: number) {
  console.log(id);
  console.log(userId);

  try {
    const result = await useFetch(`/api/unlike-song/`, {
      method: "patch",
      body: {
        songId: id,
        userProfileId: userId,
      },
    });

    return result;
    // isLoading.value = false
  } catch (error) {
    console.log(`error updating user: ${error}`);
    // isLoading.value = false
  }
}

const items = [
  [
    {
      label: "Add to playlist",
      icon: "i-ph-plus",
    },
  ],
];
const addToPlaylist = [
  [
    {
      label: "Add to playlist",
      icon: "i-ph-plus",
    },
    {
      label: "Add to playlist",
      icon: "i-ph-plus",
    },
    {
      label: "Add to playlist",
      icon: "i-ph-plus",
    },
  ],
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
          v-show="type == 'playlist'"
          :style="{ backgroundImage: `url(${row.image})` }"
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
            @click="router.push(`/artist/${row.artistId}`)"
          >
            {{ row.artist }}
          </p>
        </div>
      </div>
    </template>
    <template #albumName-data="{ row }">
      <p
        class="hover:underline hover:underline-offset-4 hover:cursor-pointer"
        @click="router.push(`/album/${row.albumId}`)"
      >
        {{ row.albumName }}
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
            @click="UnLike(row.id, data.id)"
            class="text-xl bg-green-400 hover:bg-green-300 hover:cursor-pointer hover:scale-110"
            name="i-ph-heart-fill"
            v-if="likedSongs(row.id)"
          />
          <UIcon
            @click="likingSong(row.id, data.id)"
            class="text-xl opacity-0 hover:cursor-pointer group-hover:opacity-100 hover:bg-gray-200 hover:scale-110 transition-all duration-100 ease-in-out"
            name="i-ph-heart"
            v-else
          />
        </UTooltip>

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
            class="text-4xl bg-gray-400 hover:scale-110 hover:bg-gray-200 transition-all ease-out duration-150 z-20"
          />
        </UDropdown>
      </div>
    </template>
  </UTable>
</template>
