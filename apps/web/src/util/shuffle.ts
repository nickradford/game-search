/** An implementation of the Fisher-Yates shuffling algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 *
 * @param array an array of items to be shuffled
 */
export function shuffle(array: any[]) {
  let result: any[] = [];

  for (let index = array.length - 1; index >= 1; index--) {
    const lastElement = array.pop();
    const randomIndex = Math.floor(Math.random() * array.length);

    const [element] = array.splice(randomIndex, 1, lastElement);
    result = [element, ...result];

    if (array.length === 1) {
      result = [lastElement, ...result];
    }
  }

  return result;
}
