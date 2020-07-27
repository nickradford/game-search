import { createSlice, PayloadAction, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { getRandomTop10Image } from '../../util/steam.top10';
import { getRandomGameSlug } from '../../util/top-game-slugs';
import { RAWGGame } from '../../interfaces/game';
import { CombinedStateStructure } from '../store';
import { loadGameData } from './games';

export interface ApplicationSliceState {
  appBackground: string | null;
  backgroundGameSlug: string;
  backgroundGame: RAWGGame | null;
  backgroundUrl: string | undefined;
}

const initialState: ApplicationSliceState = {
  appBackground: getRandomTop10Image(),
  backgroundGameSlug: getRandomGameSlug(),
  backgroundGame: null,
  backgroundUrl: '',
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    PURGE: () => initialState,
    setBackgroundUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        backgroundUrl: action.payload,
      };
    },

    setAppBackground: (state, { payload: { appBackground } }: PayloadAction<{ appBackground: string }>) => {
      return {
        ...state,
        appBackground,
      };
    },

    setBackgroundGame: (state, action: PayloadAction<RAWGGame>) => {
      console.log(action);
      return {
        ...state,
        backgroundGame: action.payload,
        backgroundGameSlug: action.payload.slug,
        backgroundUrl: action.payload.background_image,
      };
    },
  },
});

export function initBackgroundGame() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => CombinedStateStructure) => {
    const state = getState();
    const game = await dispatch(loadGameData(state.application.backgroundGameSlug));
    dispatch(setBackgroundGame(game));
  };
}

export function setRandomBackgroundGame() {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => CombinedStateStructure) => {
    // get new slug in loop to make sure its new
    const state = getState();
    let slug = state.application.backgroundGameSlug;
    while (slug === state.application.backgroundGameSlug) {
      slug = getRandomGameSlug();
    }

    // if the game isn't loaded, dispatch action to load it
    const game = await dispatch(loadGameData(slug));

    // finally when its loaded, set the app background
    dispatch(setBackgroundGame(game));
  };
}

export const { PURGE, setBackgroundUrl, setBackgroundGame } = applicationSlice.actions;
