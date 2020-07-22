import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import TimeAgo from "react-timeago";

import { getSearchURL } from "../util/search.util";
import { Button } from "../components/button";
import {
  setSelectedGame,
  loadGameData,
  addSearch as addSearchAction,
  setPinnedGame as setPinnedGameAction,
  unpinGame,
} from "../redux/slices/games";
import { toggleFavorite } from "../redux/slices/favorites";

const safeWindowOpen = (url) =>
  window.open(url, "_blank", "noopener noreferrer");

const mapStateToProps = (state, { match: { params } }) => {
  const slug = params.slug;
  const gameKnown = slug in state.games.byIds;
  const gameData = gameKnown ? state.games.byIds[slug] : null;
  const isFavorite = state.favorites.indexOf(slug) !== -1;
  const previousSearches =
    slug in state.games.searches ? state.games.searches[slug] : [];

  return {
    slug,
    gameKnown,
    gameData,
    isFavorite,
    isPinnedGame: state.games.pinnedGame
      ? slug === state.games.pinnedGame.slug
      : false,
    previousSearches,
    searchEngine: state.settings.defaultSearchEngine,
    getSearchURLforGame: (q) =>
      getSearchURL(gameData.name, q, state.settings.defaultSearchEngine),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadGame: (slug) => dispatch(loadGameData(slug)),
  setSelectedGame: (slug) => dispatch(setSelectedGame({ slug })),
  toggleIsFavorite: (slug) => dispatch(toggleFavorite(slug)),
  setPinnedGame: (game) => dispatch(setPinnedGameAction(game)),
  clearPinnedGame: () => dispatch(unpinGame()),
  addSearch: (gameSlug, query, searchEngine, generatedUrl) =>
    dispatch(
      addSearchAction({
        gameSlug,
        search: {
          query,
          searchEngine,
          url: generatedUrl,
          dateSearched: Date.now(),
        },
      })
    ),
});

function GamePage({
  slug,
  gameKnown,
  gameData,
  loadGame,
  setSelectedGame,
  isFavorite,
  toggleIsFavorite,
  searchEngine,
  getSearchURLforGame,
  setPinnedGame,
  isPinnedGame,
  clearPinnedGame,
  addSearch,
  previousSearches,
}) {
  const [loading, setLoading] = useState(!gameKnown);
  const [searchValue, setSearchValue] = useState("");

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
    <>
      <Helmet>
        <title>{gameData.name} | Game Search</title>
      </Helmet>
      <div className="flex-1">
        <div className="flex min-h-full flex-col md:flex-row">
          <div className="w-full md:pr-4 md:w-1/4 md:max-w-sm font-asap ">
            <h1 className="font-bold text-xl text-center md:text-left">
              {gameData.name}
            </h1>
            <div className="hidden md:block text-sm mb-4">
              {gameData.released && <p>Released {gameData.released}</p>}
              {gameData.metacritic && <p>Metacritic {gameData.metacritic}</p>}
            </div>
            <div className="flex flex-col justify-center md:justify-start">
              <Button
                selected={isFavorite}
                onClick={() => {
                  if (isFavorite) {
                    clearPinnedGame();
                  }
                  toggleIsFavorite(slug);
                }}
                className="text-sm hover:bg-white hover:text-black uppercase tracking-wider"
              >
                {isFavorite ? "Remove from" : "Add to"} favorites
              </Button>
              {isFavorite ? (
                <Button
                  selected={isPinnedGame}
                  onClick={() =>
                    isPinnedGame ? clearPinnedGame() : setPinnedGame(gameData)
                  }
                  className="text-sm hover:bg-white hover:text-black uppercase mt-4"
                  title="Pinning a game will load this game when you first visit the website"
                >
                  {isPinnedGame ? "Remove Pin" : "Pin game"}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="px-4 flex-1 flex flex-col">
            <form
              className="flex flex-col sm:flex-row items-center mb-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("search value", searchValue);
                console.log("url", getSearchURLforGame(searchValue));
                const url = getSearchURLforGame(searchValue);
                addSearch(slug, searchValue, searchEngine, url);
                safeWindowOpen(url);
              }}
            >
              <input
                type="text"
                className="w-full flex-1 my-4 sm:mr-4 px-6 py-2 text-xl rounded text-black"
                placeholder={`Search about ${gameData.name}`}
                value={searchValue}
                inputMode="search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                autoFocus
              />
              <Button className="w-full sm:w-auto" selected type="submit">
                Search with {searchEngine}
              </Button>
            </form>
            {previousSearches.length ? (
              <div className="flex-1 overflow-auto">
                <h2>Previous Searches</h2>
                <hr className="opacity-25 my-2" />
                {previousSearches.map((search) => (
                  <a
                    className="py-3 px-3 hover:bg-black hover:bg-opacity-50 rounded cursor-pointer flex justify-between"
                    key={search.url}
                    href={search.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span>{search.query}</span>
                    <TimeAgo date={search.dateSearched} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GamePage)
);
