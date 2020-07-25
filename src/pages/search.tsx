import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useDebounce } from 'use-debounce';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';

import { searchForGame, formatSearchTerm, slugToString } from '../util/rawg';

import { setSelectedGame, addBatchGames } from '../redux/slices/games';
import { CombinedStateStructure } from '../redux/store';
import { GameCard } from '../components/game-card';
import { RAWGGame } from '../interfaces/game';
import { useRandomBackground } from '../util/useRandomBackground';

function Search() {
  const history = useHistory();
  const { name } = useParams();

  const [searchTerm, setSearchTerm] = useState(slugToString(name) || '');
  const [searching, setSearching] = useState(name !== '');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 350);
  const [allMatches, setAllMatches] = useState<RAWGGame[]>([]);

  const dispatch = useDispatch();

  const favoriteGames = useSelector<CombinedStateStructure, RAWGGame[]>((state) => {
    const favoriteSlugs = [...state.favorites];
    favoriteSlugs.reverse();

    const favoriteGames = favoriteSlugs
      .map((slug) => (slug in state.games.byIds ? state.games.byIds[slug] : null))
      .filter((g) => g != null) as RAWGGame[];
    return favoriteGames;
  });

  const selectGame = (game: RAWGGame | null) => dispatch(setSelectedGame(game));
  const addGamesToKnownGames = (games: RAWGGame[]) => dispatch(addBatchGames(games));

  useRandomBackground();

  useEffect(() => {
    dispatch(setSelectedGame(null));
  }, [dispatch]);

  useEffect(() => {
    if (name === undefined) {
      setAllMatches([]);
      setSearchTerm('');
    }
  }, [name]);

  useEffect(() => {
    const search = async (searchTerm = '') => {
      if (searchTerm === '') {
        setSearching(false);
        setAllMatches([]);
        return;
      }

      setSearching(true);

      try {
        let [, allMatches] = await searchForGame(searchTerm, 'exclude_additions', true);
        setAllMatches(allMatches);
        addGamesToKnownGames(allMatches);

        history.push(`/search/${formatSearchTerm(searchTerm)}`);

        setSearching(false);
      } catch (e) {
        // This is probably from a cancelled request
        console.warn(e);
      }
    };

    search(debouncedSearchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, history]);

  const cn = classnames('flex-1 mt-8 sm:flex items-center flex-col', {
    'sm:flex-initial': allMatches.length === 0,
  });

  return (
    <>
      <Helmet>
        <title>Game Search</title>
      </Helmet>
      <div className={cn}>
        <form
          className="flex-col w-full sm:w-1/2 md:w-1/3 text-center"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="game-title" className="font-asap italic text-2xl">
            What are you playing?
          </label>
          <input
            id="game-title"
            className="text-black rounded w-full mt-4 px-4 py-2 text-xl shadow-2xl"
            placeholder="Cyberpunk 2077"
            inputMode="search"
            name="game"
            value={searchTerm}
            onChange={(e) => {
              setSearching(true);
              setSearchTerm(e.target.value);
            }}
            autoFocus
          />
        </form>
        <div className="mt-6 h-6 flex justify-center">{searching && <SyncLoader color="white" size="8px" />}</div>
        <div className="flex flex-row w-full px-8 mt-8 flex-wrap m-auto items-center justify-center">
          {allMatches.map((match) => (
            <GameCard
              game={match}
              key={match.slug}
              onClick={() => {
                selectGame(match);
              }}
            />
          ))}
        </div>
        {favoriteGames.length ? (
          <>
            <h2 className="text-center font-asap italic">Your favorites</h2>
            <div className="flex w-full px-8 mt-8 flex-wrap m-auto items-center justify-center">
              {favoriteGames.map((game) => (
                <GameCard
                  game={game}
                  key={game.slug}
                  onClick={() => {
                    selectGame(game);
                  }}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Search;
