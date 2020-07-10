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

  const prevSearches = [
    "Map",
    "Cheat Codes",
    "Walkthrough",
    "Twitch Streams",
    "Wiki",
  ];

  return (
    <div className="flex-1">
      <div className="flex min-h-full flex-col md:flex-row">
        <div className="w-full md:pr-4 md:w-1/4 md:max-w-sm font-asap ">
          <h1 className="font-bold text-xl text-center md:text-left">
            {gameData.name}
          </h1>
          <div className="hidden md:block text-sm">
            {gameData.released && <p>Released {gameData.released}</p>}
            {gameData.metacritic && <p>Metacritic {gameData.metacritic}</p>}
          </div>
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
          <div className="flex-1 overflow-auto">
            <h2>Previous Searches</h2>
            <hr className="opacity-25 my-2" />
            {prevSearches.map((value, index) => (
              <div
                className="py-3 px-3 hover:bg-black hover:bg-opacity-50 rounded cursor-pointer"
                key={index}
              >
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GamePage)
);
