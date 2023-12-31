<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const userSession = useSupabaseUser();
const client = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();

const state = reactive({
  name: userSession.value?.user_metadata.name,
  image: userSession.value?.user_metadata.avatar_url || "",
  imageName: userSession.value?.user_metadata.avatar_url || "",
  email: userSession.value?.user_metadata.email,
  dateOfBirth: "",
  location: undefined,
});

watch(state, () => {
  console.log(state);
});

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character" })
    .nonempty(),
  image: z.string().url().nonempty(),
  imageName: z.string().nonempty(),
  email: z.string().email().nonempty(),
  dateOfBirth: z.string().nonempty(),
  location: z.string({ required_error: "location cannot be empty" }).nonempty(),
});

const options = [
  { label: "Indonesia", value: "Indonesia" },
  { label: "Singapore", value: "Singapore" },
  { label: "Malaysia", value: "Malaysia" },
];

const files = ref("");
onMounted(() => {
  files.value = userSession.value?.user_metadata.avatar_url;
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

const DoB = ref({
  day: "",
  month: "",
  year: "",
});

watch(DoB.value, () => {
  state.dateOfBirth = `${DoB.value.day}-${DoB.value.month}-${DoB.value.year}`;
});

function dateError(day: number, month: number, year: number) {
  if (day.toString().charAt(0) === "0") {
    return "day can't start with 0";
  }
  if (month.toString().charAt(0) === "0") {
    return "month can't start with 0";
  }
  if (year.toString().charAt(0) === "0") {
    return "year can't start with 0";
  }
  const maxDaysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDaysInMonth) {
    return "day error";
  }
  if (month < 1 || month > 12) {
    return "month error";
  }
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return "year error";
  }
}

type Schema = z.infer<typeof schema>;
const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  let newImage = null;

  if (files.value) {
    const { data, error } = await client.storage
      .from("spotifylite-files")
      .upload(`${event.data.email}.jpg`, files.value, {
        contentType: "image/jpeg",
      });
    if (error) {
      console.log(error);
    } else {
      newImage = data.path;
    }
  }

  try {
    const result = await useFetch(`/api/create-user/`, {
      method: "POST",
      body: {
        name: event.data.name,
        email: event.data.email,
        dateOfBirth: event.data.dateOfBirth,
        image: runtimeConfig.public.bucketUrl + newImage,
        imageName: newImage,
        location: event.data.location,
      },
    });
    return result;
    // isLoading.value = false
  } catch (error) {
    console.log(`something went wrong: ${error}`);
    // isLoading.value = false
  }
  navigateTo("/");
}
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="md:w-[500px] w-[300px] flex flex-col gap-5 items-center justify-center"
    @submit="onSubmit"
  >
    <UFormGroup
      name="image"
      class="group flex w-fit h-[100px] justify-center relative"
    >
      <label for="uploadImage" class="w-fit h-fit">
        <div
          class="absolute z-20 hidden group-hover:flex bg-black/20 transition-all duration-150 ease-in-out w-full h-full justify-center items-center rounded-full hover:cursor-pointer"
        >
          <UIcon class="text-xl" name="i-ph-pencil" />
        </div>
        <UAvatar
          v-model="state.image"
          :alt="userSession ? userSession?.user_metadata.name : 'Profile Pict'"
          :src="
            state.image ? state.image : userSession?.user_metadata.avatar_url
          "
          size="xl"
        />
      </label>

      <Input
        id="uploadImage"
        accept="image/*"
        type="file"
        class="hidden"
        :onchange="(e:any)=>uploadImage(e)"
      />
    </UFormGroup>

    <UFormGroup name="name" label="Name">
      <UInput
        size="xl"
        v-model="state.name"
        :placeholder="userSession?.user_metadata.name"
      />
    </UFormGroup>

    <UFormGroup name="email" label="Email">
      <UInput
        size="xl"
        v-model="state.email"
        :placeholder="userSession?.user_metadata.email"
      />
    </UFormGroup>

    <UFormGroup
      :error="
        dateError(parseInt(DoB.day), parseInt(DoB.month), parseInt(DoB.year))
      "
      label="Date of Birth"
    >
      <div class="flex gap-5">
        <UInput
          placeholder="DD"
          size="xl"
          name="day"
          v-model="DoB.day"
          maxlength="2"
        />
        <UInput
          placeholder="MM"
          size="xl"
          name="month"
          v-model="DoB.month"
          maxlength="2"
        />
        <UInput
          placeholder="YYYY"
          size="xl"
          name="year"
          v-model="DoB.year"
          maxlength="4"
          minlength="4"
        />
      </div>
    </UFormGroup>

    <UFormGroup name="location" label="Location">
      <USelect
        size="xl"
        placeholder="Select"
        v-model="state.location"
        :options="options"
      />
    </UFormGroup>

    <div class="w-full flex flex-col items-center">
      <p class="text-gray-400 text-sm mb-2 text-center">
        By clicking <span class="text-gray-200">Next</span>, you agree to
        Spotify's
        <a
          href=""
          class="underline underline-offset-2 text-gray-200 hover:text-primary"
          >Terms and Conditions.</a
        >
      </p>
      <UButton
        type="submit"
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
        class="py-4 w-full dark:bg-green-600 dark:text-gray-800 flex justify-center font-semibold"
      >
        Next
      </UButton>
    </div>
  </UForm>
</template>
