const text = await Deno.readTextFile("./input.txt");
const games = text.split(" ").join().split("\n");

type MyChoiceOptions = "X" | "Y" | "Z";

type MyChoice = {
  X: number;
  Y: number;
  Z: number;
};

type OpponentChoiceOptions = "A" | "B" | "C";

// MY CHOICE
// X = rock - 1
// Y = paper - 2
// Z = scissors - 3
const myChoiceMap: MyChoice = {
  X: 1,
  Y: 2,
  Z: 3,
};

const myChoiceToOpponentChoice = {
  X: "A",
  Y: "B",
  Z: "C",
};

// OPPONENT CHOICE
// A = rock
// B = paper
// C = scissors

function getMyScore(choice: MyChoiceOptions): number {
  return myChoiceMap[choice];
}

function checkIfMyChoiceWon(
  opponentChoice: OpponentChoiceOptions,
  myChoice: MyChoiceOptions
): boolean {
  const converted = convertMyChoiceToOpponentChoice(myChoice);
  if (converted === "A" && opponentChoice === "C") return true;
  if (converted === "B" && opponentChoice === "A") return true;
  if (converted === "C" && opponentChoice === "B") return true;
  return false;
}

function checkIfMyChoiceDraw(
  opponentChoice: OpponentChoiceOptions,
  myChoice: MyChoiceOptions
): boolean {
  const converted = convertMyChoiceToOpponentChoice(myChoice);
  return converted === opponentChoice;
}

function getWinningScore(
  opponentChoice: OpponentChoiceOptions,
  myChoice: MyChoiceOptions
): number {
  const isWinningCondition = checkIfMyChoiceWon(opponentChoice, myChoice);
  if (isWinningCondition) return 6;
  const isDrawCondition = checkIfMyChoiceDraw(opponentChoice, myChoice);
  if (isDrawCondition) return 3;
  return 0;
}

function convertMyChoiceToOpponentChoice(
  myChoice: MyChoiceOptions
): OpponentChoiceOptions {
  return myChoiceToOpponentChoice[myChoice] as OpponentChoiceOptions;
}

let result = 0;
games.forEach(game => {
  const opponentChoice: OpponentChoiceOptions = game.split(
    ","
  )[0] as OpponentChoiceOptions;
  const myChoice: MyChoiceOptions = game.split(",")[1] as MyChoiceOptions;
  const myScore = getMyScore(myChoice);
  const winningScore = getWinningScore(opponentChoice, myChoice);
  result += myScore + winningScore;
});
console.log(result);
export default result;
