import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
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
