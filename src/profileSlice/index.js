import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
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
      state.name = action.payload.name;
      state.alias = action.payload.alias;
      state.dob = action.payload.dob;
      state.gender = action.payload.gender;
      state.bio = action.payload.bio;
      state.profilepic = action.payload.profilepic;
    },flagStatus: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { userInfo } = profileSlice.actions;
export const { flagStatus } = profileSlice.actions;

export default profileSlice.reducer;