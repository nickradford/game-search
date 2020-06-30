import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";

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

function App() {
  let [title, setTitle] = useState();
  let [query, setQuery] = useState();
  let [debug, setDebug] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Game Search</h1>
      </header>
      <main>
        <div>
          <label htmlFor="game-title">Game Title</label>&nbsp;
          <input
            id="game-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="query">Search Query</label>&nbsp;
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          {(() => {
            const q = formatSearchQuery(title, query);

            return (
              title &&
              query && (
                <>
                  <a href={getGoogleUrl(q)} className="btn">
                    Google
                  </a>
                  <a href={getDuckDuckGoUrl(q)} className="btn">
                    DuckDuckGo
                  </a>
                </>
              )
            );
          })()}
        </div>
      </main>
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
    </div>
  );
}

export default App;
