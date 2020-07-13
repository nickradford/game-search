import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import SearchPage from "./pages/search";
import GamePage from "./pages/game";

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
  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 bg-black h-64 z-0 overflow-hidden"
        style={{
          height: "70%",
        }}
      >
        <ImageTransition src={selectedGameImage} />
        <div
          className="absolute top-0 left-0 right-0 h-full z-20"
          style={{
            background:
              "linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,0.5) 100%)",
          }}
        />
      </div>
      <div className="container min-h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
        <header className="font-asap italic text-2xl text-center py-2 md:text-left">
          <Link to="/">Game Search</Link>
        </header>

        {/* {content} */}
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
