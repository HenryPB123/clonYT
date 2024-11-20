import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  currentUser:
    | { name: string; email: string; password: string }
    | null
    | unknown;
  loading: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state: UserState) => {
      state.loading = true;
    },
    loginSuccess: (state: UserState, action: { payload: unknown }) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state: UserState) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state: UserState) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;

export default userSlice.reducer;
