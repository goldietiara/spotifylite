<script setup>
import NavBar from "../components/nav-bar.vue";
import Footer from "../components/footer.vue";
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
        class="w-full h-full rounded-lg bg-zinc-900 relative z-0 overflow-clip"
      >
        <NavBar />
        <slot></slot>
      </div>
    </PrimeSplitterPanel>
  </PrimeSplitter>
</template>
