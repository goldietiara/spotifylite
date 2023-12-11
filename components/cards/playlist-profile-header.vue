<script setup>
const { type, data } = defineProps(["type", "data"]);
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
    <div
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
      <h1 class="text-6xl font-bold">
        {{ data.name }}
      </h1>
      <p class="text-gray-200" v-show="type === 'playlist'">
        {{ data.description }}
      </p>
      <div class="flex items-center gap-1">
        <div
          :style="{
            backgroundImage: `url(${
              type === 'playlist' ? data.userImage : data.artistImage
            })`,
          }"
          v-show="type !== 'user'"
          alt="user-profile"
          class="rounded-full w-[30px] h-[30px] bg-cover bg-center"
        />

        <p
          :class="
            type !== 'user' &&
            'font-semibold hover:underline hover:underline-offset-4 hover:cursor-pointer'
          "
          @click="go(type === 'playlist' ? data.id : data.artistId)"
        >
          {{ type === "playlist" ? data.user : data.artist }}
        </p>
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
          :class="
            type === 'user' &&
            ' hover:underline hover:underline-offset-4 hover:cursor-pointer'
          "
        >
          {{ type === "user" ? `50 Following` : `${data.songs} songs` }}
        </p>
      </div>
    </div>
  </div>
</template>
