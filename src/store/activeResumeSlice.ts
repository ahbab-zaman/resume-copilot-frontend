import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ActiveResumeState = {
  resumeId: string | null;
};

const initialState: ActiveResumeState = {
  resumeId: null,
};

const activeResumeSlice = createSlice({
  name: "activeResume",
  initialState,
  reducers: {
    setActiveResume(state, action: PayloadAction<string | null>) {
      state.resumeId = action.payload;
    },
  },
});

export const { setActiveResume } = activeResumeSlice.actions;
export default activeResumeSlice.reducer;
