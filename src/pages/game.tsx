import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import TimeAgo from 'react-timeago';

import { getSearchURL, SearchEngineKeys } from '../util/search.util';
import { Button } from '../components/button';
import { setBackgroundGame } from '../redux/slices/application';
import {
  setSelectedGame as setSelectedGameAction,
  loadGameData,
  addSearch as addSearchAction,
  setPinnedGame as setPinnedGameAction,
  unpinGame,
  removeSearch,
} from '../redux/slices/games';
import { toggleFavorite } from '../redux/slices/favorites';
import { CombinedStateStructure } from '../redux/store';
import { RAWGGame } from '../interfaces/game';

const safeWindowOpen = (url: string) => window.open(url, '_blank', 'noopener noreferrer');

interface Search {
  id: string;
  query: string;
  url: string;
  dateSearched: Date;
}

interface StateProps {
  gameKnown: boolean;
  gameData: RAWGGame | null;
  isFavorite: boolean;
  isPinnedGame: boolean;
  previousSearches: Search[];
  searchEngine: SearchEngineKeys;
  wrapGameInQuotes: boolean;
}

function GamePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const selector = (state: CombinedStateStructure) => {
    const gameKnown = slug in state.games.byIds;
    const gameData = gameKnown ? state.games.byIds[slug] : null;
    const isFavorite = state.favorites.indexOf(slug) !== -1;
    const previousSearches: Search[] = slug in state.games.searches ? [...state.games.searches[slug]].reverse() : [];
    const isPinnedGame = state.games.pinnedGame ? slug === state.games.pinnedGame.slug : false;
    const searchEngine = state.settings.defaultSearchEngine;
    const wrapGameInQuotes = state.settings.wrapGameInQuotes;

    return {
      gameKnown,
      gameData,
      isFavorite,
      isPinnedGame,
      previousSearches,
      searchEngine,
      wrapGameInQuotes,
    };
  };

  const {
    gameKnown,
    gameData,
    isFavorite,
    isPinnedGame,
    previousSearches,
    searchEngine,
    wrapGameInQuotes,
  } = useSelector<CombinedStateStructure, StateProps>(selector);

  // Sets the application background once the gameData is loaded
  useEffect(() => {
    if (gameData) {
      dispatch(setBackgroundGame(gameData));
    }
  }, [dispatch, gameData]);

  const toggleIsFavorite = (slug: string) => dispatch(toggleFavorite(slug));
  const setPinnedGame = (game: RAWGGame) => dispatch(setPinnedGameAction(game));
  const clearPinnedGame = () => dispatch(unpinGame());

  const addSearch = (gameSlug: string, query: string, searchEngine: SearchEngineKeys, generatedUrl: string) =>
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
    );

  const getSearchURLforGame = (q: string) =>
    getSearchURL(wrapGameInQuotes ? `"${gameData!.name}"` : gameData!.name, q, searchEngine);

  const [loading, setLoading] = useState(!gameKnown);
  const [searchValue, setSearchValue] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!gameKnown) {
      dispatch(loadGameData(slug));
    } else {
      setLoading(!gameKnown);
      dispatch(setSelectedGameAction({ slug }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameKnown, slug]);

  if (loading || !gameData) {
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
            <h1 className="font-bold text-xl text-center md:text-left">{gameData.name}</h1>
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
                {isFavorite ? 'Remove from' : 'Add to'} favorites
              </Button>
              {isFavorite ? (
                <Button
                  selected={isPinnedGame}
                  onClick={() => (isPinnedGame ? clearPinnedGame() : setPinnedGame(gameData))}
                  className="text-sm hover:bg-white hover:text-black uppercase mt-4"
                  title="Pinning a game will load this game when you first visit the website"
                >
                  {isPinnedGame ? 'Remove Pin' : 'Pin game'}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="px-4 flex-1 flex flex-col">
            <form
              className="flex flex-col sm:flex-row items-center mb-4"
              onSubmit={(e) => {
                e.preventDefault();

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
                onFocus={() => {
                  if (isEditing) {
                    setIsEditing(false);
                  }
                }}
                autoFocus
              />
              <Button className="w-full sm:w-auto" selected type="submit">
                Search with {searchEngine}
              </Button>
            </form>
            {previousSearches.length ? (
              <div className="flex-1 overflow-auto">
                <div className="flex justify-between items-center">
                  <h2>Previous Searches</h2>
                  <div className="flex">
                    <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? 'Done' : 'Edit'}</Button>
                  </div>
                </div>
                <hr className="opacity-25 my-2" />
                {previousSearches.map((search) => (
                  <div key={search.id} className="flex items-center">
                    <a
                      className="py-3 px-3 hover:bg-black hover:bg-opacity-50 rounded cursor-pointer flex justify-between flex-1"
                      key={search.id}
                      href={search.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <span>{search.query}</span>
                      <TimeAgo date={search.dateSearched} />
                    </a>
                    {isEditing ? (
                      <Button onClick={() => dispatch(removeSearch({ slug, id: search.id }))}>Delete</Button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(GamePage);
