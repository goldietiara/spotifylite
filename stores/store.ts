import { defineStore } from "pinia";
import playlists from "../assets/data/playlists.json";
import songs from "../assets/data/songs.json";
import users from "../assets/data/users.json";

export const useStore = defineStore("store1", {
  state: () => ({ playlists, users, songs }),

  getters: {
    newPlaylist() {
      const result = playlists.map((playlist) => {
        const user = users.find((v) => v.id == playlist.userId);
        return {
          id: playlist.id,
          userId: playlist.userId,
          user: user?.name || "not found",
          likedSongs: user?.likedSongs,
          name: playlist.name,
          image: playlist.image,
        };
      });

      return result;
    },
    currentPlaylist() {
      const result = playlists.map((playlist) => {
        const user = users.find((v) => v.id == playlist.userId);
        return {
          id: playlist.id,
          userId: playlist.userId,
          user: user?.name || "not found",
          userProfile: user?.profilePicture,
          name: playlist.name,
          likedSongs: user?.likedSongs,
          image: playlist.image,
          songsId: playlist.songs,
        };
      });

      return result;
    },
  },
});
