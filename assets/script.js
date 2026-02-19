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
        alert("Por favor ingresa un numero diferente a 0.");
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

const copyBtn = document.getElementById('copy-btn');

copyBtn.addEventListener('click', () => {
    const textToCopy = outputTextarea.value;

    // Solo copiamos si hay texto
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Guardamos el texto original del botón
            const originalText = copyBtn.innerText;

            // Cambiamos el mensaje visual (Requerimiento)
            copyBtn.innerText = "¡Copiado!";
            copyBtn.style.backgroundColor = "#d4edda"; // Un toque verde de éxito

            // Volver al estado original después de 2 segundos
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.backgroundColor = "#ffffff";
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    } else {
        alert("Primero genera algún texto para copiar.");
    }
});