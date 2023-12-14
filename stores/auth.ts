import { defineStore } from "pinia";

//current user

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: {},
    userProfile: {},
    userPlaylist: [],
    likedSongs: [],
    likedPlaylist: [],
    following: [],
    followers: [],
    userIsArtist: {},
    refetch: false,
  }),

  actions: {
    async getCurrentUser(email: any) {
      try {
        const result = await useFetch(`/api/auth/${email}`);
        console.log(result.data.value); //to check if it's populated
        this.currentUser = result.data;
        return this.currentUser;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
