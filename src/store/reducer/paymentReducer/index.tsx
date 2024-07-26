import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";

interface PaymentDatatypes {
  bidAmount: number;
  status: string;
  timestamp: string;
  transactionID: string;
}

export interface PaymentState {
  paymentData: PaymentDatatypes[];
  totalEarning: number;
  totalLoss: number;
  totalCount: number;
}

const initialState: PaymentState = {
  paymentData: [],
  totalEarning: 0,
  totalLoss: 0,
  totalCount: 0,
};

const paymentReducer = createSlice({
  name: "payment",
  initialState: initialState,
  reducers: {
    paymentDataAdded: (state, action: PayloadAction<PaymentDatatypes[]>) => {
      state.paymentData = action.payload;
    },
    earningAdded: (state, action: PayloadAction<number>) => {
      state.totalEarning = action.payload;
    },
    lossAdded: (state, action: PayloadAction<number>) => {
      state.totalLoss = action.payload;
    },
    totalCountAdded: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const { paymentDataAdded, earningAdded, lossAdded, totalCountAdded } =
  paymentReducer.actions;

export const selectPaymentData = (state: RootState) =>
  state.paymentStore.paymentData;
export const selectEarningData = (state: RootState) =>
  state.paymentStore.totalEarning;
export const selectLossData = (state: RootState) =>
  state.paymentStore.totalLoss;
export const selectTotalCount = (state: RootState) =>
  state.paymentStore.totalCount;

export default paymentReducer.reducer;
