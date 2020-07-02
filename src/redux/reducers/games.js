import {
  SET_SELECTED_GAME,
  ADD_BATCH_GAMES,
  ADD_SINGLE_GAME,
} from "../actionTypes";

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
