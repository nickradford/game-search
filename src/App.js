import React, { useState, useCallback } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import SearchPage from "./pages/search";
import GamePage from "./pages/game";

import { searchForGame, findGameByTitle } from "./util/rawg";
import { rdr } from "./rdr";

const formatSearchQuery = (title = "", query = "") => {
  const space = /\s/gi;
  return `${title} ${query}`.trim().replace(space, "+");
};

const getGoogleUrl = (sq = "") => {
  return `https://google.com/search?q=${sq}`;
};

const getDuckDuckGoUrl = (sq = "") => {
  return `https://duckduckgo.com/?q=${sq}`;
};

const APPLICATION_STATE = {
  START: 1,
  LISTING: 2,
  SEARCHING: 3,
};

const mapStateToProps = ({ games }) => {
  let selectedGameImage =
    "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg";

  let slug = games.selectedGameSlug;

  if (slug && slug in games.byIds) {
    selectedGameImage = games.byIds[slug].background_image;
  }

  return {
    selectedGameImage,
  };
};

function App({ selectedGameImage }) {
  let [title, setTitle] = useState();
  let [query, setQuery] = useState();
  let [debug, setDebug] = useState();
  let [selectedGame, setSelectedGame] = useState();
  let [applicationState, setApplicationState] = useState(
    APPLICATION_STATE.START
  );

  let [possibleMatches, setPossibleMatches] = useState(rdr);

  let content;

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 h-64 bg-indigo-900 z-0 bg-cover"
        style={{
          height: "70%",
          backgroundImage: `url(${selectedGameImage})`,
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="top-0 left-0 right-0 h-full"
          style={{
            background:
              "linear-gradient(0deg, rgba(26,32,44,1) 0%, rgba(26,32,44,0.5) 100%)",
          }}
        />
      </div>
      <div className="container h-full mx-auto flex flex-col sm:justify-between z-10 relative px-4">
        <header className="font-asap italic text-2xl text-center py-2 sm:text-left">
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

        <footer className="flex justify-between">
          <aside>
            <pre onClick={() => setDebug(!debug)}>debug</pre>
            {debug && (
              <div>
                <p>Game: {title}</p>
                <p>Query: {query}</p>

                <p>Search Query: {formatSearchQuery(title, query)}</p>
                <p>Google: {getGoogleUrl(formatSearchQuery(title, query))}</p>
                <p>
                  DuckDuckGo:{" "}
                  {getDuckDuckGoUrl(formatSearchQuery(title, query))}
                </p>
                <pre>{JSON.stringify(selectedGame, null, 4)}</pre>
              </div>
            )}
          </aside>
          <main>
            Game data provided by{" "}
            <a href="https://rawg.io" target="_new">
              rawg.io
            </a>
          </main>
        </footer>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App);
