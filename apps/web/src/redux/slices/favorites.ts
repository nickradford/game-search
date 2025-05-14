import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RAWGGameSlug } from '../../interfaces/game';

export type FavoritesSliceState = RAWGGameSlug[];

const initialState: FavoritesSliceState = [];

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    PURGE: () => initialState,
    toggleFavorite: (state, action: PayloadAction<RAWGGameSlug>) => {
      const slug = action.payload;
      const index = state.indexOf(slug);

      let favorites = [...state];

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(slug);
      }

      return favorites;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
