import { defineStore } from "pinia";

//current user

export const usePlaylistStore = defineStore("playlist", {
  state: () => ({
    playlist: {},
    playlistSongs: [],
    playlistOwner: {},
    refetchPlaylist: false,
  }),

  actions: {
    async getCurrentPlaylist(id: number) {
      try {
        const result = await useFetch(`/api/get-playlist/${id}`);
        // console.log(result.data.value); //to check if it's populated
        this.playlist = result.data;
        console.log(this.playlist); //to check if it's populated
        return this.playlist;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
