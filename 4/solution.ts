const text = await Deno.readTextFile("./input.txt");
const pairs = text.split("\n");

function serializeString(string: string): [number, number] {
  const [from, to] = string.split("-");
  return [parseInt(from), parseInt(to)];
}

function getAssignments(
  firstElf: string,
  secondElf: string
): [number, number, number, number] {
  const [firstMin, firstMax] = serializeString(firstElf);
  const [secondMin, secondMax] = serializeString(secondElf);
  return [firstMin, firstMax, secondMin, secondMax];
}

let result1 = 0;
let result2 = 0;

pairs.forEach(pair => {
  const [firstElf, secondElf] = pair.split(",");
  const [firstMin, firstMax, secondMin, secondMax] = getAssignments(
    firstElf,
    secondElf
  );
  if (
    (firstMin <= secondMin && firstMax >= secondMax) || // satisfies 1-6,6-6
    (firstMin >= secondMin && firstMax <= secondMax) // 6-8,1-9
  ) {
    result1 += 1;
  }

  if (
    (firstMin < secondMin && firstMax < secondMin) ||
    (firstMin > secondMax && firstMax > secondMax)
  ) {
    result2 += 0;
  } else {
    result2 += 1;
  }
});

console.log(result2);
