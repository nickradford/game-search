import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { combineReducers } from "redux";
import { gamesSlice } from "./slices/games";
import { favoritesSlice } from "./slices/favorites";

export const rootReducer = combineReducers({
  games: gamesSlice.reducer,
  favorites: favoritesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
