<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const userSession = useSupabaseUser();
watchEffect(() => {
  if (!userSession.value) {
    navigateTo("/login");
  }
});

definePageMeta({
  layout: "login-signup",
});

const options = [
  { label: "Indonesia", value: "Indonesia" },
  { label: "Singapore", value: "Singapore" },
  { label: "Malaysia", value: "Malaysia" },
];

const state = reactive({
  profilePhoto: "" || userSession.value?.user_metadata.avatar_url,
  name: "" || userSession.value?.user_metadata.name,
  email: "" || userSession.value?.user_metadata.email,
  location: undefined,
});

const schema = z.object({
  profilePhoto: z.string().url().nonempty(),
  name: z.string().email().min(5).nonempty(),
  email: z.string().min(5).nonempty(),
  location: z.string().refine((value) => value === "option-2", {
    message: "Select Option 2",
  }),
});

type Schema = z.infer<typeof schema>;

const form = ref();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

const files = ref("");
const uploadImage = (e: any) => {
  e.preventDefault();

  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const result = reader.result as string;
    files.value = result;
  };
};

console.log(files.value);
</script>

<template>
  <UForm
    ref="form"
    :schema="schema"
    :state="state"
    class="py-5 md:py-10 flex-col flex gap-5 items-center w-[800px] h-full rounded-lg bg-gray-500/50"
    @submit="onSubmit"
  >
    <UFormGroup name="profilePhoto">
      <label for="uploadImage">
        <UAvatar
          v-model="state.profilePhoto"
          alt="Profile Pict"
          :src="files ? files : userSession?.user_metadata.avatar_url"
          size="lg"
          class="hover:cursor-pointer"
        />
      </label>
      <Input
        id="uploadImage"
        accept="image/*"
        type="file"
        class="absolute top-0 left-0 hidden"
        :onchange="(e:any)=>uploadImage(e)"
      />
    </UFormGroup>
    <UFormGroup name="name" label="Name">
      <UInput
        v-model="state.name"
        :placeholder="userSession?.user_metadata.name"
      />
    </UFormGroup>
    <UFormGroup name="email" label="Email">
      <UInput
        v-model="state.email"
        :placeholder="userSession?.user_metadata.email"
      />
    </UFormGroup>

    <UFormGroup name="location" label="Location">
      <USelect
        v-model="state.location"
        placeholder="Select"
        :options="options"
      />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
