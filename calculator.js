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
  displayNumber.textContent += char;
}

function addToOperation (operator) {
  if (!anotherButtonPressed) {
    currentOperator = operator;
    displayOperation.textContent = `${displayNumber.textContent} ${operator} `;
    operationContentChanged = true;
    num1 = +displayNumber.textContent;
  }
  else {
    num2 = +displayNumber.textContent;
    answer = operate(currentOperator, num1, num2);
    num1 = answer;
    num2 = null;
    displayNumber.textContent = answer;
    displayOperation.textContent = `${num1} ${operator} `;
    currentOperator = operator
    anotherButtonPressed = false;
  }
}

let num1;
let num2;
let currentOperator;
let anotherButtonPressed = false;
let operationContentChanged = false;
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