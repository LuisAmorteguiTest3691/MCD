function mcdTablaExacta(numeros) {
    // Copia del array original
    const original = numeros.slice();
  
    // Arrays para guardar cada fila y el divisor aplicado (null en la última fila)
    const filas = [];
    const divisores = [];
  
    // Variables para el proceso
    let actual = numeros.slice();
    const factors = [];
    let divisor = 2;
  
    // Mientras se pueda dividir a todos los números por el divisor actual
    while (true) {
      if (actual.every(n => n % divisor === 0)) {
        // Guarda la fila actual y el divisor
        filas.push([...actual]);
        divisores.push(divisor);
  
        // Divide cada número entre el divisor
        actual = actual.map(n => n / divisor);
  
        // Agrega el divisor a la lista de factores
        factors.push(divisor);
      } else {
        divisor++;
      }
      if (divisor > Math.min(...actual)) {
        break;
      }
    }
  
    // Agrega la última fila (sin divisor)
    filas.push([...actual]);
    divisores.push(null);
  
    // Construir la tabla HTML
    let html = '<table>';
    for (let i = 0; i < filas.length; i++) {
      // Detectar si es la última fila para agregar la clase "last-row"
      const isLastRow = (i === filas.length - 1);
      html += isLastRow ? '<tr class="last-row">' : '<tr>';
  
      // Crear cada celda
      for (let j = 0; j < filas[i].length; j++) {
        html += `<td>${filas[i][j]}</td>`;
      }
  
      // Columna del divisor (si existe en esta fila)
      if (divisores[i] !== null) {
        html += `<td class="divisor">${divisores[i]}</td>`;
      }
  
      html += '</tr>';
    }
    html += '</table>';
  
    // Agregar la línea divisoria horizontal antes del resultado
    html += '<hr class="divider">';
  
    // Calculamos el M.C.D. multiplicando todos los factores comunes
    const mcd = factors.reduce((acc, val) => acc * val, 1);
    html += `<p class="result"><strong>M.C.D.: ${mcd}</strong></p>`;
  
    return html;
  }
  
  // Manejar el evento del botón "Calcular"
  document.getElementById('calculateBtn').addEventListener('click', function() {
    const input = document.getElementById('numbers').value;
    // Convertir la cadena a un array de números
    const numeros = input.split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(Number)
      .filter(n => !isNaN(n));
  
    if (numeros.length === 0) {
      alert("Por favor ingrese al menos un número válido.");
      return;
    }
  
    document.getElementById('result').innerHTML = mcdTablaExacta(numeros);
  });
  