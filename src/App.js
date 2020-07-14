import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";

import SearchPage from "./pages/search";
import GamePage from "./pages/game";
import { getRandomTop10Image } from "./util/steam.top10";

import ImageTransition from "./components/image-transition";

const mapStateToProps = ({ games }) => {
  let selectedGameImage;

  let slug = games.selectedGameSlug;

  if (slug && slug in games.byIds) {
    selectedGameImage = games.byIds[slug].background_image;
  }

  return {
    selectedGameImage,
  };
};

function App({ selectedGameImage }) {
  const [backgroundImage, setBackgroundImage] = useState();

  useEffect(() => {
    setBackgroundImage(selectedGameImage);
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
        <header className="font-asap italic text-2xl text-center py-2 md:text-left">
          <Link
            to="/"
            onClick={() => setBackgroundImage(getRandomTop10Image())}
          >
            Game Search
          </Link>
        </header>

        <Switch>
          <Route path="/games/:slug">
            <GamePage />
          </Route>
          <Route path="/search/:name" exact>
            <SearchPage />
          </Route>
          <Route path="/" exact>
            <SearchPage name={null} />
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

export default connect(mapStateToProps)(App);
