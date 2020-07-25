import { createSlice } from '@reduxjs/toolkit';
import { SearchEngineKeys } from '../../util/search.util';

export const SettingsKeys = {
  DefaultSearchEngine: 'defaultSearchEngine',
};

export const SearchEngines = {
  GOOGLE: 'Google',
  DUCKDUCKGO: 'DuckDuckGo',
};

export interface SettingsSliceState {
  defaultSearchEngine: SearchEngineKeys;
  rotateBackground: boolean;
  rotateBackgroundInterval: number;
}

const initialState: SettingsSliceState = {
  defaultSearchEngine: 'Google',
  rotateBackground: true,
  rotateBackgroundInterval: 15000,
};

export const settingsSlice = createSlice({
  name: 'settings',
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
