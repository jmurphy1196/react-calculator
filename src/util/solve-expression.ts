interface prioState {
  [key: string]: number;
}

export const solveExpression = (input: string): number => {
  const trimmedInput = input.trim().replaceAll(" ", "");
  const operatorRegex = /\+|\-|\*|\//g;
  let ans = 0;
  console.log(trimmedInput);

  const prio: prioState = {
    "+": 2,
    "-": 2,
    "*": 1,
    "/": 1,
  };

  function solve(expression: string[]) {
    if (expression.length == 0) {
      return "0";
    }
    if (expression.length === 1) {
      // we can return
      ans = +expression[0];
      return expression[0];
    }
    let partialExpression = null;
    let currentPrio: number | null = null;
    let operatorInd: number | null = null;
    for (let i = 0; i < expression.length; i++) {
      if (expression[i].match(operatorRegex)) {
        if (currentPrio === null) {
          currentPrio = prio[expression[i]];
        } else {
          if (prio[expression[i]] < currentPrio) {
            currentPrio = prio[expression[i]];
          }
        }
        operatorInd = i;
        switch (expression[i]) {
          case "+":
            partialExpression = +expression[i - 1] + +expression[i + 1];
            break;
          case "-":
            partialExpression = +expression[i - 1] - +expression[i + 1];
            break;
          case "*":
            partialExpression = +expression[i - 1] * +expression[i + 1];
            break;
          case "/":
            partialExpression = +expression[i - 1] / +expression[i + 1];
            break;
        }
      }
    }

    expression.splice(operatorInd! - 1, 3);
    expression.push(partialExpression!.toString());
    solve(expression);
  }

  const expression = input.split(" ").filter((el) => el !== "");

  solve(expression);

  return ans;
};
