import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers, CombinedState } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import localForage from "localforage";

import { gamesSlice, GamesSliceState } from "./slices/games";
import { favoritesSlice, FavoritesSliceState } from "./slices/favorites";
import { settingsSlice, SettingsSliceState } from "./slices/settings";

const persistConfig = {
  key: "root",
  storage: localForage,
  stateReconciler: autoMergeLevel2,
};

export { localForage as storage };

export const rootReducer = combineReducers({
  games: gamesSlice.reducer,
  favorites: favoritesSlice.reducer,
  settings: settingsSlice.reducer,
});

export type CombinedStateStructure = CombinedState<{
  games: GamesSliceState;
  favorites: FavoritesSliceState;
  settings: SettingsSliceState;
}>;

const persistedReducer = persistReducer<CombinedStateStructure>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const slices = [gamesSlice, favoritesSlice, settingsSlice];

export const purge = () => {
  persistor.pause();
  slices.forEach((slice) => store.dispatch(slice.actions.PURGE()));
  persistor.persist();
};

export const persistor = persistStore(store, {
  // @ts-ignore until https://github.com/rt2zz/redux-persist/pull/1185 is merged and released
  manualPersist: true,
});
