import { RAWGGame } from "../interfaces/game";

const HEADERS = {
  "User-Agent": "gamesearch.nickradford.dev",
};
const BASE_URL = "https://api.rawg.io/api";

const inFlightSearches : AbortController[] = [];

export const formatSearchTerm = (term: string) => {
  return term.trim().replace(/\s/gi, "+");
};

export const slugToString = (slug = "") => {
  return slug.trim().replace(/\+/g, " ");
};

export const getGameBySlug = async (slug: string) => {
  const url = `${BASE_URL}/games/${slug}`;

  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  return data;
};

export const searchForGame = async (
  title : string,
  queryParams = "",
  cancelPreviousSearches = false
) => {
  const url = `${BASE_URL}/games?search=${title}${
    queryParams && `&${queryParams}`
  }`;

  if (cancelPreviousSearches) {
    inFlightSearches.forEach((controller) => controller.abort());
  }

  const controller = new AbortController();
  const { signal } = controller;

  inFlightSearches.push(controller);

  const res = await fetch(url, { headers: HEADERS, signal });
  const data = await res.json();

  const exact = findGameByTitle(title, data.results);
  return [exact, data.results];
};

export const findGameByTitle = (title: string, games: RAWGGame[]) => {
  const lowerTitle = title.toLowerCase();

  const matches = games.filter((g) => g.name.toLowerCase() === lowerTitle);

  if (matches.length === 1) {
    return matches[0];
  } else {
    return null;
  }
};
