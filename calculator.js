operatorFunction = {
  "+" : add,
  "-" : subtract,
  "*" : multiply,
  "/" : divide,
};

function add (num1, num2) {
  return num1 + num2;
}

function subtract (num1, num2) {
  return num1 - num2;
}

function multiply (num1, num2) {
  return num1 * num2;
}

function divide (num1, num2) {
  return num1 / num2;
}

function operate (operator, num1, num2) {
  return operatorFunction[operator](num1, num2);
}

function resetDisplay () {
  num1 = null;
  num2 = 0;
  currentOperator = null;
  displayNumber.textContent = "0";
  displayOperation.textContent = "";
  operationContentChanged = false;
  anotherButtonPressed = false;
  evaluated = false;
}

function addToDisplay (char) {
  if (char == "." && displayNumber.textContent.includes(".")) {
    return;
  }

  if (operationContentChanged && !anotherButtonPressed) {
    displayNumber.textContent = "0";
    anotherButtonPressed = true;
  }
  if (evaluated) {
    currentNumber = displayNumber.textContent;
    resetDisplay();
    if (char === "clear") {
      displayNumber.textContent = currentNumber;
      num2 = currentNumber;
      return;
    }
  }
  if (char !== "clear") {
    if (displayNumber.textContent === "0" && char != ".") {
      displayNumber.textContent = char
    } else {
      displayNumber.textContent += char;
    }
    num2 = +displayNumber.textContent;
  } else if (displayNumber.textContent !== "0") {
    displayNumber.textContent = displayNumber.textContent.slice(0, -1);
    if (displayNumber.textContent === "") displayNumber.textContent = "0";
    num2 = +displayNumber.textContent;
  }
}

function addToOperation (operator) {
  if (!anotherButtonPressed || evaluated) {
    currentOperator = operator;
    num1 = +displayNumber.textContent;
    displayOperation.textContent = `${num1} ${operator} `;
    operationContentChanged = true;
  }
  else {
    num2 = +displayNumber.textContent;
    answer = operate(currentOperator, num1, num2);
    num1 = +answer;
    num2 = num1;
    displayNumber.textContent = answer;
    displayOperation.textContent = `${num1} ${operator} `;
    currentOperator = operator;
  }
  anotherButtonPressed = false;
  evaluated = false;
}

function evaluate () {
  if (num1 !== null) {
    answer = operate(currentOperator, num1, num2);
    displayOperation.textContent = `${num1} ${currentOperator} ${num2} = `;
    displayNumber.textContent = answer;
    num1 = answer;
    evaluated = true;
  }
}

function linkKey (button, isNum) {
  const char = button.textContent;
  document.addEventListener("keydown", e => {
    if (char === "C" || char === "AC") {
      if (char === "C" && e.key === "Backspace") {
        addToDisplay("clear");
        button.classList.add("active");
      } else if (char === "AC" && e.key === "Delete") {
        resetDisplay();
        button.classList.add("active");
      }
    } else {
      if (e.key === char) {
        isNum ? addToDisplay(char) : addToOperation(char);
        button.classList.add("active");
      }
    }
  });
  document.addEventListener("keyup", e => button.classList.remove("active"));
}

let num1 = null;
let num2 = 0;
let currentOperator = null;
let anotherButtonPressed = false;
let operationContentChanged = false;
let evaluated = false;
const displayNumber = document.querySelector(".number");
const displayOperation = document.querySelector(".operation");
const numberButtons = document.querySelectorAll(".number-button:not(#equals):not(#point)");
for (const button of numberButtons) {
  button.addEventListener("click", e => addToDisplay(button.textContent));
  linkKey(button, true);
}
const operatorButtons = document.querySelectorAll(".operator-button");
for (const button of operatorButtons) {
  button.addEventListener("click", e => addToOperation(button.textContent));
  linkKey(button, false);
}
const equals = document.querySelector("#equals");
equals.addEventListener("click", evaluate);
const clear = document.querySelector("#clear");
clear.addEventListener("click", e => addToDisplay("clear"));
linkKey(clear);
const allClear = document.querySelector("#all-clear");
allClear.addEventListener("click", resetDisplay);
linkKey(allClear);
const point = document.querySelector("#point");
point.addEventListener("click", e => addToDisplay("."))
