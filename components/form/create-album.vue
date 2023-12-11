<script setup lang="ts">
import { z } from "zod";

const emit = defineEmits(["closeModal"]);

const albumState = reactive({
  name: "",
  genre: "",
  image: "",
  imageName: "",
});

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

export const albumSchema = z.object({
  artistId: z.number(),
  email: z.string().email().nonempty(),
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character" })
    .nonempty(),
  image: z.string().url().nonempty(),
  imageName: z.string().nonempty(),
});

export type TAlbumSchema = z.infer<typeof albumSchema>;

const files = ref("");

const uploadImage = (e: any) => {
  e.preventDefault();

  const file = e.target.files?.[0];
  if (!file) return;
  files.value = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const result = reader.result as string;
    albumState.image = result;
  };
};
</script>

<template>
  <div class="flex gap-10 w-full items-center">
    <div class="w-full flex flex-col gap-5">
      <UFormGroup name="name" label="Playlist Name">
        <UInput
          size="xl"
          v-model="albumState.name"
          placeholder="Playlist Name"
        />
      </UFormGroup>
      <UFormGroup name="genre" label="Genre">
        <USelect
          size="xl"
          placeholder="Select"
          v-model="albumState.genre"
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
            backgroundImage: `url(${albumState.image})`,
          }"
          alt="playlist/user-image"
          class="min-w-[175px] h-[175px] bg-zinc-800 bg-cover bg-center flex justify-center items-center"
        >
          <UIcon
            v-show="!albumState.image"
            class="text-6xl opacity-50"
            name="i-ph-user"
          />
        </div>
      </label>
      <Input
        id="uploadImage"
        accept="image/*"
        type="file"
        class="hidden"
        v-model="albumState.image"
        :onchange="(e:any)=>uploadImage(e)"
      />
    </UFormGroup>
  </div>
</template>
