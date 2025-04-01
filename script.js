function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculate() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
    } catch {
        document.getElementById("display").value = "Valo inválido!";
    }

}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

    