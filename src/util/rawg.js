const HEADERS = {
  "User-Agent": "gamesearch.nickradford.dev",
};
const BASE_URL = "https://api.rawg.io/api";

export const formatSearchTerm = (term) => {
  return term.trim().replace(/\s/gi, "+");
};

export const slugToString = (slug = "") => {
  return slug.trim().replace(/\+/g, " ");
};

export const getGameBySlug = async (slug) => {
  const url = `${BASE_URL}/games/${slug}`;

  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  return data;
};

export const searchForGame = async (title, queryParams = "") => {
  const url = `${BASE_URL}/games?search=${title}${
    queryParams && `&${queryParams}`
  }`;

  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  const exact = findGameByTitle(title, data.results);
  return [exact, data.results];
};

export const findGameByTitle = (title, games) => {
  const lowerTitle = title.toLowerCase();

  const matches = games.filter((g) => g.name.toLowerCase() === lowerTitle);

  if (matches.length === 1) {
    return matches[0];
  } else {
    return null;
  }
};
