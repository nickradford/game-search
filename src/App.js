import React, { useState, useCallback } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Search from "./pages/search";
import TargetedSearch from "./pages/targetedSearch";

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

function App() {
  let [title, setTitle] = useState();
  let [query, setQuery] = useState();
  let [debug, setDebug] = useState();
  let [selectedGame, setSelectedGame] = useState();
  let [applicationState, setApplicationState] = useState(
    APPLICATION_STATE.START
  );

  let [possibleMatches, setPossibleMatches] = useState(rdr);

  let content;

  switch (applicationState) {
    case APPLICATION_STATE.START:
      content = (
        <form
          className="flex-1 sm:flex-initial mt-8 flex flex-col items-center px-4"
          onSubmit={async (e) => {
            console.log(e.target.game.value);
            e.preventDefault();
            e.persist();

            let [exactMatch, allMatches] = await searchForGame(
              e.target.game.value
            );

            setPossibleMatches(allMatches);
            if (exactMatch) {
              setSelectedGame(exactMatch);
              setApplicationState(APPLICATION_STATE.SEARCHING);
            } else {
              setApplicationState(APPLICATION_STATE.LISTING);
            }
          }}
        >
          <label htmlFor="game-title" className="text-2xl">
            What are you playing?
          </label>
          <input
            id="game-title"
            className="text-black rounded w-full sm:w-1/3 mt-4 px-4 py-2"
            placeholder="Cyberpunk 2077"
            name="game"
            autoFocus
          />
          <button
            className="rounded w-full sm:w-1/6 mt-6 py-1 border hover:bg-white hover:text-indigo-900"
            type="submit"
          >
            Next
          </button>
          {possibleMatches.length}
        </form>
      );
      break;
    case APPLICATION_STATE.LISTING:
      content = (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-2xl mb-4">Which one of these?</p>
          <div className="flex flex-col w-full px-4 sm:flex-row items-center justify-center flex-wrap">
            {possibleMatches.map((match) => (
              <div
                key={match.id}
                className="w-full md:w-64 h-48 mr-2 mb-4 relative bg-black bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${match.background_image})` }}
                onClick={() => {
                  setSelectedGame(match);
                  setApplicationState(APPLICATION_STATE.SEARCHING);
                }}
              >
                <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-black bg-opacity-50">
                  {match.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case APPLICATION_STATE.SEARCHING:
      content = (
        <div className="flex-1 mt-8 flex">
          <header>
            <h1>{selectedGame.name}</h1>
            <h2>{selectedGame.released}</h2>
          </header>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div className="w-full h-full bg-gray-900 text-white">
      <div
        className="absolute top-0 left-0 right-0 h-64 bg-indigo-900 z-0"
        style={{
          height: "70%",
          backgroundImage:
            "url(https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg)",
          backgroundSize: "100%",
          backgroundPosition: "top",
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
      <div className="container h-full mx-auto flex flex-col sm:justify-between z-10 relative">
        <header className="font-asap italic text-2xl">
          <Link to="/">Game Search</Link>
        </header>

        {/* {content} */}
        <Switch>
          <Route path="/games/:slug">
            <TargetedSearch />
          </Route>
          <Route path="/search/:name" exact>
            <Search />
          </Route>
          <Route path="/" exact>
            <Search name={null} />
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

export default App;
