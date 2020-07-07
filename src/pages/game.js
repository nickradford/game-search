import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadGameData } from "../redux/actions";
import { SET_SELECTED_GAME } from "../redux/actionTypes";

const mapStateToProps = (state, { match: { params } }) => {
  const slug = params.slug;
  const gameKnown = slug in state.games.byIds;
  const gameData = gameKnown ? state.games.byIds[slug] : null;

  return {
    slug,
    gameKnown,
    gameData,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loadGame: (slug) => dispatch(loadGameData(slug)),
  setSelectedGame: (slug) =>
    dispatch({ type: SET_SELECTED_GAME, payload: { slug } }),
});

function GamePage({ slug, gameKnown, gameData, loadGame, setSelectedGame }) {
  const [loading, setLoading] = useState(!gameKnown);

  useEffect(() => {
    if (!gameKnown) {
      loadGame(slug);
    } else {
      setLoading(!gameKnown);
      setSelectedGame(slug);
    }
  }, [gameKnown, loadGame, setSelectedGame, slug]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex-1">
      <div className="flex min-h-full">
        <div className=" pr-4 sm:w-1/4 max-w-sm font-asap ">
          <h1 className="font-bold text-xl">{gameData.name}</h1>
          <p className="text-sm">Released {gameData.released}</p>
          <p className="text-sm">Metacritic {gameData.metacritic}</p>
        </div>
        <div className="px-4 flex-1 flex flex-col">
          <div className="">
            <input
              type="text"
              className="w-full my-4 px-6 py-2 text-xl rounded-full text-black"
              placeholder={`Search about ${gameData.name}`}
              autoFocus
            />
          </div>
          <div className=" flex-1 overflow-auto">
            <div>Map</div>
            <div>All Horses</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GamePage)
);
