import { createSlice } from "@reduxjs/toolkit";
import { getGameBySlug } from "../../util/rawg";

import {
  SET_SELECTED_GAME,
  ADD_BATCH_GAMES,
  ADD_SINGLE_GAME,
} from "../actionTypes";

export const gamesSlice = createSlice({
  name: "games",
  initialState: {
    selectedGameSlug: null,
    allKnownGames: [],
    byIds: {},
    loading: false,
  },
  reducers: {
    loadGameDataStart: (state) => ({ ...state, loading: true }),
    loadGameDataSuccess: (state, action) => {
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
    setSelectedGame: (state, action) => ({
      ...state,
      selectedGameSlug: action.payload.slug,
    }),
  },
});

export const {
  addSingleGame,
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

const initialState = {
  selectedGameSlug: null,
  allKnownGames: [],
  byIds: {},
};

export default function gamesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_GAME:
      const { slug } = action.payload;

      return {
        ...state,
        selectedGameSlug: slug,
      };

    case ADD_SINGLE_GAME:
      const game = action.payload;

      return {
        ...state,
        byIds: {
          ...state.byIds,
          [game.slug]: game,
        },
      };

    case ADD_BATCH_GAMES:
      const games = action.payload;
      console.log(games);
      const obj = games.reduce(
        (prev, curr) => ({ ...prev, [curr.slug]: curr }),
        {}
      );

      return {
        ...state,
        byIds: {
          ...state.byIds,
          ...obj,
        },
      };

    default:
      return state;
  }
}
