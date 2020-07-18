const GOOGLE_BASE = "https://google.com/search?q=";
const DUCKDUCKGO_BASE = "https://duckduckgo.com/?q=";

export const SearchEngines = {
  Google: GOOGLE_BASE,
  DuckDuckGo: DUCKDUCKGO_BASE,
};

const formatQueryForSearch = (query) => {
  return query.replace(/\s/gi, "+");
};

export const getSearchURL = (game, query, engine = "Google") => {
  const formattedQuery = formatQueryForSearch(`${game} ${query}`);
  return `${SearchEngines[engine]}${formattedQuery}`;
};
