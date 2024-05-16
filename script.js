let total = 0;
let value1 = '';
let value2 = '';
let curr_input;
let operator = '';

const input_display = document.querySelector(".display-user-input");
const output_display = document.querySelector(".display-user-output");

function sum(a, b) {
    return a + b;
}

function difference(a, b) {
    return a - b;
}

function product(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0)
        return "ERROR";
    else
        return a / b;
}

const numberButton = document.querySelectorAll(".number");
const controlButton = document.querySelectorAll(".control");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelectorAll(".equal");
const decimalButton = document.querySelectorAll(".decimal");

function handleClick(button) {
    curr_input = button.className;

    if (curr_input.includes("number") || curr_input.includes("decimal")) {
        if (operator === '') {
            value1 += button.textContent;
            display(value1);
        } else {
            value2 += button.textContent;
            display(value2);
        }
    } else if (curr_input.includes("operator")) {
        if (value1 !== '') {
            operator = button.textContent;
            display(value1);
        }
    } else if (curr_input.includes("equal")) {
        if (value1 !== '' && value2 !== '' && operator !== '') {
            operate();
        }
    } else if (curr_input.includes("control")) {
        if (button.id === "AC") {
            clearAll();
        } else if (button.id === "del") {
            backspace();
        }
    }
}

[numberButton, controlButton, operatorButton, equalButton, decimalButton].forEach(buttons => {
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            handleClick(button);
        });
    });
});

function displayNumber(num) {
    input_display.textContent = num;
}

function display(value) {
    if (operator) {
        output_display.textContent = `${value1} ${operator} ${value2}`;
    } else {
        output_display.textContent = value1;
    }
    displayNumber(value);
}

function clearAll() {
    value1 = '';
    value2 = '';
    operator = '';
    total = 0;
    displayNumber('');
    output_display.textContent = '';
}

function backspace() {
    if (value2 !== '') {
        value2 = value2.slice(0, -1);
        display(value2);
    } else if (operator !== '') {
        operator = '';
        display(value1);
    } else {
        value1 = value1.slice(0, -1);
        display(value1);
    }
}

function operate() {
    let num1 = parseFloat(value1);
    let num2 = parseFloat(value2);
    let result;

    switch (operator) {
        case '+':
            result = sum(num1, num2);
            break;
        case '-':
            result = difference(num1, num2);
            break;
        case 'X':
            result = product(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            result = "ERROR";
    }

    total = result;
    output_display.textContent = `${value1} ${operator} ${value2} = ${result}`;
    value1 = result.toString();
    value2 = '';
    operator = '';
    displayNumber(result);
}
