import { createSlice } from '@reduxjs/toolkit';
import { SearchEngineKeys } from '../../util/search.util';

export const SettingsKeys = {
  DefaultSearchEngine: 'defaultSearchEngine',
  RotateBackground: 'rotateBackground',
  RotateBackgroundInterval: 'rotateBackgroundInterval',
  WrapGameInQuotes: 'wrapGameInQuotes',
};

export const SearchEngines = {
  GOOGLE: 'Google',
  DUCKDUCKGO: 'DuckDuckGo',
};

export interface SettingsSliceState {
  defaultSearchEngine: SearchEngineKeys;
  rotateBackground: boolean;
  rotateBackgroundInterval: number;
  wrapGameInQuotes: boolean;
}

const initialState: SettingsSliceState = {
  defaultSearchEngine: 'Google',
  rotateBackground: true,
  rotateBackgroundInterval: 20000,
  wrapGameInQuotes: false,
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
