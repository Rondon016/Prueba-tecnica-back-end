function organizeGifts(gifts) {
    let result = '';
    const regex = /(\d+)([a-z])/g; // Patrón para capturar el número de regalos y el tipo de regalo
    let match;

    while ((match = regex.exec(gifts)) !== null) {
        let quantity = parseInt(match[1], 10); // número de regalos
        let type = match[2]; // tipo de regalo (letra)
        
        // Calcular cuántas cajas, palets y regalos sueltos hay
        let pallets = Math.floor(quantity / 50); // Cada palet tiene 5 cajas (50 regalos)
        let boxes = Math.floor((quantity % 50) / 10); // Cada caja tiene 10 regalos
        let leftover = quantity % 10; // Regalos sueltos que no caben en cajas
        
        // Agregar los palets
        for (let i = 0; i < pallets; i++) {
            result += `[${type}]`;
        }
        
        // Agregar las cajas sueltas
        for (let i = 0; i < boxes; i++) {
            result += `{${type}}`;
        }
        
        // Agregar los regalos sueltos en una bolsa
        if (leftover > 0) {
            result += `(${type.repeat(leftover)})`;
        }
    }

    return result;
}

function showOrganizedGifts() {
    const gifts = document.getElementById('giftInput').value; // Obtener el valor del input
    const result1 = organizeGifts(gifts); // Organizar los regalos
    document.getElementById('result').innerText = result1; // Mostrar el resultado en el div
}