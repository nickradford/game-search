import React, { useState, useCallback } from "react";

import { searchForGame } from "./util/rawg";
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
  let [applicationState, setApplicationState] = useState(
    APPLICATION_STATE.START
  );

  let [possibleMatches, setPossibleMatches] = useState(rdr);

  let content;

  switch (applicationState) {
    case APPLICATION_STATE.START:
      content = (
        <form
          className="flex flex-col items-center"
          onSubmit={async (e) => {
            console.log(e.target.game.value);
            e.preventDefault();
            let matches = await searchForGame(e.target.game.value);

            if (matches.length) {
              setPossibleMatches(matches);
              setApplicationState(APPLICATION_STATE.LISTING);
            }
          }}
        >
          <label htmlFor="game-title" className="text-2xl">
            What are you playing?
          </label>
          <input
            id="game-title"
            className="text-black rounded w-1/3 mt-4 px-4 py-2"
            placeholder="Cyberpunk 2077"
            name="game"
            autoFocus
          />
          <button
            className="rounded w-1/6 mt-6 py-1 border hover:bg-white hover:text-indigo-900"
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
        <div className="flex flex-col items-center overflow-auto">
          <p className="text-2xl mb-4">Which one of these?</p>
          <div className="flex items-center justify-center flex-wrap">
            {possibleMatches.map((match) => (
              <div
                key={match.id}
                className="w-64 h-48 mr-2 mb-4 relative bg-black bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${match.background_image})` }}
              >
                <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-black bg-opacity-50">
                  {match.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    case APPLICATION_STATE.SEARCHING:
      break;
    default:
      break;
  }

  return (
    <div className="container mx-auto flex flex-col justify-between">
      <header className="App-header">
        <h1 onClick={() => setApplicationState(APPLICATION_STATE.START)}>
          Game Search
        </h1>
      </header>
      <main className="">{content}</main>

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
                DuckDuckGo: {getDuckDuckGoUrl(formatSearchQuery(title, query))}
              </p>
            </div>
          )}
        </aside>
        <main>
          Game info from{" "}
          <a href="https://rawg.io" target="_new">
            rawg.io
          </a>
        </main>
      </footer>
    </div>
  );
}

export default App;
