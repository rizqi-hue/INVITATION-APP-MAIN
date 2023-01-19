import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "app/api";

export interface ProfileInterface {
  id: number;
  email: string;
  password: string;
}

export const profile = createAsyncThunk(
  "profile",
  async (data: any, thunkAPI) => {
    const config = {
      method: "get",
      url: "auth/profile",
      withCredentials: true,
    };

    return api(config).then(
      (res: any) => {
        return res.data;
      },
      (err: any) => {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    );
  }
);

const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState: {
    data: { id: 0, email: "", password: "" } as ProfileInterface,
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "" as string,
  },
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    // profile
    builder.addCase(profile.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(profile.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.payload;
    });
    builder.addCase(profile.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const { clearState } = ProfileSlice.actions;
export default ProfileSlice.reducer;
