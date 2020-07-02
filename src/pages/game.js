import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loadGameData } from "../redux/actions";

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
});

function GamePage({ slug, gameKnown, gameData, loadGame }) {
  const [loading, setLoading] = useState(!gameKnown);

  if (!gameKnown) {
    loadGame(slug);
  }

  useEffect(() => {
    setLoading(!gameKnown);
  }, [gameKnown]);

  if (loading) {
    return null;
  }

  return (
    <div className="flex-1">
      {gameData.name} - {gameData.released}
    </div>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GamePage)
);
