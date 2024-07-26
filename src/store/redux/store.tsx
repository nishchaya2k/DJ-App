import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import signInReducer from "../reducer/signInReducer";
import publishPlaylistReducer from "../reducer/publishPlaylistReducer";
import bidListReducer from "../reducer/bidListReducer";
import paymentReducer from "../reducer/paymentReducer";
import profileReducer from "../reducer/profileReducer";

export const rootReducer = combineReducers({
  signInStore: signInReducer,
  publishPlaylistStore: publishPlaylistReducer,
  bidListStore: bidListReducer,
  paymentStore: paymentReducer,
  profileStore: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
