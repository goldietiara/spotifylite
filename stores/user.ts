import { defineStore } from "pinia";

//users

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
    profile: {},
    userPlaylist: [],
    userFollowing: [],
    userFollowers: [],
    refetchUser: false,
  }),

  actions: {
    async getCurrentUser(email: any) {
      try {
        const result = await useFetch(`/api/get-user/${email}`);
        console.log(result.data.value); //to check if it's populated
        this.user = result.data;
        return this.user;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
