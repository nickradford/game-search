import games from '../data/top10.json';

export const getRandomTop10Image = () => {
  return games[Math.floor(Math.random() * 9)];
};
