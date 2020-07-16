import { createSlice } from "@reduxjs/toolkit";

export const SettingsKeys = {
  DefaultSearchEngine: "defaultSearchEngine",
};

export const SearchEngines = {
  GOOGLE: "Google",
  DUCKDUCKGO: "DuckDuckGo",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    defaultSearchEngine: SearchEngines.GOOGLE,
  },
  reducers: {
    setSettingValue: (state, action) => {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
  },
});

export const { setSettingValue } = settingsSlice.actions;
