import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export interface PlaylistData {
  title: string;
  channelName: string;
  videoId: string;
  thumbnails: {
    maxres: {
      url: string;
      width: number;
      height: number;
    };
    standard: {
      url: string;
      width: number;
      height: number;
    };
    high: {
      url: string;
      width: number;
      height: number;
    };
    medium: {
      url: string;
      width: number;
      height: number;
    };
    default: {
      url: string;
      width: number;
      height: number;
    };
  };
  videoLength: string;
}

export interface PublishPlaylistState {
  playlistData: PlaylistData[];
  // playlistId: any;
  playlistUrl: any;
}

const initialState: PublishPlaylistState = {
  playlistData: [],
  // playlistId: null,
  playlistUrl: null,
};

const publishPlaylistReducer = createSlice({
  name: "publishPlaylist",
  initialState: initialState,
  reducers: {
    playlistAdded: (state, action: PayloadAction<PlaylistData[]>) => {
      state.playlistData = action.payload;
    },
    // playlistIdAdded: (state, action: PayloadAction<any>) => {
    //   state.playlistId = action.payload;
    // },
    playlistUrlAdded: (state, action: PayloadAction<any>) => {
      state.playlistUrl = action.payload;
    },
  },
});

export const { playlistAdded, playlistUrlAdded } =
  publishPlaylistReducer.actions;

export const selectPlaylist = (state: RootState) =>
  state.publishPlaylistStore.playlistData;

// export const selectPlaylistId = (state: RootState) =>
//   state.publishPlaylistStore.playlistId;

export const selectPlaylistUrl = (state: RootState) =>
  state.publishPlaylistStore.playlistUrl;

export default publishPlaylistReducer.reducer;
