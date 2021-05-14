let textField = document.querySelector(".textField");
let numbers = [];
let operators = [];

/**
 * Keyboard event
 */
document.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") {
        think();
    } else if (evt.key === "Backspace") {
        deleteLast();
    } else if (evt.key >= 0 && evt.key <= 9 || evt.key === "+" || evt.key === "-" || evt.key === "/" || evt.key === "*" || evt.key === ".") {
        writeListener(evt.key);
    }
});

/**
 * Бодох
 */
function think() {
    if (textField.value === "") {
        alert("Бодох талбар хоосон байна!");
        return;
    }
    numbers = textField.value.replaceAll("+", ",").replaceAll("-", ",").replaceAll("*", ",").replaceAll("/", ",").split(",");
    operators = textField.value.replace(/[0-9]|\./g, "").split("");

    let divide = operators.indexOf("/");
    while (divide !== -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("/");
    }

    let multiply = operators.indexOf("*");
    while (multiply !== -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("*");
    }

    let subtract = operators.indexOf("-");
    while (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    textField.value = numbers[0];
}

/**
 * Товч дарах үед input-д залгах
 * @param input Дарсан товчлуур
 */
function writeListener(input) {
    if (textField.value === "0") textField.value = "";
    if (checkDoubleSymbol(input)) {
        textField.value += input;
    } else {
        deleteLast();
        textField.value += input;
    }
}

/**
 * Сүүлийн үсгийг арилгах
 */
function deleteLast() {
    textField.value = textField.value.slice(0, -1);
    if (textField.value === "") textField.value = "0";
    numbers.pop();
}

/**
 * Бүх үсгийг арилгах
 */
function deleteAll() {
    textField.value = "0";
}

/**
 * 2 үйлдэл давхцсан эсэхийг шалгах
 * @return Давхцалгүй бол "true" эсрэг бол "false"
 */
function checkDoubleSymbol(input) {
    if (input === "/" || input === "*" || input === "-" || input === "+") {
        if (textField.value.charAt(textField.value.length - 1) === "/" || textField.value.charAt(textField.value.length - 1) === "*" || textField.value.charAt(textField.value.length - 1) === "-" || textField.value.charAt(textField.value.length - 1) === "+") {
            return false;
        }
    }
    return true;
}