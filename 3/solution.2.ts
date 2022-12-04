import { alphabet } from "./helpers.ts";
const text = await Deno.readTextFile("./input.txt");
const elfs = text.split("\n");

const groupSize = 3;
const groups = [];
for (let i = 0; i < elfs.length; i += groupSize) {
  const group = elfs.slice(i, i + groupSize);
  groups.push(group);
}

function getCommonItemInGroup(group) {
  let commonItem = null;
  let allItems = [];
  group.forEach(rucksack => {
    rucksack.split("").forEach(item => {
      allItems.push(item);
    });
  });
  allItems.forEach(item => {
    if (
      group[0].split("").includes(item) &&
      group[1].split("").includes(item) &&
      group[2].split("").includes(item)
    ) {
      commonItem = item;
    }
  });
  return commonItem;
}

function getScoreInAlphabet(item) {
  return alphabet.findIndex(letter => item === letter);
}

let result = 0;

groups.forEach(group => {
  const commonItem = getCommonItemInGroup(group);
  const score = getScoreInAlphabet(commonItem);
  result += score;
});

export default result;
