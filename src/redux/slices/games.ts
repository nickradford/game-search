import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';

import { v4 as generateID } from 'uuid';

import { getGameBySlug } from '../../util/rawg';
import { RAWGGame } from '../../interfaces/game';

interface GameSearch {
  id: string;
  query: string;
  searchEngine: string;
  url: string;
  dateSearched: Date;
}

export interface GamesSliceState {
  selectedGameSlug: string | null;
  pinnedGame: RAWGGame | null;
  allKnownGames: RAWGGame[];
  byIds: {
    [key: string]: RAWGGame;
  };
  loading: boolean;
  searches: {
    [slug: string]: GameSearch[];
  };
}

const initialState: GamesSliceState = {
  selectedGameSlug: null,
  pinnedGame: null,
  allKnownGames: [],
  byIds: {},
  loading: false,
  searches: {},
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    PURGE: () => initialState,
    loadGameDataStart: (state) => ({ ...state, loading: true }),
    loadGameDataSuccess: (state) => {
      state.loading = false;
    },
    addSingleGame: (state, action) => ({
      ...state,
      byIds: {
        ...state.byIds,
        [action.payload.slug]: action.payload,
      },
      allKnownGames: [...state.allKnownGames, action.payload],
    }),
    addBatchGames: (state, action: PayloadAction<RAWGGame[]>) => ({
      ...state,
      byIds: {
        ...state.byIds,
        ...action.payload.reduce((prev, curr) => ({ ...prev, [curr.slug]: curr }), {}),
      },
    }),
    setSelectedGame: (state, action: PayloadAction<RAWGGame | { slug: string } | null>) => ({
      ...state,
      selectedGameSlug: action.payload ? action.payload.slug : null,
    }),
    setPinnedGame: (state, action) => ({
      ...state,
      pinnedGame: action.payload,
    }),
    unpinGame: (state) => ({
      ...state,
      pinnedGame: null,
    }),
    addSearch: (state, action) => {
      const prevSearches = state.searches ? state.searches : {};
      const prevGameSearches = action.payload.gameSlug in state.searches ? state.searches[action.payload.gameSlug] : [];
      return {
        ...state,
        searches: {
          ...prevSearches,
          [action.payload.gameSlug]: [
            ...prevGameSearches,
            {
              ...action.payload.search,
              id: generateID(),
            },
          ],
        },
      };
    },
    removeSearch: (state, { payload: { slug, id } }: PayloadAction<{ slug: string; id: string }>) => {
      const gameSearches = [...state.searches[slug]];
      let searchIndex = -1;

      for (let index = 0; index < gameSearches.length; index++) {
        const search = gameSearches[index];
        if (search.id === id) {
          searchIndex = index;
          break;
        }
      }

      if (searchIndex !== -1) {
        console.log(searchIndex);
        gameSearches.splice(searchIndex, 1);
      }
      console.log(gameSearches);

      return {
        ...state,
        searches: {
          ...state.searches,
          [slug]: gameSearches,
        },
      };
    },
  },
});

export const {
  addSingleGame,
  addBatchGames,
  loadGameDataStart,
  loadGameDataSuccess,
  setSelectedGame,
  setPinnedGame,
  unpinGame,
  addSearch,
  removeSearch,
} = gamesSlice.actions;

export function loadGameData(slug: string) {
  return async (dispatch: Dispatch) => {
    console.log('thunk', slug);

    await dispatch(loadGameDataStart());
    const game = await getGameBySlug(slug);
    await dispatch(addSingleGame(game));
    dispatch(loadGameDataSuccess());
  };
}
