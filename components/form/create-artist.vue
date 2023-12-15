<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const runtimeConfig = useRuntimeConfig();
const client = useSupabaseClient();

const { data, type } = defineProps(["data", "type"]);

const load = ref(false);
const form = ref();
const files = ref("");
const filesHeader = ref("");
const emit = defineEmits(["closeModal", "isRefetch"]);

const state = reactive({
  userId: data.id,
  email: data.email,
  name: data.name,
  image: data.image || "",
  imageName: data.imageName || "",
  header: data.header || "",
  headerName: data.headerName || "",
});

watch(state, () => {
  console.log(state);
});

const schema = z.object({
  userId: z.number(),
  email: z.string().email().nonempty(),
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character" })
    .nonempty(),
  image: z.string().url().nonempty(),
  imageName: z.string().nonempty(),
  header: z.string().url().nonempty(),
  headerName: z.string().nonempty(),
});
type Schema = z.infer<typeof schema>;

onMounted(() => {
  files.value = data.avatar_url;
});

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

const uploadHeader = (e: any) => {
  e.preventDefault();

  const file = e.target.files?.[0];
  if (!file) return;
  filesHeader.value = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const result = reader.result as string;
    state.header = result;
    state.headerName = result;
  };
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  let newImage = null;
  let newHeader = null;
  load.value = true;

  if (files.value) {
    const { data, error } = await client.storage
      .from("spotifylite-files")
      .upload(`artist-${event.data.email}.jpg`, files.value, {
        contentType: "image/jpeg",
      });
    if (error) {
      console.log(error);
    } else {
      newImage = data.path;
    }
  }
  if (filesHeader.value) {
    const { data, error } = await client.storage
      .from("spotifylite-files")
      .upload(`header-${event.data.email}.jpg`, filesHeader.value, {
        contentType: "image/jpeg",
      });
    if (error) {
      console.log(error);
    } else {
      newHeader = data.path;
    }
  }

  if (type === "create") {
    try {
      const result = await useFetch(`/api/create-artist/`, {
        method: "POST",
        body: {
          userId: event.data.userId,
          name: event.data.name,
          email: event.data.email,
          image: runtimeConfig.public.bucketUrl + newImage,
          imageName: newImage,
          header: runtimeConfig.public.bucketUrl + newHeader,
          headerName: newHeader,
        },
      });
      load.value = false;
      emit("closeModal", false);
      return result;
    } catch (error) {
      console.log(`something went wrong: ${error}`);
      load.value = false;
    }
  }

  if (type === "update") {
    try {
      const result = await useFetch(`/api/update-artist/${data.id}`, {
        method: "PATCH",
        body: {
          userId: event.data.userId,
          name: event.data.name,
          email: event.data.email,
          image: runtimeConfig.public.bucketUrl + newImage,
          imageName: newImage,
          header: runtimeConfig.public.bucketUrl + newHeader,
          headerName: newHeader,
        },
      });
      load.value = false;
      emit("closeModal", false);
      return result;
    } catch (error) {
      console.log(`something went wrong: ${error}`);
      load.value = false;
    }
  }
  emit("isRefetch", true);
}
</script>

<template>
  <div class="p-5 flex flex-col gap-5">
    <h1 class="text-xl font-bold">
      {{ type === "create" ? "Sign Up for Spotify Artist" : "Artist Details" }}
    </h1>
    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      class="flex flex-col gap-5 h-full w-full"
    >
      <div class="w-full h-fit relative">
        <UFormGroup
          name="header"
          class="w-full h-fit flex justify-center group"
        >
          <label
            for="uploadHeader"
            class="flex w-fit h-fit relative overflow-clip justify-center shadow-zinc-900 shadow-2xl drop-shadow-2xl"
          >
            <div
              class="absolute z-20 hidden group-hover:flex flex-col gap-2 bg-black/20 transition-all duration-150 ease-in-out w-full h-full justify-center items-center hover:cursor-pointer"
            >
              <UIcon class="text-3xl" name="i-ph-pencil" />
              <p>Choose Header</p>
            </div>

            <div
              :style="{
                backgroundImage: `url(${
                  state.header ? state.header : data.header
                })`,
              }"
              alt="playlist/user-image"
              class="w-[450px] h-[100px] bg-cover bg-center flex justify-center items-center"
            >
              <UIcon
                v-show="!state.header"
                class="text-3xl opacity-50"
                name="i-ph-image"
              />
            </div>
          </label>
          <Input
            id="uploadHeader"
            accept="image/*"
            type="file"
            class="hidden"
            v-model="state.header"
            :onchange="(e:any)=>uploadHeader(e)"
          />
        </UFormGroup>

        <UFormGroup
          name="image"
          class="group absolute left-8 -bottom-[50px] z-30"
        >
          <label
            for="uploadImage"
            class="flex w-fit h-fit justify-center relative outline outline-4 outline-zinc-800 rounded-full overflow-clip shadow-zinc-900 shadow-2xl drop-shadow-2xl"
          >
            <div
              class="text-center absolute z-20 hidden group-hover:flex flex-col bg-black/20 transition-all duration-150 ease-in-out w-full h-full justify-center items-center hover:cursor-pointer"
            >
              <UIcon class="text-2xl" name="i-ph-pencil" />
              <p>Choose Photo</p>
            </div>

            <div
              :style="{
                backgroundImage: `url(${
                  state.image ? state.image : data.image
                })`,
              }"
              alt="playlist/user-image"
              class="min-w-[90px] h-[90px] bg-zinc-800 bg-cover bg-center flex justify-center items-center"
            >
              <UIcon
                v-show="!state.image"
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
            v-model="state.image"
            :onchange="(e:any)=>uploadImage(e)"
          />
        </UFormGroup>
      </div>

      <div class="mt-14 mx-4 flex gap-5">
        <UFormGroup name="name">
          <UInput
            size="xl"
            :placeholder="data.name"
            color="gray"
            variant="outline"
            v-model="state.name"
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
    <p class="text-xs z-30">
      By proceeding, you agree to give Spotify access to the image you choose to
      upload. Please make sure you have the right to upload the image.
    </p>
  </div>
</template>
