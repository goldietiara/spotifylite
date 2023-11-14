<script setup>
const router = useRouter();
const { userSession, client } = defineProps(["userSession", "client"]);

const back = () => {
  router.go(-1);
};
const forward = () => {
  router.go(1);
};

const logout = () => {
  client.auth.signOut();
  return navigateTo("/");
};

const items = [
  [
    {
      label: "Profile",
      click: () => {
        console.log("shared");
      },
    },
    {
      label: "Settings",
      click: () => {
        console.log("shared");
      },
    },
    {
      label: "logout",
      click: () => logout(),
    },
  ],
];
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
    <UButton
      size="md"
      variant="solid"
      :ui="{ rounded: 'rounded-full' }"
      label="Explore Premium"
    />
    <UButton
      size="md"
      variant="solid"
      :ui="{ rounded: 'rounded-full' }"
      icon="i-majesticons-bell-line"
    />
    <UDropdown
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        background: 'bg-zinc-800 dark:bg-zinc-800',
        item: {
          active:
            'bg-zinc-700 dark:bg-zinc-700 text-gray-200 dark:text-gray-200',
        },
      }"
    >
      <UButton size="sm" variant="solid" :ui="{ rounded: 'rounded-full' }">
        <template #leading>
          <UAvatar :src="userSession.user_metadata.avatar_url" size="xs" />
        </template>
      </UButton>
    </UDropdown>
  </div>
</template>
