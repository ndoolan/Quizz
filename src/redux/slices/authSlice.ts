import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  currentUser: undefined,
  token: null,
  error: null,
  success: false,
};

interface Props {
  username?: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async (userData: Props, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        user: userData,
      });
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: Props, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        user: userData,
      });
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8080/auth/getUser", {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("accessToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.success = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.success = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
