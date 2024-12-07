import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  fixSiderbar: true,
  layout: "mix",
  splitMenus: false,
  language: "en-US",
  siderMenuType: "sub",
  navTheme: "light",
  colorPrimary: "#1677FF",
  contentWidth: "Fluid",
};

export const themeSlice = createSlice({
  name: "theme/settings",
  initialState,
  reducers: {
    setThemeSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetThemeSettings: () => initialState,
  },
});

export const { setThemeSettings, resetThemeSettings } = themeSlice.actions;

export default themeSlice.reducer;
