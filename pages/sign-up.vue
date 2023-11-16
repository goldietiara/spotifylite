<script setup>
definePageMeta({
  layout: "login-signup",
});

const router = useRouter();
const userSession = useSupabaseUser();

// watchEffect(() => {
//   if (user.value) {
//     return navigateTo("/");
//   }
// });
</script>

<template>
  <div
    class="py-5 md:py-10 mx-5 flex-col flex gap-5 items-center justify-center w-[800px] min-w-fit h-full rounded-lg"
  >
    <div
      class="md:text-3xl text-sm font-bold py-10 leading-snug text-center flex flex-col items-center justify-center"
    >
      <h1 class="md:text-6xl text-3xl md:mb-5 mb-2">Hey there!</h1>
      <h3>
        It looks like you haven't created an account yet. <br />
        Would you like to sign up?
      </h3>
    </div>
    <div
      class="md:w-[500px] w-[300px] flex-wrap flex flex-col gap-5 items-center justify-center"
    >
      <UButton
        @click="router.push('/onboarding')"
        type="submit"
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
        class="py-4 w-full dark:bg-green-600 dark:text-gray-800 flex justify-center font-semibold"
      >
        Next
      </UButton>
      <UButton
        @click="router.push('/login')"
        type="submit"
        size="xl"
        :ui="{
          rounded: 'rounded-full',
        }"
        class="py-4 w-full dark:bg-gray-600 hover:dark:bg-gray-700 dark:text-gray-200 flex justify-center font-semibold"
      >
        Back
      </UButton>
    </div>
  </div>
</template>
