<script setup>
const { type, data, owner } = defineProps(["type", "data", "owner"]);
const router = useRouter();
const go = (id) => {
  if (type === "playlist") {
    router.push(`/user/${id}`);
  } else router.push(`/artist/${id}`);
};
</script>
<template>
  <div
    class="flex flex-wrap justify-start items-end gap-7 h-[250px] w-full text-white px-6 z-10"
  >
    <!-- FIX LATTER:
     as if v-if="data.wawa"
    to be v-if="data" 
    -->
    <div
      v-if="data"
      :style="{
        backgroundImage: `url(${data.image})`,
      }"
      alt="playlist/user-image"
      class="w-[250px] h-[250px] bg-zinc-700 shadow-zinc-900 shadow-2xl drop-shadow-2xl z-10 bg-cover bg-center flex justify-center items-center"
      :class="type === 'user' ? 'rounded-full' : 'rounded-none'"
    >
      <UIcon
        v-show="!data.image"
        class="opacity-30 text-8xl"
        name="i-ph-music-notes"
      />
    </div>
    <USkeleton
      v-else
      class="w-[250px] h-[250px] shadow-zinc-900 shadow-2xl drop-shadow-2xl z-10"
      :class="type === 'user' ? 'rounded-full' : 'rounded-none'"
    />
    <div class="flex flex-col gap-5 text-sm font-light z-20 self-end">
      <p>
        {{
          type === "user"
            ? "Profile"
            : type === "playlist"
            ? "Playlist"
            : "Album"
        }}
      </p>
      <h1 v-if="data" class="text-6xl font-bold">
        {{ data.name }}
      </h1>
      <USkeleton v-else class="h-[50px] w-[200px]" />
      <div v-show="type === 'playlist'">
        <p v-if="data" class="text-gray-200">
          {{ data.description }}
        </p>
        <USkeleton v-else class="w-[150px] h-[30px]" />
      </div>

      <div class="flex items-center gap-1">
        <div v-show="type !== 'user'">
          <div
            v-if="type !== 'user' && owner"
            :style="{
              backgroundImage: `url(${owner.image})`,
            }"
            alt="user-profile"
            class="rounded-full w-[30px] h-[30px] bg-cover bg-center"
          />
          <USkeleton v-else class="rounded-full w-[30px] h-[30px]" />
        </div>

        <p
          v-if="type === 'user' ? data : owner"
          :class="
            type !== 'user' &&
            'font-semibold hover:underline hover:underline-offset-4 hover:cursor-pointer'
          "
          @click="go(owner.id)"
        >
          {{
            type === "user"
              ? `Public Playlist ${data.playlist.length}`
              : owner.name
          }}
        </p>
        <USkeleton v-else class="w-[50px] h-[20px]" />

        <UIcon v-show="type !== 'artist'" name="i-ph-dot-outline-fill" />
        <a
          v-show="type !== 'artist'"
          :class="
            type === 'user' &&
            ' hover:underline hover:underline-offset-4 hover:cursor-pointer'
          "
          >{{ type === "user" ? `50 Followers` : `1 like` }}</a
        >
        <UIcon name="i-ph-dot-outline-fill" />
        <p
          v-if="data"
          :class="
            type === 'user' &&
            ' hover:underline hover:underline-offset-4 hover:cursor-pointer'
          "
        >
          {{
            type === "user"
              ? `50 Following`
              : `${data.songs ? data.songs.length : 0} songs`
          }}
        </p>
        <USkeleton v-else class="w-[50px] h-[20px]" />
      </div>
    </div>
  </div>
</template>
