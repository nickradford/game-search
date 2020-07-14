import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gamesSlice } from "./slices/games";
import { favoritesSlice } from "./slices/favorites";

const persistConfig = {
  key: "root",
  storage,
};

export const rootReducer = combineReducers({
  games: gamesSlice.reducer,
  favorites: favoritesSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
