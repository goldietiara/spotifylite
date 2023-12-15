import { defineStore } from "pinia";

//users

export const useUserStore = defineStore("user", {
  state: () => ({
    userById: {},
    userByIdProfile: {},
    userByIdPlaylist: [],
    userByIdFollowing: [],
    userByIdFollowers: [],
    refetchUserById: false,
  }),

  actions: {
    async getCurrentUserById(id: any) {
      try {
        const result = await useFetch(`/api/get-user/${id}`);
        console.log(result.data.value); //to check if it's populated
        this.userById = result.data;
        return this.userById;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
