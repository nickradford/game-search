import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { combineReducers } from "redux";
import { gamesSlice } from "./slices/games";

export const rootReducer = combineReducers({
  games: gamesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
