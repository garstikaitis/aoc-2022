const text = await Deno.readTextFile("./input.txt");
const elfs = text.split(/\r?\n/);
const elfDict = {};
let currentIndex = 0;
for (let i = 0; i < elfs.length; i++) {
  const cal = elfs[i];
  if (cal === "") {
    currentIndex++;
    continue;
  }
  if (elfDict[currentIndex] || elfDict[currentIndex] === 0) {
    const currentCalAmount = elfDict[currentIndex];
    elfDict[currentIndex] = currentCalAmount + parseInt(cal);
  } else {
    elfDict[currentIndex] = parseInt(cal);
  }
}

const sorted = Object.values(elfDict)
  .sort((a, b) => {
    return a - b;
  })
  .reverse()
  .splice(0, 3);
const result = sorted.reduce((acc, curr) => {
  return acc + curr;
}, 0);

export result;
