import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export interface SignInState {
  username: string;
  password: string;
  token: string;
  artistId: string;
}

const initialState: SignInState = {
  //1
  username: "",
  password: "",
  token: "",
  artistId: "",
};

const signInReducer = createSlice({
  name: "signIn", //2
  initialState: initialState,
  reducers: {
    //3
    usernameAdded: (state = initialState, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    passwordAdded: (state = initialState, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    tokenAdded: (state = initialState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    artistIdAdded: (state = initialState, action: PayloadAction<string>) => {
      state.artistId = action.payload;
    },
  },
});

export const { usernameAdded, passwordAdded, tokenAdded, artistIdAdded } =
  signInReducer.actions;
export const selectUsername = (state: RootState) => state.signInStore.username;
export const selectPassword = (state: RootState) => state.signInStore.password;
export const selectToken = (state: RootState) => state.signInStore.token;
export const selectArtistId = (state: RootState) => state.signInStore.artistId;
export default signInReducer.reducer;
