<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { index } = defineProps(["index"]);
const emit = defineEmits(["closeModal", "multiply"]);

const state = reactive({
  name: "",
});

const songsSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 character" })
    .nonempty(),
});
</script>

<template>
  <div class="flex gap-3 items-end justify-center">
    <UFormGroup name="name" label="Song Name">
      <UInput size="xl" v-model="state.name" placeholder="Song Name" />
    </UFormGroup>

    <UTooltip text="add song">
      <UButton
        icon="i-ph-plus"
        size="xl"
        color="white"
        class="hover:scale-110 transition-all ease-out duration-100 z-20 mb-[6px]"
        @click="emit('multiply', state.name), (state.name = '')"
      ></UButton>
    </UTooltip>
  </div>
</template>
