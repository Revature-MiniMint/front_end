import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice";
import profileReducer from "../profileSlice";

export const userStore = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});
export default userStore;
