import { shuffle } from './shuffle';

export const topGameSlugs = `
animal-crossing-2019
assassins-creed-valhalla
call-of-duty-modern-warfare
control
cyberpunk-2077
destiny-2
dota-2
football-manager-2020
fortnite
forza-horizon-4
grand-theft-auto-v
jedi-the-fallen-order
league-of-legends
metro-exodus
microsoft-flight-simulator-2019
minecraft
minecraft-dungeons
monster-hunter-world-2
playerunknowns-battlegrounds
red-dead-redemption-2
rust
starcraft-2
the-last-of-us-part-2
the-legend-of-zelda-breath-of-the-wild
valorant
world-of-warcraft
`
  .trim()
  .split('\n');

export const shuffledGameSlugs = shuffle(topGameSlugs);

export const getRandomGameSlug = () => {
  return shuffledGameSlugs[Math.floor(Math.random() * shuffledGameSlugs.length)];
};

export const getNextGameSlug = (currentSlug: string) => {
  const index = shuffledGameSlugs.indexOf(currentSlug);
  const nextIndex = index === shuffledGameSlugs.length - 1 ? 0 : index + 1;

  return shuffledGameSlugs[nextIndex];
};
