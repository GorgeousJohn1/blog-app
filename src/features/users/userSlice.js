/* eslint-disable no-param-reassign */
// immer implemented c'mon
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: undefined,
  username: undefined,
  bio: undefined,
  image: undefined,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUserCredentials(state, action) {
      state.username = action.payload?.username;
      state.email = action.payload?.email;
      state.password = action.payload?.password;
      state.bio = action.payload?.bio;
      state.image = action.payload?.image;
    },
    userLoggedOut(state) {
      state.username = undefined;
      state.email = undefined;
      state.bio = undefined;
      state.image = undefined;
    },
  },
});

export const selectUser = (state) => state.user;

export const { updateUserCredentials, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
