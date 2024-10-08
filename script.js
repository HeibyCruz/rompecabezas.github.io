// Variables
let piezas = [];
let rompecabezas = document.getElementById("rompecabezas");
let mensaje = document.getElementById("mensaje");
let reiniciarBtn = document.getElementById("reiniciar");
let posicionVacia = 8;  // La última posición es la vacía

// Crear piezas del rompecabezas
function crearRompecabezas() {
    let ordenPiezas = [...Array(8).keys()].sort(() => Math.random() - 0.5); // Solo creamos 8 piezas
    ordenPiezas.push(null); // La última pieza es el espacio vacío

    ordenPiezas.forEach((i, index) => {
        let pieza = document.createElement("div");

        if (i !== null) {
            pieza.classList.add("pieza");
            pieza.style.backgroundImage = "url('imagen.jpg')";
            pieza.style.backgroundPosition = `${(i % 3) * -100}px ${Math.floor(i / 3) * -100}px`;
            pieza.setAttribute("data-pos", i);
            pieza.addEventListener("click", () => moverPieza(index));
        } else {
            pieza.classList.add("pieza-vacia");  // Espacio vacío
        }

        piezas.push(pieza);
        rompecabezas.appendChild(pieza);
    });
}

// Lógica de movimiento de piezas
function moverPieza(index) {
    let filaVacia = Math.floor(posicionVacia / 3);
    let columnaVacia = posicionVacia % 3;
    let filaPieza = Math.floor(index / 3);
    let columnaPieza = index % 3;

    // Verificar si la pieza es adyacente a la vacía
    if (Math.abs(filaVacia - filaPieza) + Math.abs(columnaVacia - columnaPieza) === 1) {
        // Intercambiar la pieza seleccionada con la vacía
        [piezas[posicionVacia], piezas[index]] = [piezas[index], piezas[posicionVacia]];

        // Actualizar DOM
        rompecabezas.innerHTML = "";
        piezas.forEach(pieza => rompecabezas.appendChild(pieza));

        // Actualizar la nueva posición vacía
        posicionVacia = index;

        // Verificar si el rompecabezas está completo
        if (comprobarSiEstaCompleto()) {
            mostrarMensaje();
        }
    }
}

// Comprobar si el rompecabezas está completo
function comprobarSiEstaCompleto() {
    for (let i = 0; i < 8; i++) {
        if (piezas[i].getAttribute("data-pos") != i) return false;
    }
    return true;
}

// Mostrar mensaje de "Felicidades" al completar
function mostrarMensaje() {
    rompecabezas.classList.add("oculto");
    mensaje.classList.remove("oculto");
}

// Reiniciar el rompecabezas
reiniciarBtn.addEventListener("click", () => {
    mensaje.classList.add("oculto");
    rompecabezas.innerHTML = "";
    rompecabezas.classList.remove("oculto");
    piezas = [];
    posicionVacia = 8;
    crearRompecabezas();
});

// Inicializar
crearRompecabezas();
