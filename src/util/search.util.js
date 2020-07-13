const GOOGLE_BASE = "https://google.com/search?q=";
const DUCKDUCKGO_BASE = "https://duckduckgo.com/?q=";

export const SearchEngines = {
  GOOGLE: GOOGLE_BASE,
  DUCKDUCKGO: DUCKDUCKGO_BASE,
};

const formatQueryForSearch = (query) => {
  return query.replace(/\s/gi, "+");
};

export const getSearchURL = (query, engine = SearchEngines.GOOGLE) => {
  const formattedQuery = formatQueryForSearch(query);
  return `${engine}${formattedQuery}`;
};
