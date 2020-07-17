import { createSlice } from "@reduxjs/toolkit";
import { getGameBySlug } from "../../util/rawg";

const initialState = {
  selectedGameSlug: null,
  allKnownGames: [],
  byIds: {},
  loading: false,
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
  },
});

export const {
  addSingleGame,
  addBatchGames,
  loadGameDataStart,
  loadGameDataSuccess,
  setSelectedGame,
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
