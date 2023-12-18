import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    allUser: [] as any,
    allPlaylist: [] as any,
    allArtist: [] as any,
    allAlbum: [] as any,
  }),

  actions: {
    async getAllUser(id: any) {
      try {
        const result = await useFetch(`/api/get-all-user/`);
        console.log(result.data.value); //to check if it's populated
        this.allUser = result.data;
        return this.allUser;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },

    async getAllPlaylist(id: any) {
      try {
        const result = await useFetch(`/api/get-all-playlist/`);
        console.log(result.data.value); //to check if it's populated
        this.allPlaylist = result.data;
        return this.allPlaylist;
      } catch (error) {
        console.log(`Playlist not found: ${error}`);
      }
    },

    async getAllArtist(id: any) {
      try {
        const result = await useFetch(`/api/get-all-artist/`);
        console.log(result.data.value); //to check if it's populated
        this.allArtist = result.data;
        return this.allArtist;
      } catch (error) {
        console.log(`Artist not found: ${error}`);
      }
    },

    async getAllAlbum(id: any) {
      try {
        const result = await useFetch(`/api/get-all-album/`);
        console.log(result.data.value); //to check if it's populated
        this.allAlbum = result.data;
        return this.allAlbum;
      } catch (error) {
        console.log(`Album not found: ${error}`);
      }
    },
  },
});
