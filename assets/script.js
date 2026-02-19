// Seleccionamos los elementos del DOM
const amountInput = document.getElementById('amount');
const generateBtn = document.getElementById('generate-btn');
const outputTextarea = document.getElementById('output');
// Para los radios, seleccionamos por el nombre 'type'
const typeRadios = document.getElementsByName('type');

const loremText = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
];

generateBtn.addEventListener('click', () => {
    const amount = parseInt(amountInput.value);
    let selectedType = "";

    // Validar cuál radio button está seleccionado
    typeRadios.forEach(radio => {
        if (radio.checked) {
            selectedType = radio.value;
        }
    });

    // --- VALIDACIONES ---
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a number greater than 0.");
        return;
    }

    if (!selectedType) {
        alert("Please select paragraphs or words.");
        return;
    }

    // --- GENERACIÓN DEL TEXTO ---
    let result = "";

    if (selectedType === "paragraphs") {
        // Generar párrafos (repetimos nuestra lista según la cantidad)
        for (let i = 0; i < amount; i++) {
            result += loremText[i % loremText.length] + "\n\n";
        }
    } else {
        // Generar palabras (un truco simple: juntar todo y cortar)
        let allWords = loremText.join(" ").split(" ");
        result = allWords.slice(0, amount).join(" ");
    }

    // Mostrar el resultado en el textarea
    outputTextarea.value = result;
});