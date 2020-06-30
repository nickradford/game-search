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

  console.log(data.results);
  return data.results;
};
