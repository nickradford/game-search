import { createSlice } from "@reduxjs/toolkit";
import { getGameBySlug } from "../../util/rawg";

const initialState = {
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
    addBatchGames: (state, action) => ({
      ...state,
      byIds: {
        ...state.byIds,
        ...action.payload.reduce(
          (prev, curr) => ({ ...prev, [curr.slug]: curr }),
          {}
        ),
      },
    }),
    setSelectedGame: (state, action) => ({
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
      const prevSearches = state.searchs ? state.searches : {};
      const prevGameSearches =
        action.payload.gameSlug in state.searches
          ? state.searches[action.payload.gameSlug]
          : [];
      return {
        ...state,
        searches: {
          ...prevSearches,
          [action.payload.gameSlug]: [
            action.payload.search,
            ...prevGameSearches,
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

export function loadGameData(slug) {
  return async (dispatch) => {
    console.log("thunk", slug);

    await dispatch(loadGameDataStart());
    const game = await getGameBySlug(slug);
    await dispatch(addSingleGame(game));
    dispatch(loadGameDataSuccess());
  };
}
