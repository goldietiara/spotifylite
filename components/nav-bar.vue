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
  return navigateTo("/login");
};

const items = [
  [
    {
      label: "Profile",
      click: () => {
        router.push(`/user/${userSession.user_metadata.name}`);
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
    <UButton
      @click="back"
      size="md"
      variant="solid"
      color="black"
      :ui="{ rounded: 'rounded-full' }"
      icon="i-ph-caret-left"
    />
    <UButton
      @click="forward"
      size="md"
      variant="solid"
      color="black"
      :ui="{ rounded: 'rounded-full' }"
      icon="i-ph-caret-right"
    />
  </div>
  <div class="flex gap-2 items-center fixed top-6 right-0 px-6 z-50">
    <UButton
      size="md"
      variant="solid"
      color="white"
      :ui="{ rounded: 'rounded-full' }"
      label="Explore Premium"
      class="hover:scale-105 transition-all ease-in-out duration-150"
    />
    <UButton
      size="md"
      variant="solid"
      color="black"
      :ui="{ rounded: 'rounded-full' }"
      icon="i-majesticons-bell-line"
      class="hover:scale-105 transition-all ease-in-out duration-150"
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
      <UButton
        size="sm"
        variant="solid"
        color="black"
        :ui="{ rounded: 'rounded-full' }"
        class="hover:scale-105 transition-all ease-in-out duration-150"
      >
        <template #leading>
          <UAvatar :src="userSession.user_metadata.avatar_url" size="xs" />
        </template>
      </UButton>
    </UDropdown>
  </div>
</template>
