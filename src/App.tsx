import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import SearchPage from "./pages/search";
import GamePage from "./pages/game";
import { PrivacyPage } from "./pages/privacy";
import { SettingsPage } from "./pages/settings";
import { getRandomTop10Image } from "./util/steam.top10";
import { unpinGame as unpinGameAction } from "./redux/slices/games";

import ImageTransition from "./components/image-transition";
import { Header } from "./components/header";
import { RAWGGame } from "./interfaces/game";
import { CombinedStateStructure } from "./redux/store";


interface StateProps {
  selectedGameImage?: string;
  favoriteGames: RAWGGame[];
  pinnedGame: RAWGGame | null | undefined;
}

function App() {
  const dispatch = useDispatch();

  const [backgroundImage, setBackgroundImage] = useState<string>();

  const {selectedGameImage, favoriteGames, pinnedGame} = useSelector<CombinedStateStructure, StateProps>(state => {
    
    let selectedGameImage;

    let slug = state.games.selectedGameSlug;
    let { pinnedGame } = state.games;

    if (slug && slug in state.games.byIds) {
      selectedGameImage = state.games.byIds[slug].background_image;
    }

    const favoriteGames = state.favorites.map((slug:string) => state.games.byIds[slug]).reverse();

    return {
      selectedGameImage,
      favoriteGames,
      pinnedGame,
    };
  })

  const unpinGame = () => dispatch(unpinGameAction())

  useEffect(() => {
    if (selectedGameImage) {
      setBackgroundImage(selectedGameImage);
    }
  }, [selectedGameImage]);

  const route = useRouteMatch();

  useEffect(() => {
    if (route.path === "/" && route.isExact) {
      setBackgroundImage(getRandomTop10Image());
      console.log("setting");
    }
  }, [route.isExact, route.path]);

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 h-64 z-0 overflow-hidden"
        style={{
          height: "100%",
        }}
      >
        <ImageTransition src={backgroundImage} />
        <div
          className="absolute top-0 left-0 right-0 h-full z-20"
          style={{
            background:
              "linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,1) 5%, rgba(26,32,44,0.5) 100%)",
          }}
        />
      </div>
      <div className="container min-h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
        <Header
          onClick={() => setBackgroundImage(getRandomTop10Image())}
          pinnedGame={pinnedGame}
          unpinGame={unpinGame}
          favorites={favoriteGames}
        />

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
            {pinnedGame ? (
              <Redirect to={`/games/${pinnedGame.slug}`} />
            ) : (
              <SearchPage />
            )}
          </Route>
        </Switch>

        <footer className="flex justify-end">
          <main>
            Game data provided by{" "}
            <a
              href="https://rawg.io"
              target="_new"
              rel="noopener nofollow"
              className="text-pink-600"
            >
              rawg.io
            </a>
          </main>
        </footer>
      </div>
    </div>
  );
}

export default App;
