import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userName: "",
  email: "",
  permissions: [],
  token: "",
  signedIn: false,
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    onSignInSuccess: (state, action) => {
      state.signedIn = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.permissions = action.payload.permissions;
    },
    onSignOutSuccess: () => initialState,
  },
});

export const { onSignInSuccess, onSignOutSuccess } = userSlice.actions;

export default userSlice.reducer;
