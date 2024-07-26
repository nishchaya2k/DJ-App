import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

export interface ProfileState {
  firstName: string;
  lastName: string;
  phoneNumber: number;
  gstNumber: string;
  incorporationNumber: string;
}

const initialState: ProfileState = {
  //1
  firstName: "",
  lastName: "",
  phoneNumber: 0,
  gstNumber: "",
  incorporationNumber: "",
};

const profileReducer = createSlice({
  name: "profile", //2
  initialState: initialState,
  reducers: {
    //3
    firstNameAdded: (state = initialState, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    lastNameAdded: (state = initialState, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    phoneNumberAdded: (state = initialState, action: PayloadAction<number>) => {
      state.phoneNumber = action.payload;
    },
    gstNumberAdded: (state = initialState, action: PayloadAction<string>) => {
      state.gstNumber = action.payload;
    },
    incorporationNumberAdded: (
      state = initialState,
      action: PayloadAction<string>
    ) => {
      state.incorporationNumber = action.payload;
    },
  },
});

export const {
  firstNameAdded,
  lastNameAdded,
  phoneNumberAdded,
  gstNumberAdded,
  incorporationNumberAdded,
} = profileReducer.actions;

export const selectFirstName = (state: RootState) =>
  state.profileStore.firstName;
export const selectLastName = (state: RootState) => state.profileStore.lastName;
export const selectPhoneNumber = (state: RootState) =>
  state.profileStore.phoneNumber;
export const selectGSTNumber = (state: RootState) =>
  state.profileStore.gstNumber;
export const selectIncorporationNumber = (state: RootState) =>
  state.profileStore.incorporationNumber;

export default profileReducer.reducer;
