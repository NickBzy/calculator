
function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1-num2;
}

function multiply(num1, num2){
    return num1*num2;
}

function divide(num1, num2){
    if (num2 === 0) return "Oops!!";
    return num1/num2;
}

let number1 = null;
let number2 = null;
let operator = null;
let shouldResetDisplay = false;
let operatorClicked = false;

function operate(operator, num1, num2){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    let result;
    if (operator === '+'){
        result = add(num1, num2)
    } else if (operator === '-'){
        result = subtract(num1, num2)
    } else if (operator === 'x'){
        result = multiply(num1, num2)
    } else if (operator === '÷'){
        result = divide(num1, num2)
    }

    let resultStr = result.toString();

    if (resultStr.includes("e")) {
        resultStr = result.toExponential(5);
    } else {
        if (resultStr.includes(".")) {
            resultStr = parseFloat(result.toFixed(6));
        }
    }

    if (resultStr.length > 11) {
        if (result >= 1e11 || result <= -1e11) {
            resultStr = result.toExponential(5);
        } else {
            resultStr = parseFloat(result.toPrecision(11)).toString();
        }
    }

    return resultStr;
}

const formulaDisplay = document.querySelector(".formula-display");
const displayValue = document.querySelector(".display-value");

const allNumbers = document.querySelectorAll(".number");
allNumbers.forEach(button => {
    button.addEventListener("click", function(){
        const currentValue = displayValue.innerText;
        const newValue = button.textContent;

        if (shouldResetDisplay) {
            displayValue.innerText = newValue;
            shouldResetDisplay = false;

            if (operator === null) {
                number1 = null;
            }
        }
        else if (newValue === '.' && currentValue.includes('.')) {
            return;
        }
        else if (currentValue === '0' && newValue !== '.') {
            displayValue.innerText = newValue;
        }
        else if (currentValue.length < 11) {
            displayValue.innerText += newValue;
        }

        operatorClicked = false;
    });
});

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function(){
    displayValue.innerText = 0;
    formulaDisplay.innerText = "";
    number1 = null;
    number2 = null;
    operator = null;
    shouldResetDisplay = false;
    operatorClicked = false;
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", function(){
    displayValue.textContent = displayValue.textContent.slice(0, -1);
});


const operatorButtons = document.querySelectorAll(".operator")
operatorButtons.forEach(button => {
    button.addEventListener("click", function(){
        if (operatorClicked){
            operator = button.textContent;
            formulaDisplay.innerText = number1 + " " + operator;
            return;
        }
        if (number1 === null){
            number1 = displayValue.innerText;
            operator = button.textContent;
            formulaDisplay.innerText = number1 + " " + operator;
        } else if (operator){
            number2 = displayValue.innerText;
            formulaDisplay.innerText = number1 + " " + operator + " " + number2;
            number1 = operate(operator, number1, number2); // Compute previous operation
            displayValue.innerText = number1;
            number2 = null;
            operator = null;
            operatorClicked = false;
        }
        operator = button.textContent;
        shouldResetDisplay = true;
        operatorClicked = true;
    });
});

const equalButton = document.querySelector(".equals");
equalButton.addEventListener("click", function(){
    if (number1 !== null && operator !== null && !operatorClicked){
        number2 = displayValue.innerText;
    formulaDisplay.innerText = number1 + " " + operator + number2 + " =";
    number1 = operate(operator, number1, number2);
    number2 = null;
    operator = null;
    displayValue.innerText = number1;
    shouldResetDisplay = true;
    number1 = null;
    }
});