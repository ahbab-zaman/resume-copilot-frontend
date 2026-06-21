import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "system" | "light" | "dark";

type UiState = {
  sidebarCollapsed: boolean;
  theme: ThemeMode;
};

const initialState: UiState = {
  sidebarCollapsed: false,
  theme: "system",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
  },
});

export const { setSidebarCollapsed, toggleSidebarCollapsed, setTheme } =
  uiSlice.actions;
export default uiSlice.reducer;
