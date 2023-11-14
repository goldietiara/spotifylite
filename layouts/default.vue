<script setup>
import NavBar from "../components/nav-bar.vue";
import Footer from "../components/footer.vue";

const userSession = useSupabaseUser();
const client = useSupabaseClient();

watchEffect(() => {
  if (!userSession.value) {
    return navigateTo("/auth");
  }
});
</script>
<template>
  <PrimeSplitter
    class="h-screen"
    :pt="{
      root: {
        class:
          'py-2 px-2 bg-white rounded-lg text-gray-700 border-0 border-none border-transparent dark:border-blue-900/40 dark:text-gray-100 dark:bg-black',
      },
      gutter: {
        class:
          'w-2 bg-transparent dark:bg-transparent hover:bg-gray-800 dark:hover:bg-gray-200',
      },
      gutterHandler: { class: 'bg-transparent' },
    }"
  >
    <PrimeSplitterPanel
      class="flex align-items-center justify-content-center"
      :size="20"
      :minSize="10"
    >
      <div class="w-full">
        <LeftBar />
      </div>
    </PrimeSplitterPanel>
    <PrimeSplitterPanel
      class="flex align-items-center justify-content-center relative"
      :size="80"
    >
      <div
        class="w-full h-full rounded-lg bg-gradient-to-b from-slate-700/50 to-zinc-900 overflow-y-auto container relative z-0"
      >
        <NavBar :userSession="userSession" :client="client" />
        <slot></slot>
      </div>
    </PrimeSplitterPanel>
  </PrimeSplitter>
</template>
