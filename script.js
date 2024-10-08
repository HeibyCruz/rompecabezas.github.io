// Variables globales
let piezas = [];
let rompecabezas = document.getElementById("rompecabezas");
let mensaje = document.getElementById("mensaje");
let reiniciarBtn = document.getElementById("reiniciar");
let posicionVacia = 8;  // La última posición es la vacía (índice 8)

// Crear piezas del rompecabezas
function crearRompecabezas() {
    let ordenPiezas = [...Array(8).keys()]; // Creamos las primeras 8 piezas
    ordenPiezas.push(null); // La última pieza será el espacio vacío
    ordenPiezas.sort(() => Math.random() - 0.5); // Desordenamos las piezas

    // Limpiar el rompecabezas anterior
    rompecabezas.innerHTML = "";

    // Crear y colocar las piezas en el tablero
    ordenPiezas.forEach((i, index) => {
        let pieza = document.createElement("div");

        if (i !== null) {
            pieza.classList.add("pieza");
            pieza.style.backgroundImage = "url('imagen.jpg')";
            pieza.style.backgroundPosition = `${(i % 3) * -100}px ${Math.floor(i / 3) * -100}px`;
            pieza.setAttribute("data-index", i);
            pieza.addEventListener("click", () => moverPieza(index));
        } else {
            pieza.classList.add("pieza-vacia");  // Crear el espacio vacío
        }

        piezas[index] = pieza;
        rompecabezas.appendChild(pieza);
    });

    // Actualizar posición vacía
    posicionVacia = ordenPiezas.indexOf(null);
}

// Mover una pieza a la posición vacía
function moverPieza(index) {
    // Intercambiar la pieza seleccionada con el espacio vacío
    [piezas[posicionVacia], piezas[index]] = [piezas[index], piezas[posicionVacia]];

    // Actualizar la nueva posición vacía
    posicionVacia = index;

    // Actualizar DOM: volver a renderizar las piezas
    actualizarTablero();

    // Comprobar si el rompecabezas está completo
    if (comprobarSiEstaCompleto()) {
        mostrarMensaje();
    }
}

// Actualizar la disposición de las piezas en el tablero
function actualizarTablero() {
    rompecabezas.innerHTML = "";
    piezas.forEach(pieza => rompecabezas.appendChild(pieza));
}

// Comprobar si el rompecabezas está completo
function comprobarSiEstaCompleto() {
    for (let i = 0; i < 8; i++) {
        if (piezas[i].getAttribute("data-index") != i) return false;
    }
    return true;
}

// Mostrar mensaje de felicitaciones al completar
function mostrarMensaje() {
    rompecabezas.classList.add("oculto");
    mensaje.classList.remove("oculto");
}

// Reiniciar el rompecabezas
reiniciarBtn.addEventListener("click", () => {
    mensaje.classList.add("oculto");
    rompecabezas.classList.remove("oculto");
    crearRompecabezas();
});

// Inicializar el juego
crearRompecabezas();
