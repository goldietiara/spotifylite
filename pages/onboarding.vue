<script setup lang="ts">
import UserDetailsForm from "../components/form/user-details.vue";
definePageMeta({
  layout: "login-signup",
});
</script>

<template>
  <div
    class="mx-5 mb-20 flex-col flex gap-5 items-center justify-center w-[800px] min-w-fit h-full rounded-lg"
  >
    <h1 class="text-center leading-snug md:text-5xl text-3xl font-bold pb-10">
      Sign up to start listening
    </h1>
    <UserDetailsForm />
  </div>
</template>
