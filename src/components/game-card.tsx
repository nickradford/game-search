import * as React from "react";
import { Link } from "react-router-dom";

import { RAWGGame } from "../interfaces/game";

interface GameCardProps {
  game: RAWGGame;
  onClick?:
    | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
    | undefined;
}

export const GameCard = ({ game, onClick }: GameCardProps) => {
  return (
    <div key={game.id}>
      <Link
        to={`/games/${game.slug}`}
        onClick={onClick}
        key={game.id}
        className="flex w-64 h-auto m-auto sm:mr-4 mb-4 relative bg-black bg-cover bg-center cursor-pointer hover:shadow-xl"
        style={{
          backgroundImage: `url(${game.background_image})`,
          minHeight: 192,
        }}
      >
        <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-black bg-opacity-50">
          {game.name}
        </span>
      </Link>
    </div>
  );
};
