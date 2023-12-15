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
