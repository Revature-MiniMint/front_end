import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../userSlice";
<<<<<<< HEAD
import profileReducer from "../profileSlice";
=======
>>>>>>> 7c67a6bed04d1c66a451f4c2c83b7e97e4080ded

export const userStore = configureStore({
  reducer: {
    user: userReducer,
<<<<<<< HEAD
    profile: profileReducer,
  },
});
export default userStore;
=======
  },
});
>>>>>>> 7c67a6bed04d1c66a451f4c2c83b7e97e4080ded
