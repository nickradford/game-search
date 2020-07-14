import { createSlice } from "@reduxjs/toolkit";

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const slug = action.payload;
      const index = state.indexOf(slug);

      if (index > -1) {
        state.splice(index);
      } else {
        state.push(slug);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
