import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "app/api";
import { removeCookie } from "utils/storage";

export interface AuthInterface {
  email: string;
  password: string;
}

export interface RefreshTokenInterface {
  token: string;
}

export interface RegisterInterface {
  name: string;
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "signUp",
  async (data: RegisterInterface, thunkAPI) => {
    const config = {
      method: "post",
      url: "auth/sign-up",
      data,
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

export const signIn = createAsyncThunk(
  "signIn",
  async (data: AuthInterface, thunkAPI) => {
    const config = {
      method: "post",
      url: "auth/sign-in",
      data,
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

export const signOut = createAsyncThunk(
  "signOut",
  async (data: any, thunkAPI) => {
    const config = {
      method: "post",
      url: "auth/sign-out",
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

export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (data: RefreshTokenInterface, thunkAPI) => {
    const config = {
      method: "post",
      url: "auth/refresh-token",
      data,
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

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    data: { email: "", password: "" } as AuthInterface,
    isFetching: false,
    isSuccess: false,
    isSignOutSuccess: false,
    isError: false,
    isAuth: false,
    errorMessage: "" as string,
  },
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.isSignOutSuccess = false;
      state.errorMessage = "";
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    // signIn
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
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

    // refreshToken
    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isAuth = true;
      return state;
    });
    builder.addCase(refreshToken.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.isAuth = false;
      state.errorMessage = payload.payload;
    });
    builder.addCase(refreshToken.pending, (state, action) => {
      state.isFetching = true;
    });

    // signout
    builder.addCase(signOut.fulfilled, (state, { payload }) => {
      removeCookie("token");
      state.isFetching = false;
      state.isSignOutSuccess = true;
      state.isAuth = false;
      return state;
    });
    builder.addCase(signOut.rejected, (state, payload: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.payload;
    });
    builder.addCase(signOut.pending, (state, action) => {
      state.isFetching = true;
    });
  },
});

export const { clearState, setAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
