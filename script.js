let value1 = '';
let value2 = '';
let curr_input;
let operator = '';
let operator_value = '';
let round = '';

document.addEventListener('keydown',handleKeyPress);
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

function power(a, b){
    return (Math.pow(a,b));
}

function root(a,b){
    if(b <= 0)
        return ("ERROR");
    else
        return (Math.pow(b,1/a));
}

const numberButton = document.querySelectorAll(".number");
const controlButton = document.querySelectorAll(".control");
const operatorButton = document.querySelectorAll(".operator");
const equalButton = document.querySelectorAll(".equal");
const decimalButton = document.querySelectorAll(".decimal");
const signButton = document.querySelectorAll(".sign");
const delButton = document.querySelectorAll(".del");


function handleClick(button) {
    curr_input = button.className;

    if (curr_input.includes("number") || curr_input.includes("decimal")) {
        if (operator === '') {
            if (!(button.textContent === '.' && value1.includes('.'))) {
                value1 += button.textContent;
                display(value1);
            }
        } else {
            if (!(button.textContent === '.' && value2.includes('.'))) {
                value2 += button.textContent;
                display(value2);
            }
        }
    }else if (curr_input.includes("operator")) {
        if (value1 !== '') {
            operator = button.value;
            operator_value = button.textContent;
            display(value1);
        }
    } else if (curr_input.includes("equal")) {
        if (value1 !== '' && value2 !== '' && operator !== '') {
            operate();
        }
    } else if (curr_input.includes("control")) {
            clearAll();
    } else if (curr_input.includes("del")) {
            backspace();

    }else if (curr_input.includes("sign")) {
        if(value1 !== '' && operator === ''){
            value1 = parseFloat((value1) * -1).toString();
            display(value1);}
        else if(value2 !== ''){
            value2 = parseFloat((value2) * -1).toString();
            display(value2);}
    }   

}

function handleKeyPress(e){
    let key = e.key;
    let buttons = document.querySelectorAll("button");
    if(key === "Enter")
        handleClick(document.querySelector(".equal"));
    
    else if(key === "Backspace")
        handleClick(document.querySelector(".del"));
    else if(key === "*")
        handleClick(document.querySelector("#multiply"));

    else{
    buttons.forEach(button => {
        if(button.textContent === key)
            handleClick(button);
        
})
    }
}

[numberButton, controlButton, operatorButton, equalButton, decimalButton, signButton, delButton].forEach(buttons => {
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            handleClick(button);
        });
    });
});

function maxValue(){
    if ((value1).toString().length > 9)  {
        if(round === ''){
        input_display.textContent = "ERROR"
        output_display.textContent = "";
        }
        
    }

    else if(value2.length > 9) {
        input_display.textContent = "ERROR";
        output_display.textContent = "";
    }
}

function displayNumber(num) {
    input_display.textContent = num;
    maxValue();
}

function display(value) {
    if (operator) {
        output_display.textContent = `${value1} ${operator_value} ${value2}`;
    } else {
        output_display.textContent = value1;
    }
    displayNumber(value);
}

function clearAll() {
    value1 = '';
    value2 = '';
    operator = '';
    displayNumber('');
    output_display.textContent = '';
    round = '';
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
    let ans;

    switch (operator) {
        case '+':
            ans = sum(num1, num2);
            break;
        case '-':
            ans = difference(num1, num2);
            break;
        case 'X':
            ans = product(num1, num2);
            break;
        case '/':
            ans = divide(num1, num2);
            break;
        case '^':
            ans = power(num1, num2);
            break;
        case 'root':
            ans = root(num1, num2);
            break;

        default:
            ans = "ERROR";
    }
    ans = ans.toFixed(2);
    output_display.textContent = `${value1} ${operator_value} ${value2}`;
    value1 = ans.toString();
    value2 = '';
    operator = '';
    round = "new";

    if(ans.toString().length > 9){
        displayModifiedResult(ans);
    }
    else
        displayNumber(ans);
}

function displayModifiedResult(num){

        input_display.textContent = parseFloat(num).toExponential(2);
    }
