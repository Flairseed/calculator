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

function addToDisplay (char) {
  if (operationContentChanged && !anotherButtonPressed) {
    displayNumber.textContent = "";
    anotherButtonPressed = true;
  }
  if (evaluated) {
    num1 = null;
    displayOperation.textContent = "";
    operationContentChanged = false;
    anotherButtonPressed = false;
    evaluated = false;
  }
  displayNumber.textContent += char;
  num2 = +displayNumber.textContent;
}

function addToOperation (operator) {
  if (!anotherButtonPressed) {
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
    currentOperator = operator
    anotherButtonPressed = false;
  }
  evaluated = false;
}

function evaluate () {
  if (num1 !== null && num2 !== null) {
    answer = operate(currentOperator, num1, num2);
    displayOperation.textContent = `${num1} ${currentOperator} ${num2} = `;
    displayNumber.textContent = answer;
    num1 = answer;
    evaluated = true;
    anotherButtonPressed = false;
  }
}

let num1 = null;
let num2 = null;
let currentOperator;
let anotherButtonPressed = false;
let operationContentChanged = false;
let evaluated = false;
const displayNumber = document.querySelector(".number");
const displayOperation = document.querySelector(".operation");
const numberButtons = document.querySelectorAll(".number-button:not(.equals):not(.point)");
for (const button of numberButtons) {
  button.addEventListener("click", e => addToDisplay(button.textContent));
}
const operatorButtons = document.querySelectorAll(".operator-button");
for (const button of operatorButtons) {
  button.addEventListener("click", e => addToOperation(button.textContent));
}
const equals = document.querySelector(".equals");
equals.addEventListener("click", evaluate);