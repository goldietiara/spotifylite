<script setup>
const router = useRouter();

const back = () => {
  router.go(-1);
};
const forward = () => {
  router.go(1);
};
</script>

<template>
  <div class="flex gap-2 items-center fixed top-6 px-6 z-50">
    <!-- <UButton
              icon="i-majesticons-chevron-left-line"
              size="lg"
              square
              :trailing="false"
              :ui="{ rounded: 'rounded-full' }"
            /> -->
    <!-- <PrimeButton icon="pi pi-check" rounded aria-label="Filter" /> -->

    <div
      class="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-black/50 hover:cursor-pointer hover:bg-black"
      @click="back"
    >
      <UIcon class="text-3xl" name="i-majesticons-chevron-left-line" />
    </div>
    <div
      class="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-black/50 hover:cursor-pointer hover:bg-black"
      @click="forward"
    >
      <UIcon class="text-3xl" name="i-majesticons-chevron-right-line" />
    </div>
  </div>
  <div class="flex gap-2 items-center fixed top-6 right-0 px-6 z-50">
    <div
      class="px-4 w-fit h-[40px] rounded-full flex items-center justify-center bg-white text-black"
    >
      <p class="text-sm font-semibold">Explore Premium</p>
    </div>
    <div
      class="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-black/70"
    >
      <UIcon class="text-xl" name="i-majesticons-bell-line" />
    </div>
    <div
      class="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-black/70"
    >
      <UIcon class="text-xl" name="i-majesticons-user-line" />
    </div>
  </div>
</template>
