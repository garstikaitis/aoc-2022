import { getItemsPriority } from "./helpers";
const text = await Deno.readTextFile("./input.txt");
const rucksacks = text.split("\n");

function splitRucksackInHalf(rucksack: string): [string, string] {
  const half = Math.floor(rucksack.length / 2);
  return [rucksack.slice(0, half), rucksack.slice(half, rucksack.length)];
}

function findMatchingItemsInRucksacks(left: string, right: string): string[] {
  const matchingItems: string[] = [];
  left.split("").forEach(item => {
    if (right.includes(item) && !matchingItems.includes(item)) {
      matchingItems.push(item);
    }
  });
  return matchingItems;
}

let result = 0;

rucksacks.forEach(rucksack => {
  const [left, right] = splitRucksackInHalf(rucksack);
  const matchingItems = findMatchingItemsInRucksacks(left, right);
  const priority = getItemsPriority(matchingItems);
  result += priority;
});

console.log(result);
