import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "../modules/Auth/services/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
