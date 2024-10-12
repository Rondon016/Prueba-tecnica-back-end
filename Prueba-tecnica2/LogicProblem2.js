   // Función para distribuir los juguetes
   function distributeGifts(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const result = Array.from({ length: rows }, () => Array(cols).fill(0));

    function getNeighbors(r, c) {
        const neighbors = [];
        if (r > 0 && matrix[r - 1][c] !== null) neighbors.push(matrix[r - 1][c]); // Arriba
        if (r < rows - 1 && matrix[r + 1][c] !== null) neighbors.push(matrix[r + 1][c]); // Abajo
        if (c > 0 && matrix[r][c - 1] !== null) neighbors.push(matrix[r][c - 1]); // Izquierda
        if (c < cols - 1 && matrix[r][c + 1] !== null) neighbors.push(matrix[r][c + 1]); // Derecha
        return neighbors;
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const neighbors = getNeighbors(r, c);
            if (matrix[r][c] !== null) {
                neighbors.push(matrix[r][c]);
            }
            const sum = neighbors.reduce((a, b) => a + b, 0);
            const avg = sum / neighbors.length;
            result[r][c] = Math.round(avg);
        }
    }
    return result;
}

// Función para procesar la matriz ingresada
function processMatrix() {
    const matrix = [];
    for (let r = 0; r < 3; r++) {
        const row = [];
        for (let c = 0; c < 3; c++) {
            const value = document.getElementById(`cell-${r}-${c}`).value;
            // Si es 'null', agregamos null a la matriz
            row.push(value === 'null' || value === '' ? null : parseInt(value));
        }
        matrix.push(row);
    }

    const resultMatrix = distributeGifts(matrix);
    displayResult(resultMatrix);
}

// Función para mostrar el resultado en la página
function displayResult(matrix) {
    const resultDiv = document.getElementById('result');
    let outputHTML = '<h3>Matriz Resultante:</h3>';
    outputHTML += '<pre class="matrix-output">';
    matrix.forEach(row => {
        outputHTML += row.join(' ') + '\n';
    });
    outputHTML += '</pre>';
    resultDiv.innerHTML = outputHTML;
}