<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

/// FIX LATER: i think user can have no pict, but idk still thinking bout it

const runtimeConfig = useRuntimeConfig();
const client = useSupabaseClient();

const { data, type } = defineProps(["data", "type"]);

const load = ref(false);
const files = ref("");
const form = ref();
const emit = defineEmits(["closeModal", "isRefetch"]);

///update user or playlist state
const state = reactive({
  name: data.name,
  email: data.author.email,
  image: data.image || "wawa",
  imageName:
    data.imageName ||
    `${type === "user" ? "user" : "playlist"}-${
      type === "user" ? data.id : data.author.id + "-" + data.id
    }-${type === "user" ? data.image : data.author.email}.jpg`,
  description: data?.description || "",
});

watchEffect(() => console.log(state));

///for validation
const schema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character" })
    .nonempty(),
  email: z.string().email(),
  image: z.nullable(z.string().url()),
  imageName: z.string(),
  description: z.nullable(z.string()),
});
type Schema = z.infer<typeof schema>;

/// get image files and read image as URL
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

///update user or playlist function
async function onSubmit(event: FormSubmitEvent<Schema>) {
  let newImage = null;
  load.value = true;

  if (files.value) {
    const { data, error } = await client.storage
      .from("spotifylite-files")
      .upload(event.data.imageName, files.value, {
        contentType: "image/jpeg",
        upsert: true,
      });
    if (error) {
      console.log(error);
    } else {
      newImage = data.path;
    }
  }

  if (type === "playlist") {
    try {
      await useFetch(`/api/update-playlist/${data.id}`, {
        method: "patch",
        body: {
          name: event.data.name,
          image: runtimeConfig.public.bucketUrl + newImage,
          imageName: newImage,
          description: event.data.description,
        },
      });
      load.value = false;
      emit("closeModal", false);
    } catch (error) {
      console.log(`error updating user: ${error}`);
      load.value = false;
    }
  }

  if (type === "user") {
    try {
      await useFetch(`/api/update-user/${data.id}`, {
        method: "patch",
        body: {
          name: event.data.name,
          image: runtimeConfig.public.bucketUrl + newImage,
          imageName: newImage,
        },
      });
      load.value = false;
      emit("closeModal", false);
    } catch (error) {
      console.log(`error updating user: ${error}`);
      load.value = false;
    }
  }
  emit("isRefetch", true);
}
</script>

<template>
  <div class="p-5 flex flex-col gap-5">
    <h1 class="text-xl font-bold">
      {{ type.charAt(0).toUpperCase() + type.slice(1) }} details
    </h1>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      class="flex gap-5 h-full w-full"
    >
      <UFormGroup
        name="image"
        class="group flex w-fit h-fit justify-center relative"
      >
        <label for="uploadImage" class="w-fit h-fit">
          <div
            class="absolute z-20 hidden group-hover:flex flex-col gap-2 bg-black/20 transition-all duration-150 ease-in-out w-full h-full justify-center items-center hover:cursor-pointer"
            :class="type === 'user' ? 'rounded-full' : 'rounded-none'"
          >
            <UIcon class="text-6xl" name="i-ph-pencil" />
            <p>Choose Photo</p>
          </div>

          <div
            :style="{
              backgroundImage: `url(${state.image ? state.image : data.image})`,
            }"
            alt="playlist/user-image"
            class="min-w-[192px] h-[192px] shadow-zinc-900 shadow-2xl drop-shadow-2xl bg-cover bg-center flex justify-center items-center"
            :class="type === 'user' ? 'rounded-full' : 'rounded-none'"
          >
            <UIcon
              v-show="state.image.length < 1"
              class="opacity-30 text-8xl"
              name="i-ph-music-notes"
            />
          </div>
        </label>
        <!-- <input
          type="file"
          accept="image/*"
          id="uploadImage"
          
        /> -->
        <input
          id="uploadImage"
          accept="image/*"
          type="file"
          class="hidden"
          @change="(e:any)=>uploadImage(e)"
        />
      </UFormGroup>

      <div class="flex flex-col gap-5 h-full w-full self-center">
        <UFormGroup name="name">
          <UInput
            size="xl"
            :placeholder="data.name"
            color="gray"
            variant="outline"
            v-model="state.name"
          />
        </UFormGroup>

        <UFormGroup name="description">
          <UTextarea
            v-show="type !== 'user'"
            color="gray"
            variant="outline"
            size="xl"
            :rows="4"
            v-model="state.description"
          />
        </UFormGroup>

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
      </div>
    </UForm>
    <p class="text-xs z-50">
      By proceeding, you agree to give Spotify access to the image you choose to
      upload. Please make sure you have the right to upload the image.
    </p>
  </div>
</template>
