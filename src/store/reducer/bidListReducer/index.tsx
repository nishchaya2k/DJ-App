import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface BidListArtistItem {
  item: any;
  bidAmount: number;
  musicDetails: {
    channelName: string;
    description: string;
    thumbnails: {
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    videoId: string;
    title: string;
  };
  id: string;
  timestamp: string;
  userData: Record<string, unknown>;
  name: string;
}

export interface BidListState {
  pendingPlaylistData: BidListArtistItem[];
  readyPlaylistData: BidListArtistItem[];
  totalCountPending: number;
  totalCountAccepted: number;
}

const initialState: BidListState = {
  pendingPlaylistData: [],
  readyPlaylistData: [],
  totalCountPending: 0,
  totalCountAccepted: 0,
};

const bidListReducer = createSlice({
  name: "bidList",
  initialState: initialState,
  reducers: {
    pendingPlayistAdded: (
      state,
      action: PayloadAction<BidListArtistItem[]>
    ) => {
      state.pendingPlaylistData = action.payload;
    },
    readyPlaylistAdded: (state, action: PayloadAction<BidListArtistItem[]>) => {
      state.readyPlaylistData = action.payload;
    },
    totalCountPendingAdded: (state, action: PayloadAction<number>) => {
      state.totalCountPending = action.payload;
    },

    totalCountAcceptedAdded: (state, action: PayloadAction<number>) => {
      state.totalCountAccepted = action.payload;
    },
  },
});

export const {
  pendingPlayistAdded,
  readyPlaylistAdded,
  totalCountPendingAdded,
  totalCountAcceptedAdded,
} = bidListReducer.actions;

export const selectPendingPlayist = (state: RootState) =>
  state.bidListStore.pendingPlaylistData;

export const selectReadyPlayist = (state: RootState) =>
  state.bidListStore.readyPlaylistData;

export const selectTotalCountPending = (state: RootState) =>
  state.bidListStore.totalCountPending;

export const selectTotalCountAccepted = (state: RootState) =>
  state.bidListStore.totalCountAccepted;

export default bidListReducer.reducer;
