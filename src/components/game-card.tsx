import * as React from "react";
import { Link } from "react-router-dom";

import { RAWGGame } from "../interfaces/game";
import ImageTransition from "./image-transition";

interface GameCardProps {
  game: RAWGGame;
  loadingColor?: string;
  onClick?:
    | ((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void)
    | undefined;
}

export const GameCard = ({ game, onClick, loadingColor }: GameCardProps) => {
  return (
    <Link
      to={`/games/${game.slug}`}
      onClick={onClick}
      key={game.id}
      className="flex w-64 h-auto sm:mr-4 mb-4 relative bg-gray-900 bg-cover bg-center cursor-pointer hover:shadow-xl last:mr-0"
      style={{
        minHeight: 192,
      }}
    >
      <ImageTransition
        loadingColor={loadingColor || "#1a202c"}
        src={game.background_image}
        style={{ height: "inherit", width: "inherit" }}
      />
      <span className="absolute bottom-0 left-0 right-0 py-1 px-2 bg-gray-900 bg-opacity-75 z-20">
        {game.name}
      </span>
    </Link>
  );
};
