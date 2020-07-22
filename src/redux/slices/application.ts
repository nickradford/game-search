import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRandomTop10Image } from '../../util/steam.top10';

export interface ApplicationSliceState {
  appBackground: string | null;
}

const initialState: ApplicationSliceState = {
  appBackground: getRandomTop10Image()
}

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    PURGE: () => initialState,
    setBackgroundUrl: (state, action : PayloadAction<string>) => {
      return {
        ...state, 
        appBackground: action.payload
      }
    },
    setRandomBackground: (state) => {
      const bg = getRandomTop10Image();
      console.log(bg);
      return {
        ...state,
        appBackground: bg
      }
    }
  }
})

export const { PURGE, setBackgroundUrl, setRandomBackground } = applicationSlice.actions;