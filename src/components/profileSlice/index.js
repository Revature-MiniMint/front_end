import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  id: 0,
  username: "",
  password: "",
  email: "",
  name: "",
  alias: "",
  dob: "",
  gender: "",
  bio: "",
  profilepic: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialStateValue,
  reducers: {
    userInfo: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.alias = action.payload.alias;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      state.bio = action.payload.bio;
      state.profilepic = action.payload.profilepic;
    },
  },
});

export const { userInfo } = profileSlice.actions;

export default profileSlice.reducer;