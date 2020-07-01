import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { useDebounce } from "use-debounce";

import { searchForGame, formatSearchTerm, slugToString } from "../util/rawg";
import { Link, useHistory, useParams } from "react-router-dom";

export default function Search() {
  const history = useHistory();
  const { name } = useParams();

  const [searchTerm, setSearchTerm] = useState(slugToString(name) || "");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
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
        return;
      }
      console.log(`Searching for: ${searchTerm}`);
      let [exact, allMatches] = await searchForGame(searchTerm);
      setAllMatches(allMatches);

      history.push(`/search/${formatSearchTerm(searchTerm)}`);
    };

    search(debouncedSearchTerm);
  }, [debouncedSearchTerm, history]);

  const cn = classnames("flex-1 mt-8 flex items-center flex-col", {
    "sm:flex-initial": allMatches.length === 0,
  });

  return (
    <div className={cn}>
      <form className="flex flex-col sm:w-1/3 text-center" autoComplete="off">
        <label htmlFor="game-title" className="text-2xl">
          What are you playing?
        </label>
        <input
          id="game-title"
          className="text-black rounded w-full mt-4 px-4 py-2"
          placeholder="Cyberpunk 2077"
          name="game"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          autoFocus
        />
      </form>
      <div className="flex mt-8 flex-wrap justify-center">
        {allMatches.map((match) => (
          <Link
            to={`/games/${match.slug}`}
            key={match.id}
            className="w-full md:w-64 h-48 mr-4 mb-4 relative bg-black bg-cover bg-center cursor-pointer hover:shadow-xl"
            style={{ backgroundImage: `url(${match.background_image})` }}
          >
            <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-black bg-opacity-50">
              {match.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}