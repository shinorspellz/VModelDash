import { AuthInitialState } from "./initialState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    logOut: () => {
      return AuthInitialState;
    },
    logIn: (state, action) => {
      return {
        value: {
          isAuth: true,
          ...action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;

export default auth.reducer;
