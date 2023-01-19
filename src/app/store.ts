import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "../modules/Auth/services/AuthSlice";
import UserSlice from "../modules/User/services/UserSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    user: UserSlice
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
