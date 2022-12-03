const text = await Deno.readTextFile("./input.txt");
const games = text.split(" ").join().split("\n");

type OutcomeOptions = "X" | "Y" | "Z";

type OpponentChoice = {
  A: number;
  B: number;
  C: number;
};

type OpponentChoiceOptions = "A" | "B" | "C";

// Outcomes
// X = Lose
// Y = Draw
// Z = Win

const opponentChoiceMap: OpponentChoice = {
  A: 1,
  B: 2,
  C: 3,
};

const outcomeChoiceMap = {
  X: {
    A: "C",
    B: "A",
    C: "B",
  },
  Y: {
    A: "A",
    B: "B",
    C: "C",
  },
  Z: {
    A: "B",
    B: "C",
    C: "A",
  },
};

// OPPONENT CHOICE
// A = rock
// B = paper
// C = scissors

function getMyChoiceBasedOnOpponentChoiceAndOutcome(
  choice: OpponentChoiceOptions,
  outcome: OutcomeOptions
): OpponentChoiceOptions {
  return outcomeChoiceMap[outcome][choice] as OpponentChoiceOptions;
}

function getMyChoiceScore(choice: OpponentChoiceOptions): number {
  return opponentChoiceMap[choice];
}

function getOutcomeScore(outcome: OutcomeOptions) {
  if (outcome === "X") return 0;
  if (outcome === "Y") return 3;
  return 6;
}

let result = 0;
games.forEach(game => {
  const opponentChoice: OpponentChoiceOptions = game.split(
    ","
  )[0] as OpponentChoiceOptions;
  const outcome = game.split(",")[1] as OutcomeOptions;
  const myChoice = getMyChoiceBasedOnOpponentChoiceAndOutcome(
    opponentChoice,
    outcome
  );
  const myChoiceScore = getMyChoiceScore(myChoice);
  const outcomeScore = getOutcomeScore(outcome);
  result += myChoiceScore + outcomeScore;
});
console.log(result);
export default result;
