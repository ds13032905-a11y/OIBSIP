const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");


display.value = "0";
let firstNumber = "";
let operator = "";


buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let value = button.innerText;

        if (value == "C") {

            display.value = "0";
            firstNumber = "";
            operator = "";

        }

        else if (value === "DEL") {
            if (display.value.length > 1) {
                display.value = display.value.slice(0, -1);
            }
            else {
                display.value = "0";
            }
        }


        else if (value === "%") {
            display.value = (Number(display.value) / 100).toString();
        }


        else if (!isNaN(value) || value === ".") {
            if (value === "." && display.value.includes(".")) {
                return;
            }

            if (display.value === "0" && value !== ".") {
                display.value = value;
            }
            else {
                display.value += value;
            }



        }
        else if (value === "+" || value === "-" || value === "*" || value === "/") {
            if (firstNumber !== "" && operator !== "") {
                let num1 = Number(firstNumber);
                let num2 = Number(display.value);
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

                        if (num2 === 0) {
                            display.value = "Error";
                            firstNumber = "";
                            operator = "";
                            return;
                        }

                        result = num1 / num2;
                        break;
                }

                display.value = result;
                firstNumber = result.toString();

            } else {

                firstNumber = display.value;

            }

            operator = value;
            display.value = "0";
        }
           


        else if (value === "=") {

            if (firstNumber === "" || operator === "") {
            return;
          }


        let num1 = Number(firstNumber);
        let num2 = Number(display.value);

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

                if (num2 === 0) {
                    display.value = "Error";
                    firstNumber="";
                    operator="";
                    return;
                }

                result = num1 / num2;
                break;
            }
           

           display.value = result;
           firstNumber = result.toString();
           operator = "";
    

    }

});

});
