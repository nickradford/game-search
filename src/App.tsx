import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchPage from './pages/search';
import GamePage from './pages/game';
import { PrivacyPage } from './pages/privacy';
import { SettingsPage } from './pages/settings';
import { unpinGame as unpinGameAction } from './redux/slices/games';
import { setRandomBackground as setRandomBackgroundAction } from './redux/slices/application';

import ImageTransition from './components/image-transition';
import { Header } from './components/header';
import { RAWGGame } from './interfaces/game';
import { CombinedStateStructure } from './redux/store';

interface StateProps {
  appBackground: string | undefined;
  favoriteGames: RAWGGame[];
  pinnedGame: RAWGGame | null | undefined;
}

function App() {
  const { appBackground, favoriteGames, pinnedGame } = useSelector<CombinedStateStructure, StateProps>((state) => {
    return {
      appBackground: state.application.appBackground || undefined,
      favoriteGames: state.favorites.map((slug: string) => state.games.byIds[slug]).reverse(),
      pinnedGame: state.games.pinnedGame,
    };
  });

  const dispatch = useDispatch();
  const unpinGame = () => dispatch(unpinGameAction());
  const randomizeBackground = () => dispatch(setRandomBackgroundAction());

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 h-64 z-0 overflow-hidden"
        style={{
          height: '100%',
        }}
      >
        <ImageTransition src={appBackground} />
        <div
          className="absolute top-0 left-0 right-0 h-full z-20"
          style={{
            background: 'linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,1) 5%, rgba(26,32,44,0.5) 100%)',
          }}
        />
      </div>
      <div className="container min-h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
        <Header onClick={randomizeBackground} pinnedGame={pinnedGame} unpinGame={unpinGame} favorites={favoriteGames} />

        <Switch>
          <Route path="/games/:slug">
            <GamePage />
          </Route>
          <Route path="/search/:name?">
            <SearchPage />
          </Route>
          <Route path="/privacy" exact>
            <PrivacyPage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
          <Route path="/" exact>
            {pinnedGame ? <Redirect to={`/games/${pinnedGame.slug}`} /> : <SearchPage />}
          </Route>
        </Switch>

        <footer className="flex justify-end">
          <main>
            Game data provided by{' '}
            <a href="https://rawg.io" target="_new" rel="noopener nofollow" className="text-pink-600">
              rawg.io
            </a>
          </main>
        </footer>
      </div>
    </div>
  );
}

export default App;
