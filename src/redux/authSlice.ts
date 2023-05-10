import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface authInterface {
  authToken: Object;
}

const initialState: authInterface = {
  authToken: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token") || "{}")
    : {},
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    saveAuthToken: (state, { payload }) => {
      state.authToken = payload;
    },
    logOut: (state, action) => {
      state.authToken = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAuthToken, logOut } = authSlice.actions;

export default authSlice.reducer;
