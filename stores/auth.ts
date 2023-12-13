import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: {},
  }),

  actions: {
    async getCurrentUser(email: any) {
      try {
        const result = await useFetch(`/api/auth/${email}`);
        console.log(result.data.value); // Log the result to check if it's populated
        this.currentUser = result.data;
        return this.currentUser;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },
  },
});
