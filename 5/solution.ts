const text = await Deno.readTextFile("./instructions.txt");
const instructions = text.split("\n");
import { stack } from "./stack.ts";

type MovablePositions = keyof typeof stack;

function getStuffThatMattersFromInstructions(
  instruction: string
): [number, MovablePositions, MovablePositions] {
  const [_emptyAmountString, amountString] = instruction.split("move ");
  const realAmountArray = amountString.split(" ");
  const realAmount = realAmountArray[0] as unknown as number;
  const [_emptyFromString, fromString] = amountString.split("from ");
  const from = parseInt(fromString.charAt(0)) as MovablePositions;
  const [_emptyToString, toString] = fromString.split("to ");
  const to = parseInt(toString.charAt(0)) as MovablePositions;
  return [realAmount, from, to];
}

function getItemsToMove(amount: number, from: MovablePositions): string[] {
  return stack[from].slice(0, amount);
}

function addItemsToStack(items: string[], to: MovablePositions): void {
  items.forEach(item => {
    stack[to].unshift(item);
  });
}

function removeItemsFromStack(items: string[], from: MovablePositions): void {
  stack[from].splice(0, items.length);
}

instructions.forEach(instruction => {
  const [amount, from, to] = getStuffThatMattersFromInstructions(instruction);
  const itemsThatNeedToBeMoved = getItemsToMove(amount, from);
  addItemsToStack(itemsThatNeedToBeMoved, to);
  removeItemsFromStack(itemsThatNeedToBeMoved, from);
});

let result = "";
(Object.keys(stack) as unknown as MovablePositions[]).forEach(column => {
  result += stack[column][0];
});

console.log(result);
