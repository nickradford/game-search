import { SET_SELECTED_GAME, ADD_BATCH_GAMES } from "../actionTypes";

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

    case ADD_BATCH_GAMES:
      const games = action.payload;
      console.log(games);
      const obj = games.reduce(
        (prev, curr) => ({ ...prev, [curr.slug]: curr }),
        {}
      );

      console.log(obj);

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
