const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

// Iteramos sobre cada botón para añadirle el evento click
botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        // Limpiar pantalla
        if (boton.id === "c") {
            pantalla.textContent = "0";
            return;
        }

        // Borrar el último carácter de la pantalla
        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        // Evaluar la expresión al presionar "="
        if (boton.id === "igual") {
            try {
                // Reemplazar la raíz cuadrada y potencia en la expresión
                let expresion = pantalla.textContent
                    .replace(/√(\d+(\.\d+)?)/g, (match, number) => `Math.sqrt(${number})`) // Raíz cuadrada
                    .replace(/\^/g, '**') // Potencia
                
                    // Añadir el operador de multiplicación donde sea necesario
                    .replace(/(\d)(\()/g, '$1*(')  // Ejemplo: 2(3) => 2*(3)
                    .replace(/(\))(\d)/g, ')*$2')  // Ejemplo: (2)3 => (2)*3
                    .replace(/(\))(\()/g, ')*(');  // Ejemplo: (2)(3) => (2)*(3)
                
                // Evaluar la expresión matemática
                pantalla.textContent = eval(expresion);
            } catch {
                pantalla.textContent = "Error!"; // Mostrar error si la evaluación falla
            }
            return;
        }

        // Manejar el caso donde la pantalla solo muestra "0" o un error
        if (pantalla.textContent === "0" || pantalla.textContent === "Error!") {
            pantalla.textContent = botonApretado;
        } else {
            pantalla.textContent += botonApretado;
        }
    });
});
