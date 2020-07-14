import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useDebounce } from "use-debounce";
import { Link, useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";

import { searchForGame, formatSearchTerm, slugToString } from "../util/rawg";
import { Helmet } from "react-helmet";

import { setSelectedGame, addBatchGames } from "../redux/slices/games";

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  selectGame: (game) => dispatch(setSelectedGame(game)),
  addGamesToKnownGames: (games) => dispatch(addBatchGames(games)),
});

function Search({ selectGame, addGamesToKnownGames }) {
  const history = useHistory();
  const { name } = useParams();

  const [searchTerm, setSearchTerm] = useState(slugToString(name) || "");
  const [searching, setSearching] = useState(name !== "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 350);
  const [allMatches, setAllMatches] = useState([]);

  useEffect(() => {
    if (name === undefined) {
      setAllMatches([]);
      setSearchTerm("");
    }
  }, [name]);

  useEffect(() => {
    const search = async (searchTerm = "") => {
      if (searchTerm === "") {
        setSearching(false);
        setAllMatches([]);
        return;
      }
      console.log(`Searching for: ${searchTerm}`);
      setSearching(true);

      try {
        let [, allMatches] = await searchForGame(
          searchTerm,
          "exclude_additions",
          true
        );
        setAllMatches(allMatches);
        addGamesToKnownGames(allMatches);

        history.push(`/search/${formatSearchTerm(searchTerm)}`);

        setSearching(false);
      } catch (e) {
        // This is probably from a cancelled request
        console.warn(e);
      }
    };

    search(debouncedSearchTerm);
  }, [addGamesToKnownGames, debouncedSearchTerm, history]);

  const cn = classnames("flex-1 mt-8 sm:flex items-center flex-col", {
    "sm:flex-initial": allMatches.length === 0,
  });

  return (
    <>
      <Helmet>
        <title>Game Search</title>
      </Helmet>
      <div className={cn}>
        <form
          className="flex-col w-full sm:w-1/2 md:w-1/3 text-center"
          autoComplete="off"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="game-title" className="font-asap italic text-2xl">
            What are you playing?
          </label>
          <input
            id="game-title"
            className="text-black rounded w-full mt-4 px-4 py-2"
            placeholder="Cyberpunk 2077"
            inputMode="search"
            name="game"
            value={searchTerm}
            onChange={(e) => {
              setSearching(true);
              setSearchTerm(e.target.value);
            }}
            autoFocus
          />
        </form>
        <div className="mt-6 h-6 flex justify-center">
          {searching && <SyncLoader color="white" size="8px" />}
        </div>
        <div className="block sm:flex sm:flex-row sm:w-full px-8 mt-8 flex-wrap m-auto items-center justify-center">
          {allMatches.map((match) => (
            <div key={match.id}>
              <Link
                to={`/games/${match.slug}`}
                onClick={() => {
                  selectGame(match);
                }}
                key={match.id}
                className="flex w-64 h-auto m-auto sm:mr-4 mb-4 relative bg-black bg-cover bg-center cursor-pointer hover:shadow-xl"
                style={{
                  backgroundImage: `url(${match.background_image})`,
                  minHeight: 192,
                }}
              >
                <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-black bg-opacity-50">
                  {match.name}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
