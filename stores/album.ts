import { defineStore } from "pinia";

//current user

export const useAlbumStore = defineStore("album", {
  state: () => ({
    album: {},
    albumSongs: [],
    albumOwner: {},
    totalAlbumSongs: 0,
    totalAlbumLikes: 0,
    refetchAlbum: false,
  }),

  actions: {
    async getCurrentAlbum(id: number) {
      try {
        const result = await useFetch(`/api/get-album/${id}`);
        console.log(result.data.value); //to check if it's populated
        this.album = result.data;
        return this.album;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
