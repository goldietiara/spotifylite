<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { useArtistStore } from "~/stores/artist";

///get current artist
const artistStore = useArtistStore();
const { artist } = storeToRefs(artistStore);

const bgColor = ref("");
const client = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();
const load = ref(false);
const form = ref();
const files = ref("");
const state = reactive({
  artistId: artist.value?.id || 1,
  email: artist.value?.email || "goldietiara.acc@gmail.com",
  name: "",
  genre: "",
  image: "",
  imageName: artist.value?.email || "aaa",
  items: [""],
});

watch(state, () => console.log(state));

const options = [
  { label: "Avant-grade", value: "Avant-grade" },
  { label: "Blues", value: "Blues" },
  { label: "Disco", value: "Disco" },
  { label: "Funk", value: "Funk" },
  { label: "Hip Hop", value: "Hip Hop" },
  { label: "Hardcore", value: "Hardcore" },
  { label: "Hauntology", value: "Hauntology" },
  { label: "Heavy Metal", value: "Heavy Metal" },
  { label: "Instrumental", value: "Instrumental" },
  { label: "Jazz", value: "Jazz" },
  { label: "Reggae", value: "Reggae" },
  { label: "Rock", value: "Rock" },
  { label: "Rythm and Blues", value: "Rythm and Blues" },
  { label: "Soul", value: "Soul" },
  { label: "Synth-Pop", value: "Synth-Pop" },
  { label: "Pop", value: "Pop" },
  { label: "Others", value: "Others" },
];

///validation
const schema = z.object({
  artistId: z.number(),
  email: z.string().email(),
  genre: z.string(),
  name: z.string().min(3, { message: "name must be at least 3 character" }),
  image: z.string().url(),
  imageName: z.string(),
  items: z.array(z.string()),
});

type Schema = z.infer<typeof schema>;

///get image url
const uploadImage = (e: any) => {
  e.preventDefault();

  const file = e.target.files?.[0];
  if (!file) return;
  files.value = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const result = reader.result as string;
    state.image = result;
  };
};

///upload album and songs to server
async function onSubmit(event: FormSubmitEvent<Schema>) {
  let newImage = null;
  let imageName = event.data.name.replace(/ /g, "%20");
  // let imageName = event.data.name.replace(/[^a-zA-Z0-9 ] /g, "%20");
  load.value = true;

  if (files.value) {
    const { data, error } = await client.storage
      .from("spotifylite-files")
      .upload(`album-${imageName}-${event.data.email}.jpg`, files.value, {
        contentType: "image/jpeg",
      });
    if (error) {
      console.log(error);
    } else {
      newImage = data.path;
    }
  }

  try {
    const albumResult = await useFetch(`/api/create-album/`, {
      method: "POST",
      body: {
        name: event.data.name,
        image: runtimeConfig.public.bucketUrl + newImage,
        imageName: newImage,
        genre: event.data.genre,
        Artist: event.data.artistId,
      },
    });

    for (let i = 0; i < event.data.items.length - 1; i++) {
      await useFetch(`/api/create-song/`, {
        method: "POST",
        body: {
          name: event.data.items[i + 1],
          artistId: event.data.artistId,
          Album: albumResult.data.value?.id,
        },
      });
    }
    load.value = false;
    return albumResult;
  } catch (error) {
    console.log(`something went wrong: ${error}`);
  }
  navigateTo(`/artist/${artist.value.id}`);
}

///add or delete songs function
const addItem = (name: string) => {
  state.items.push(name);
};

const deleteItem = (index: number) => {
  state.items.splice(index, 1);
};

///get background color
const getImageColor = async (image: string) => {
  try {
    const color: any = await getColorFromImage(image);
    bgColor.value = color;
    console.log(bgColor.value);
  } catch (error: any) {
    console.error(error.message);
  }
};

watchEffect(async () => {
  await getImageColor(artist.value.image);
});
</script>

<template>
  <main
    class="relative w-full h-full overflow-y-auto bg-contain"
    :style="{
      backgroundImage: `url(${artist?.header})`,
    }"
  >
    <section>
      <div
        class="bg-zinc-900/30 flex flex-col gap-2 text-sm font-light p-6 pt-32"
      >
        <h1 class="text-7xl font-extrabold mb-5">New Release</h1>
      </div>

      <div class="relative bg-zinc-900">
        <div
          class="w-full h-[300px] absolute top-0 z-0 opacity-50"
          :style="{
            background: `linear-gradient(0deg, rgba(0,0,0,0) 20%, ${bgColor} 100%)`,
          }"
        ></div>

        <div class="py-10 px-6 h-full z-20 flex flex-col gap-10 items-center">
          <div class="flex gap-5 items-center">
            <div
              :style="{
                backgroundImage: `url(${artist?.image})`,
              }"
              alt="playlist/user-image"
              class="w-[90px] h-[90px] bg-zinc-800 bg-cover bg-center flex justify-center items-center rounded-full overflow-clip shadow-zinc-900 shadow-2xl drop-shadow-2xl"
            >
              <UIcon
                v-show="!artist?.image"
                class="text-6xl opacity-50"
                name="i-ph-user"
              />
            </div>
            <h1 class="text-3xl font-bold">{{ artist?.name }}</h1>
          </div>

          <UForm
            :schema="schema"
            :state="state"
            ref="form"
            @submit="onSubmit"
            class="w-[800px] flex flex-col gap-5"
          >
            <div class="flex gap-10 w-full items-center">
              <div class="w-full flex flex-col gap-5">
                <UFormGroup name="name" label="Playlist Name">
                  <UInput
                    size="xl"
                    v-model="state.name"
                    placeholder="Playlist Name"
                  />
                </UFormGroup>
                <UFormGroup name="genre" label="Genre">
                  <USelect
                    size="xl"
                    placeholder="Select"
                    v-model="state.genre"
                    :options="options"
                  />
                </UFormGroup>
              </div>
              <UFormGroup name="image" class="group">
                <label
                  for="uploadImage"
                  class="flex w-fit h-fit justify-center relative overflow-clip shadow-zinc-900 shadow-2xl drop-shadow-2xl"
                >
                  <div
                    class="text-center absolute z-20 hidden group-hover:flex flex-col bg-black/20 transition-all duration-150 ease-in-out w-full h-full justify-center items-center hover:cursor-pointer"
                  >
                    <UIcon class="text-2xl" name="i-ph-pencil" />
                    <p>Choose cover</p>
                  </div>

                  <div
                    :style="{
                      backgroundImage: `url(${state.image})`,
                    }"
                    alt="playlist/user-image"
                    class="min-w-[175px] h-[175px] bg-zinc-800 bg-cover bg-center flex justify-center items-center"
                  >
                    <UIcon
                      v-show="!state.image"
                      class="text-6xl opacity-50"
                      name="i-ph-image-square"
                    />
                  </div>
                </label>
                <Input
                  type="file"
                  id="uploadImage"
                  accept="image/*"
                  class="hidden"
                  v-model="state.image"
                  :onchange="(e:any)=>uploadImage(e)"
                />
              </UFormGroup>
            </div>
            <FormCreateSongs :data="artist" @multiply="(n) => addItem(n)" />

            <div class="flex flex-col gap-5 w-full pt-10">
              <UFormGroup label="List of Songs">
                <div
                  class="border border-1 border-gray-400 p-5 flex flex-col gap-3"
                >
                  <p
                    class="text-center text-gray-400 text-sm tracking-wider"
                    v-show="state.items.length === 1"
                  >
                    🪩 Let's jam! Add songs! 🕺🏻✨
                  </p>
                  <div
                    v-for="(item, index) in state.items"
                    class="w-full flex items-center gap-5"
                    :class="index === 0 && 'hidden'"
                  >
                    <p class="text-sm font-light text-gray-200">{{ index }}</p>
                    <div class="w-full">
                      <CardsPlaylistSongsCard
                        :type="'song'"
                        :song="item"
                        :data="state"
                        :owner="artist"
                      />
                    </div>

                    <UTooltip text="delete">
                      <UButton
                        icon="i-ph-trash-simple"
                        size="xl"
                        color="white"
                        class="hover:scale-110 transition-all ease-out duration-100 z-20 w-fit"
                        @click="deleteItem(index)"
                      />
                    </UTooltip>
                  </div>
                </div>
              </UFormGroup>
            </div>

            <div class="flex flex-col gap-5">
              <UButton
                label="Save"
                color="white"
                type="submit"
                :ui="{ rounded: 'rounded-full' }"
                class="px-7 py-4 self-end hover:scale-110 transition-all ease-out duration-100 flex justify-center items-center w-[80px]"
              >
                <p v-if="!load">Save</p>
                <UIcon
                  v-else
                  class="bg-green-500 animate-spin text-xl"
                  name="i-ph-circle-notch-bold"
                />
              </UButton>
              <p class="text-xs">
                By proceeding, you agree to give Spotify access to the image you
                choose to upload. Please make sure you have the right to upload
                the image.
              </p>
            </div>
          </UForm>
        </div>
      </div>
    </section>
  </main>
</template>
