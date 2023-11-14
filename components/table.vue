<script setup>
const { PlaylistSongs } = defineProps(["PlaylistSongs"]);
const q = ref("");

const searchIcon = ref(false);

const filteredRows = computed(() => {
  if (!q.value) {
    return PlaylistSongs.songs;
  }

  return PlaylistSongs.songs.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase());
    });
  });
});

const likedSongs = (id) => {
  const result = PlaylistSongs.likedSongs.find((v) => v.id === id);
  if (result) {
    return true;
  }
};

const columns = [
  {
    key: "id",
    label: "#",
    sortable: false,
    class: " w-[50px]",
  },
  {
    key: "name",
    label: "Title",
    sortable: true,
  },
  {
    key: "album",
    label: "Album",
    sortable: true,
  },
  {
    key: "like",
  },
];

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      // shortcuts: ["E"],
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Share",
      icon: "i-heroicons-arrow-up-tray-20-solid",
      // shortcuts: ["D"],
      click: () => {
        console.log("shared");
      },
    },
  ],
];
</script>

<template>
  <div class="flex px-3 py-3.5 pt-5 justify-between items-center">
    <div class="flex items-center gap-3">
      <UButton
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
        class="p-4 hover:scale-110 transition-all ease-out duration-100"
      >
        <UIcon name="i-heroicons-play-20-solid" class="text-3xl" />
      </UButton>
      <UDropdown
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
        <UIcon name="i-majesticons-more-menu" class="text-6xl bg-gray-400" />
      </UDropdown>
    </div>

    <div
      class="mr-0 h-[32px] w-[32px] rounded-full flex justify-center items-center hover:bg-white/10 hover:cursor-pointer transition-all duration-300"
      @click="searchIcon = !searchIcon"
      v-if="!searchIcon"
    >
      <UIcon
        name="i-heroicons-magnifying-glass-20-solid"
        class="bg-gray-400 flex-shrink-0 h-5 w-5"
      />
    </div>

    <UInput
      v-else
      v-model="q"
      placeholder="Search in Playlist"
      icon="i-heroicons-magnifying-glass-20-solid"
      color="white"
      variant="outline"
      class="transition-all duration-300"
      :trailing="false"
      :sort="{ column: 'title' }"
      :ui="{
        base: 'bg-transparent placeholder-white dark:placeholder-white',
        variant: {
          outline:
            'shadow-sm bg-transparent text-white dark:text-white ring-0 placeholder-white dark:placeholder-white',
        },
        icon: {
          base: 'flex-shrink-0 text-gray-400 dark:text-gray-400',
        },
        color: {
          white: {
            outline:
              'shadow-sm bg-white/10 dark:bg-white/10 text-white dark:text-gray-400 placeholder-white dark:placeholder-gray-400 ring-0 ring-inset ring-transparent dark:ring-transparent focus:ring-0 focus:ring-transparent dark:focus:ring-transparent',
          },
        },
      }"
    />
  </div>
  <UTable
    v-model="selected"
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
      ui: {
        base: 'hover:text-white',
      },
    }"
  >
    <template #id-data="{ row, index }">
      {{ index + 1 }}
    </template>
    <template #name-data="{ row }">
      <div class="flex justify-start gap-4 items-center">
        <img class="w-[50px] h-[50px] bg-pink-200 rounded-sm" :src="row.img" />
        <div>
          <h1
            class="font-semibold text-gray-200 whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ row.name }}
          </h1>
          <p>{{ row.artist }}</p>
        </div>
      </div>
    </template>

    <template #like-data="{ row }">
      <div class="px-5 w-fit">
        <UIcon
          class="text-xl hover:cursor-pointer bg-green-400"
          name="i-majesticons-heart"
          v-if="likedSongs(row.id)"
        />
        <UIcon
          class="text-xl opacity-0 hover:cursor-pointer group-hover:opacity-100"
          name="i-majesticons-heart-line"
          v-else
        />
      </div>
    </template>
  </UTable>
</template>
