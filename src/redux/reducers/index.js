import { combineReducers } from "redux";
import { gamesSlice } from "./games";

export const rootReducer = combineReducers({
  games: gamesSlice.reducer,
});
