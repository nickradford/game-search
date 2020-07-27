export const topGameSlugs = `
animal-crossing-2019
call-of-duty-modern-warfare
cyberpunk-2077
destiny-2
dota-2
football-manager-2020
fortnite
forza-horizon-4
grand-theft-auto-v
league-of-legends
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

export const getRandomGameSlug = () => {
  return topGameSlugs[Math.floor(Math.random() * topGameSlugs.length)];
};
