import { Color } from "../../types/color";
import type { Nut } from "../../types/nut";

// Helper function: Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Our level initializer:
function initializeStacks() {
  // Create 11 stacks (we'll only fill 9)
  const stacks = Array.from({ length: 11 }, () => [] as Nut[]);
  // We'll fill stacks[0] to stacks[8]

  // Step 1. Choose 9 distinct colors from the available colors.
  // (Assuming Color enum has at least 9 numeric values.)
  const availableColors: Color[] = Object.values(Color).filter(
    (v) => typeof v === "number"
  ) as Color[];

  if (availableColors.length < 9) {
    throw new Error("Not enough colors to fill 9 stacks!");
  }
  const shuffledColors = shuffleArray(availableColors);
  const selectedColors = shuffledColors.slice(0, 9);

  // We'll use this counter to assign a unique id to each nut.
  let nutId = 0;

  // Step 2. Create a pool of nuts: 4 of each of the 9 selected colors.
  let nutsPool: Nut[] = [];
  selectedColors.forEach((color) => {
    for (let i = 0; i < 4; i++) {
      nutsPool.push({
        color,
        id: nutId++
      });
    }
  });

  // Step 3. Reserve one nut per color for the top of each stack.
  // We remove one nut (of the matching color) from the pool for each of the 9 stacks.
  for (let i = 0; i < 9; i++) {
    const color = selectedColors[i];
    const nutIndex = nutsPool.findIndex((nut) => nut.color === color);
    if (nutIndex === -1) {
      throw new Error("Nut not found in pool, something went wrong!");
    }
    // Remove the nut and assign it as the top nut for stack i.
    const [topNut] = nutsPool.splice(nutIndex, 1);
    // We will add the bottom nuts first, so temporarily store the top nut.
    stacks[i].push(topNut);
  }

  // At this point, each of the 9 stacks has 1 nut (its reserved top),
  // and nutsPool contains the other 27 nuts (3 per color).

  // Step 4. Shuffle the remaining nuts.
  nutsPool = shuffleArray(nutsPool);

  // Now distribute 3 nuts to each of the 9 stacks as the bottom nuts.
  // **Important:** Since the "top" is the last element of the array,
  // we add the bottom nuts first then re-add the preassigned nut so that it remains on top.
  for (let i = 0; i < 9; i++) {
    // Remove the previously added top nut.
    const topNut = stacks[i].pop();
    // Add 3 nuts from the pool.
    for (let j = 0; j < 3; j++) {
      const nut = nutsPool.pop();
      if (!nut) {
        throw new Error("Not enough nuts in the pool!");
      }
      stacks[i].push(nut);
    }
    // Finally, put back the reserved top nut so it stays at the top.
    stacks[i].push(topNut!);
  }

  // Now stacks[0] to stacks[8] each have 4 nuts, and the top nut in each is unique.
  // stacks[9] and stacks[10] remain empty (if needed for extra moves).

  return stacks;
}

export { initializeStacks };
