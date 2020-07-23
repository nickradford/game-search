import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { v4 as generateID } from "uuid";

import { getGameBySlug } from "../../util/rawg";
import { RAWGGame } from "../../interfaces/game";

export interface GamesSliceState {
  selectedGameSlug: string | null;
  pinnedGame: RAWGGame | null;
  allKnownGames: RAWGGame[];
  byIds: {
    [key: string]: RAWGGame;
  };
  loading: boolean;
  searches: {
    [slug: string]: [
      {
        id: string;
        query: string;
        searchEngine: string;
        url: string;
        dateSearched: Date;
      }
    ];
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
  name: "games",
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
        ...action.payload.reduce(
          (prev, curr) => ({ ...prev, [curr.slug]: curr }),
          {}
        ),
      },
    }),
    setSelectedGame: (
      state,
      action: PayloadAction<RAWGGame | { slug: string } | null>
    ) => ({
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
      const prevGameSearches =
        action.payload.gameSlug in state.searches
          ? state.searches[action.payload.gameSlug]
          : [];
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
} = gamesSlice.actions;

export function loadGameData(slug: string) {
  return async (dispatch: Dispatch) => {
    console.log("thunk", slug);

    await dispatch(loadGameDataStart());
    const game = await getGameBySlug(slug);
    await dispatch(addSingleGame(game));
    dispatch(loadGameDataSuccess());
  };
}
