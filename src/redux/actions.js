// import { LOAD_GAME_DATA, ADD_SINGLE_GAME } from "./actionTypes";
// import { getGameBySlug } from "../util/rawg";

// export function loadGameData(slug) {
//   return async (dispatch) => {
//     console.log("thunk", slug);

//     await dispatch({ type: LOAD_GAME_DATA, payload: { slug } });
//     const game = await getGameBySlug(slug);

//     dispatch({ type: ADD_SINGLE_GAME, payload: game });
//   };
// }
