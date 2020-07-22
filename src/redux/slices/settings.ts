import { createSlice } from "@reduxjs/toolkit";

export const SettingsKeys = {
  DefaultSearchEngine: "defaultSearchEngine",
};

export const SearchEngines = {
  GOOGLE: "Google",
  DUCKDUCKGO: "DuckDuckGo",
};

export interface SettingsSliceState {
  defaultSearchEngine: string;
}

const initialState: SettingsSliceState = {
  defaultSearchEngine: SearchEngines.GOOGLE,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    PURGE: () => initialState,
    setSettingValue: (state, action) => {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    },
  },
});

export const { setSettingValue } = settingsSlice.actions;
