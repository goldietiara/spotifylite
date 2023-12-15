import { defineStore } from "pinia";

//current user

export const useArtistStore = defineStore("artist", {
  state: () => ({
    artist: {},
    artistAlbum: [],
    refetchArtist: false,
  }),

  actions: {
    async getCurrentArtist(id: number) {
      try {
        const result = await useFetch(`/api/get-artist/${id}`);
        console.log(result.data.value); //to check if it's populated
        this.artist = result.data;
        return this.artist;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
