export const games = [
  "https://media.rawg.io/media/games/64b/64bb90ca6b1df8a36d710f6542111142.jpg",
  "https://media.rawg.io/media/games/83f/83f6f70a7c1b86cd2637b029d8b42caa.jpg",
  "https://media.rawg.io/media/games/1bd/1bd2657b81eb0c99338120ad444b24ff.jpg",
  "https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg",
  "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
  "https://media.rawg.io/media/games/b34/b3419c2706f8f8dbe40d08e23642ad06.jpg",
  "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
  "https://media.rawg.io/media/games/21c/21cc15d233117c6809ec86870559e105.jpg",
  "https://media.rawg.io/media/games/58a/58ac7f6569259dcc0b60b921869b19fc.jpg",
  "https://media.rawg.io/media/games/447/4470c1e76f01acfaf5af9c207d1c1c92.jpg",
];

export const getRandomTop10Image = () => {
  return games[Math.floor(Math.random() * 9)];
};