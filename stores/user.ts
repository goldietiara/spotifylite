import { defineStore } from "pinia";

export type TArtist = {
  id: number;
  userId: number;
  email: string;
  name: string;
  image: string;
  imageName: string;
  header: string;
  headerName: string;
  followers?: [];
  album?: TAlbum[];
};

export type TUser = {
  id: number;
  name: string;
  email: string;
  dateOfBirth: string;
  image: string;
  imageName: string;
  location: string;
  onBoarding: boolean;
  playlist?: [];
  following?: [];
  followers?: [];
  userProfileId: number;
  userProfile: TUserProfile;
  isArtist: boolean;
  artistId?: number;
};

export type TUserProfile = {
  id: number;
  likedSongs: TSong[];
  likedPlaylist?: [];
  userId: number;
  User?: TUser[];
  // Artist?: TArtist[];
  // artistId?: number;
};

export type TPlaylist = {
  id: number;
  userId: number;
  name: string;
  description: string;
  image: string;
  imageName: string;
  createdAt: any;
  songs: TSong[];
  likes: TUser[];
  userProfileId: number;
  userProfile: TUserProfile;
};

export type TSong = {
  id: number;
  artistId: number;
  name: string;
  albumId: number;
  Album: TAlbum;
  playlistId?: number;
  Playlist?: {};
  userProfileId?: number;
  userProfile?: {};
};

export type TAlbum = {
  id: number;
  name: string;
  image: string;
  imageName: string;
  genre: string;
  createdAt: string;
  songs: TSong[];
  artistId: number;
  Artist: TArtist;
};

export type TRUserLikes = {
  id: number;
};
export type TRAlbum = {
  name: string;
  image: string;
  artistId: number;
  artist: string;
  artistImage: string;
  songs: string;
};

export type TRAlbumSongs = {
  id: number;
  name: string;
  artist: string;
  image: string;
  albumName: string;
};

export type TRPlaylist = {
  id: number;
  name: string;
  image: string;
  imageName: string;
  description: string;
  userId: number;
  user: string;
  userImage: string;
  songs: string;
};

export type TRPlaylistSongs = {
  id: number;
  name: string;
  artist: string;
  image: string;
  albumName: string;
};

export const useUserStore = defineStore("user", {
  state: () => ({
    userById: {} as TUser,
    userByEmail: {} as TUser,
    artistById: {} as TArtist,
    artistByEmail: {} as TArtist,
    albumById: {} as TAlbum,
    playlistById: {} as TPlaylist,
  }),

  actions: {
    async getUserById(id: any) {
      try {
        const result = await useFetch(`/api/get-user/${id}`);
        console.log(result.data.value); // Log the result to check if it's populated
        // this.userById = result.data;
        return result.data;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },

    async getUserByEmail(email: any) {
      try {
        const result: any = await useFetch(`/api/get-current-user/${email}`);
        console.log(result.data.value);
        return result.data;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },

    async getArtistById(id: string) {
      try {
        const result = await useFetch(`/api/get-artist/${id}`);
        console.log(result.data.value);
        return result.data;
      } catch (error) {
        console.error(`Error fetching artist: ${error}`);
        throw error;
      }
    },

    async getArtistByEmail(email: any) {
      try {
        const result: any = await useFetch(`/api/get-current-artist/${email}`);
        console.log(result.data.value);
        return result.data;
      } catch (error) {
        console.log(`user not found: ${error}`);
      }
    },

    async getAlbumById(id: string) {
      try {
        const result = await useFetch(`/api/get-album/${id}`);
        console.log(result.data.value);
        return result.data;
      } catch (error) {
        console.error(`Error fetching artist: ${error}`);
        throw error;
      }
    },
    async getPlaylistById(id: string) {
      try {
        const result = await useFetch(`/api/get-playlist/${id}`);
        console.log(result.data.value);
        return result.data;
      } catch (error) {
        console.error(`Error fetching artist: ${error}`);
        throw error;
      }
    },
  },
  getters: {
    getUserLikes() {
      const like: any = this.userByEmail.userProfile.likedSongs?.map(
        (v: TSong) => ({
          id: v.id,
        })
      );

      return like;
    },
    getUserLikesPlaylist() {
      const like: TRUserLikes[] | any =
        this.userByEmail.userProfile.likedSongs.map((v: TSong) => ({
          id: v.id,
          name: v.name,
          artist: v.Album.Artist.name,
          image: v.Album.image,
          albumName: v.Album.name,
          artistId: v.Album.Artist.id,
          albumId: v.Album.id,
        }));

      return like;
    },
    getAlbum() {
      const album: TRAlbum = {
        name: this.albumById.name,
        image: this.albumById.image,
        artistId: this.albumById.Artist.id,
        artist: this.albumById.Artist.name,
        artistImage: this.albumById.Artist.image,
        songs: this.albumById.songs.length.toString(),
      };
      return album;
    },
    getAlbumSongs() {
      const songs: TRAlbumSongs[] = this.albumById.songs.map((v: TSong) => ({
        id: v.id,
        name: v.name,
        artistId: this.albumById.Artist.id,
        artist: this.albumById.Artist.name,
        image: this.albumById.image,
        albumName: this.albumById.name,
        albumId: this.albumById.id,
      }));
      return songs;
    },
    getPlaylist() {
      const playlist: TRPlaylist = {
        id: this.playlistById.id,
        name: this.playlistById.name,
        image: this.playlistById.image,
        imageName: this.playlistById.imageName,
        description: this.playlistById.description,
        userId: this.userById.id,
        user: this.userById.name,
        userImage: this.userById.image,
        songs:
          this.playlistById.songs && this.playlistById.songs.length.toString(),
      };
      return playlist;
    },
    getPlaylistSongs() {
      const songs: TRPlaylistSongs[] = this.albumById.songs.map((v: TSong) => ({
        id: v.id,
        name: v.name,
        artist: v.Album.Artist.name,
        artistId: v.Album.Artist.id,
        image: v.Album.image,
        albumName: v.Album.name,
        albumId: v.Album.id,
      }));
      return songs;
    },
  },
});
