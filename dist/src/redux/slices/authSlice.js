"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.login = exports.register = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
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
exports.register = (0, toolkit_1.createAsyncThunk)("auth/register", (userData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("http://localhost:8080/auth/register", {
            user: userData,
        });
        return response.data.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
}));
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
exports.login = (0, toolkit_1.createAsyncThunk)("auth/login", (userData, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post("http://localhost:8080/auth/login", {
            user: userData,
        });
        return response.data.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
}));
exports.getCurrentUser = (0, toolkit_1.createAsyncThunk)("auth/getCurrentUser", (_, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = localStorage.getItem("accessToken");
        const response = yield axios_1.default.get("http://localhost:8080/auth/getUser", {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data.user;
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.errors);
    }
}));
exports.logout = (0, toolkit_1.createAsyncThunk)("auth/logout", () => __awaiter(void 0, void 0, void 0, function* () {
    localStorage.removeItem("accessToken");
}));
const authSlice = (0, toolkit_1.createSlice)({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(exports.register.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.success = true;
        })
            .addCase(exports.register.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            .addCase(exports.login.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.success = true;
        })
            .addCase(exports.login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
            .addCase(exports.getCurrentUser.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(exports.getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.success = true;
        })
            .addCase(exports.getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = null;
            state.error = action.payload;
        })
            .addCase(exports.logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = null;
        });
    },
});
exports.default = authSlice.reducer;
