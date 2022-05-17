import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import scheduleReducer from "../features/schedule/scheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schedule: scheduleReducer,
  },
});
