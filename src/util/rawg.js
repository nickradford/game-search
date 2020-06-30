const HEADERS = {
  "User-Agent": "gamesearch.nickradford.dev",
};
const BASE_URL = "https://api.rawg.io/api";

const formatSearchTerm = (term) => {
  return term.trim().replace(/\s/gi, "+");
};

export const searchForGame = async (title) => {
  const url = `${BASE_URL}/games?search=${formatSearchTerm(title)}`;
  const res = await fetch(url, { headers: HEADERS });
  const data = await res.json();

  const exact = findGameByTitle(title, data.results);
  return [exact, data.results];
};

export const findGameByTitle = (title, games) => {
  const lowerTitle = title.toLowerCase();

  console.log(games);
  const matches = games.filter((g) => g.name.toLowerCase() == lowerTitle);

  if (matches.length === 1) {
    return matches[0];
  } else {
    return null;
  }
};
