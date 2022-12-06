const text = await Deno.readTextFile("./input.txt");

function containsLetter(c: string, str: string): boolean {
  const index = str.indexOf(c);
  return index !== -1;
}

function isStartOfText(string: string): boolean {
  for (let i = 0; i < string.length - 1; i++) {
    if (containsLetter(string[i], string.substring(i + 1))) {
      return false;
    }
  }
  return true;
}

for (let i = 4; i < text.length; i++) {
  // 1st solution
  if (isStartOfText(text.substring(i - 4, i))) {
    console.log(i);
    break;
  }
  // 2nd solution
  if (i > 13 && isStartOfText(text.substring(i - 14, i))) {
    console.log(i);
  }
}
