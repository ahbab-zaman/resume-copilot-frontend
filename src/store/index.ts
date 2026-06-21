import { configureStore } from "@reduxjs/toolkit";

import activeResumeReducer from "./activeResumeSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    activeResume: activeResumeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
