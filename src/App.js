import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import SearchPage from "./pages/search";
import GamePage from "./pages/game";
import { PrivacyPage } from "./pages/privacy";
import { SettingsPage } from "./pages/settings";
import { getRandomTop10Image } from "./util/steam.top10";

import ImageTransition from "./components/image-transition";
import { Header } from "./components/header";

const mapStateToProps = ({ games, favorites }) => {
  let selectedGameImage;

  let slug = games.selectedGameSlug;

  if (slug && slug in games.byIds) {
    selectedGameImage = games.byIds[slug].background_image;
  }

  const favoriteGames = favorites.map((slug) => games.byIds[slug]);

  return {
    selectedGameImage,
    favoriteGames,
  };
};

function App({ selectedGameImage, favoriteGames }) {
  const [backgroundImage, setBackgroundImage] = useState();

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
          favorites={favoriteGames}
        />

        <Switch>
          <Route path="/games/:slug">
            <GamePage />
          </Route>
          <Route path="/search/:name" exact>
            <SearchPage />
          </Route>
          <Route path="/privacy" exact>
            <PrivacyPage />
          </Route>
          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
          <Route path="/" exact>
            <SearchPage name={null} />
          </Route>
        </Switch>

        <footer className="flex justify-end">
          <main>
            {/* Temp */}
            <div>
              Icons made by{" "}
              <a href="https://www.flaticon.com/authors/monkik" title="monkik">
                monkik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
            </div>
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

export default connect(mapStateToProps)(App);
