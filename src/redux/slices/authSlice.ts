import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * 
 * @description
 * This is the initial state of the authSlice.
 * It contains the isLoading state which is used to indicate whether a request is being made.
 * It contains the currentUser state which is used to store the user object returned from the server.
 * It contains the token state which is used to store the token returned from the server.
 * It contains the error state which is used to store the error object returned from the server.
 * It contains the success state which is used to indicate whether a request was successful.
 * 
 */
const initialState = {
  isLoading: false,
  currentUser: undefined,
  token: null,
  error: null,
  success: false,
};

/**
 * 
 * @interface Props
 * @description
 * This is the Props interface.
 * It contains the username, email and password properties.
 * 
 */
interface Props {
  username?: string;
  email: string;
  password: string;
}

/**
 *
 * 
 * @export
 * @param {Props} userData
 * @returns
 * @description
 * This function is used to register a user.
 * It takes in a userData object as an argument and makes a POST request to the server to register the user.
 * If the request is successful, it returns the user object.
 * If the request fails, it returns the error object.
 * The error object is then used to update the state in the authSlice.
 * The state is updated to reflect the error and the isLoading state is set to false.
 * The success state is set to true if the request is successful.
 * The isLoading state is set to true while the request is being made.
 * 
 */
export const register = createAsyncThunk(
  "auth/register",
  async (userData: Props, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        user: userData,
      });
      return response.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

/**
 *
 * 
 * @export
 * @param {Props} userData
 * @returns
 * @description
 * This function is used to login a user.
 * It takes in a userData object as an argument and makes a POST request to the server to login the user.
 * If the request is successful, it returns the user object.
 * If the request fails, it returns the error object.
 * The error object is then used to update the state in the authSlice.
 * The state is updated to reflect the error and the isLoading state is set to false.
 * The success state is set to true if the request is successful.
 * The isLoading state is set to true while the request is being made.
 * 
 */
export const login = createAsyncThunk(
  "auth/login",
  async (userData: Props, thunkAPI) => {
      console.log("auth/login");
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
