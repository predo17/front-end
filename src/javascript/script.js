function appendToDisplay(value) {
    let display = document.getElementById("display");

    if (
        display.value === "0" ||
        display.value === "Valor inválido!" || 
        display.value === "Não é possível dividir por 0"
    ) {
        display.value = "";
    }

    display.value += value;
    formatDisplay();
}

function clearDisplay() {
    document.getElementById("display").value = "0";
}

function backspace() {
    let display = document.getElementById("display");

    if (display.value === "Valor inválido!" || display.value === "Não é possível dividir por 0") {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
        
        if (display.value === ""){
            display.value = "0"
        }else{
            formatDisplay();
        }
    }
}

function applyPercentage() {
    let display = document.getElementById("display");
    let value = display.value;

    // Substitui vírgulas por ponto e remove pontos de milhar
    value = value.replace(/\./g, '').replace(',', '.');

    // Encontra o último número na expressão
    let match = value.match(/(\d+(\.\d+)?)(?!.*\d)/);
    if (match) {
        let number = parseFloat(match[0]);
        let percentage = number / 100;

        // Substitui o último número pelo valor em porcentagem
        let newValue = value.slice(0, match.index) + percentage;
        display.value = parseFloat(percentage).toLocaleString('pt-BR');
    } else {
        display.value = "Valor inválido!";
    }
}

function calculate() {
    let display = document.getElementById("display");

    // Remove pontos para avaliar corretamente
    let rawExpression = display.value.replace(/\./g, '').replace(',', '.');
    

    try {
        if (/\/0+(?!\d)/.test(rawExpression)) {
            display.value = "Não é possível dividir por 0";
        } else {
            let result = eval(rawExpression);

            if (result === Infinity || result === -Infinity || isNaN(result)) {
                display.value = "Não é possível dividir por 0";
            } else {
                display.value = result.toLocaleString('pt-BR');
            }
        }
    } catch {
        display.value = "Valor inválido!";
    }

}

// Formatação em tempo real
function formatDisplay() {
    let display = document.getElementById("display");
    let raw = display.value;

    // Remove todos os pontos e formata cada número separado por operadores
    let formatted = raw.replace(/\./g, '') 
        .replace(/(\d+(,\d+)?)/g, (match) => {
            // Substitui vírgula temporariamente por ponto pra tratar decimais
            let number = match.replace(',', '.');
            let num = parseFloat(number);
            if (!isNaN(num)) {
                return num.toLocaleString('pt-BR');
            } else {
                return match;
            }
        });

    display.value = formatted;
}

//para usuários que reclamaram (“Isso aqui é calculadora, não planilha do Excel!” 😆)