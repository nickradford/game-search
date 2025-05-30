import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import SearchPage from './pages/search';
import GamePage from './pages/game';
import { ContactPage } from './pages/contact';
import { PrivacyPage } from './pages/privacy';
import { SettingsPage } from './pages/settings';
import { unpinGame } from './redux/slices/games';
import { initBackgroundGame, setRandomBackgroundGame } from './redux/slices/application';

import ImageTransition from './components/image-transition';
import { Header } from './components/header';
import { RAWGGame } from './interfaces/game';
import { CombinedStateStructure } from './redux/store';
import { Outlet, Routes, Route, Link, Navigate, useLocation } from 'react-router';

interface StateProps {
  backgroundGame: RAWGGame | null;
  backgroundUrl: string | undefined;
  favoriteGames: RAWGGame[];
  pinnedGame: RAWGGame | null | undefined;
}

function App() {
  const { backgroundGame, backgroundUrl, favoriteGames, pinnedGame } = useSelector<CombinedStateStructure, StateProps>(
    (state) => {
      return {
        backgroundGame: state.application.backgroundGame,
        backgroundUrl: state.application.backgroundUrl,
        favoriteGames: state.favorites.map((slug: string) => state.games.byIds[slug]).reverse(),
        pinnedGame: state.games.pinnedGame,
      };
    }
  );

  const dispatch = useDispatch();
  const randomizeBackground = () => dispatch(setRandomBackgroundGame());
  useEffect(() => {
    dispatch(initBackgroundGame());
  }, [dispatch]);
  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 h-64 z-0 overflow-hidden"
        style={{
          height: '100%',
        }}
      >
        <ImageTransition src={backgroundUrl} />
        <div
          className="absolute top-0 left-0 right-0 h-full z-20"
          style={{
            background: 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,1) 5%, rgba(26,32,44,0.5) 100%)',
          }}
        />
      </div>
      <div className="container min-h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
        <Header
          onClick={randomizeBackground}
          pinnedGame={pinnedGame}
          unpinGame={() => dispatch(unpinGame())}
          favorites={favoriteGames}
        />

        <Routes>
          <Route index element={pinnedGame ? <Navigate to={`/games/${pinnedGame.slug}`} /> : <SearchPage />} />
          <Route path="/search/:name?" element={<SearchPage />} />
          <Route path="/games/:slug" element={<GamePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Outlet />


        <footer className="flex justify-between">
          <aside>
            {backgroundGame !== null ? (
              <Link to={`/games/${backgroundGame.slug}`}>
                <span role="img" aria-label="photo emoji">
                  📷
                </span>
                : {backgroundGame ? backgroundGame.name : null}
              </Link>
            ) : null}
            {/* <button className='px-4' onClick={() => dispatch(setRandomBackgroundGame())}>→</button> */}
          </aside>
          <main>
            Game data provided by{' '}
            <a href="https://rawg.io" target="_new" rel="noopener nofollow" className="text-pink-500">
              rawg.io
            </a>
          </main>
        </footer>
      </div>
    </div>
  );
}

export default App;
