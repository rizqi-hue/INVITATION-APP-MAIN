import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "app/api";
import { storeData } from "utils/storage";

export interface AuthInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "signIn",
  async (data: AuthInterface, thunkAPI) => {
    return api.post("auth/sign-in", data).then(
      (res: any) => {
        return res.data;
      },
      (err: any) => {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    );
  }
);

export const signUp = createAsyncThunk(
  "signUp",
  async (data: RegisterInterface, thunkAPI) => {
    return api.post("auth/sign-up", data).then(
      (res: any) => {
        return res.data;
      },
      (err: any) => {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
    );
  }
);

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    data: { email: "", password: "" } as AuthInterface,
    isFetching: false,
    isSuccess: false,
    isError: false,
    isAuth: false,
    errorMessage: "" as string,
  },
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // signIn
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      storeData("token", payload.data.token);
      state.isFetching = false;
      state.isSuccess = true;
      state.isAuth = true;
      return state;
    });
    builder.addCase(signIn.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isAuth = false;
      state.errorMessage = payload.payload;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.isFetching = true;
      state.isAuth = false;
    });

    // signUp
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    });
    builder.addCase(signUp.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.payload;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const { clearState, setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
