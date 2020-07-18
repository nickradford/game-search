import * as React from "react";
import { Link } from "react-router-dom";

import { GamePad } from "./gamepad";
import { RAWGGame } from "../interfaces/game";

import { Dropdown } from "./dropdown";
import ImageTransition from "./image-transition";

interface HeaderProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  favorites?: RAWGGame[];
}

export const Header = ({ onClick, favorites = [] }: HeaderProps) => {
  return (
    <header className="text-white font-asap ">
      <div className="container mx-auto flex flex-wrap py-5 flex-col md:flex-row items-center">
        <Link
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          to="/"
          onClick={onClick}
        >
          <GamePad />
          <span className="ml-3 text-xl font-bold italic">Game Search</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-300">
          {/* <a className="mr-5 hover:text-white">First Link</a> */}
          {favorites!.length ? (
            <Dropdown className="mr-5">
              <Dropdown.Label>Favorites</Dropdown.Label>
              <Dropdown.Menu>
                {favorites.map((game) => (
                  <Dropdown.MenuItem>
                    <Link
                      to={`/games/${game.slug}`}
                      className="flex items-center"
                    >
                      <ImageTransition
                        src={game.background_image}
                        className="box-border flex-shrink-0"
                        style={{ width: "80px", height: "45px" }}
                      />
                      <span className="md:whitespace-no-wrap ml-4">
                        {game.name}
                      </span>
                    </Link>
                  </Dropdown.MenuItem>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          ) : null}
          <Link className="mr-5 hover:text-white" to="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-white" to="/settings">
            Settings
          </Link>
        </nav>
        {/* <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">Button
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button> */}
      </div>
    </header>
  );
};
