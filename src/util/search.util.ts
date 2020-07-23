const GOOGLE_BASE = 'https://google.com/search?q=';
const DUCKDUCKGO_BASE = 'https://duckduckgo.com/?q=';

interface SearchEngines {
  Google: string;
  DuckDuckGo: string;
}

export type SearchEngineKeys = keyof SearchEngines;

export const SearchEngines: SearchEngines = {
  Google: GOOGLE_BASE,
  DuckDuckGo: DUCKDUCKGO_BASE,
};

const formatQueryForSearch = (query: string) => {
  return query.replace(/\s/gi, '+');
};

export const getSearchURL = (game: string, query: string, engine: SearchEngineKeys = 'Google') => {
  const formattedQuery = formatQueryForSearch(`${game} ${query}`);
  return `${SearchEngines[engine]}${formattedQuery}`;
};
