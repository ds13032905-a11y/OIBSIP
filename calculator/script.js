const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


display.value = "0";
let firstNumber = "";
let secondNumber = "";
let operator = "";

let waitingForSecondnumber = false;

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let value = button.innerText;

        if (value == "C") {

            display.value = "0";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            waitingForSecondnumber = false;
        }

        else if (value == "DEL") {
            display.value = display.value.slice(0, -1);
        }
        else if (value == "%") {
            display.value = Number(display.value) / 100;
        }

        else if (!isNaN(value) || value == ".") {
            if (value == "." && display.value.includes(".")) {
                return;
            }

            if (display.value == "0" && value != ".") {
                display.value = value;
            }
            else {
                display.value += value;
            }



        }
        else if (value == "+" || value == "-" || value == "*" || value == "/") {

            firstNumber = display.value;
            operator = value;
            waitingForSecondNumber = false;
            display.value = "";
        }

        else if (value == "=") {
            secondNumber = display.value;

            if (firstNumber == "" || secondNumber == "" || operator == "") {
                display.value = "Invalid";
                return;
            }


            let num1 = Number(firstNumber);
            let num2 = Number(secondNumber);

            let result;

            switch (operator) {
                case "+":
                    result = num1 + num2;
                    break;

                case "-":
                    result = num1 - num2;
                    break;


                case "*":
                    result = num1 * num2;
                    break;

                case "/":

                    if (num2 == 0) {
                        display.value = "Error";
                        return;
                    }

                    result = num1 / num2;
                    break;

                default:
                    result = "Invalid";

            }

            display.value = result;

            firstNumber = "";
            secondNumber = "";
            operator = "";
            waitingForSecondNumber = false;

        }




    });
});
