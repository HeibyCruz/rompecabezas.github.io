let piezas = [];
let rompecabezas = document.getElementById("rompecabezas");
let mensaje = document.getElementById("mensaje");
let reiniciarBtn = document.getElementById("reiniciar");
let posicionVacia = 8; // La última posición es la vacía (índice 8)
let piezaArrastrada = null; // La pieza que se está arrastrando

// Crear el rompecabezas
function crearRompecabezas() {
    let ordenPiezas = [...Array(8).keys()]; // Creamos las primeras 8 piezas
    ordenPiezas.push(null); // La última será el espacio vacío
    ordenPiezas.sort(() => Math.random() - 0.5); // Desordenar

    // Limpiar el rompecabezas anterior
    rompecabezas.innerHTML = "";

    // Crear y colocar las piezas
    ordenPiezas.forEach((i, index) => {
        let pieza = document.createElement("div");

        if (i !== null) {
            pieza.classList.add("pieza");
            pieza.style.backgroundImage = "url('imagen.jpg')";
            pieza.style.backgroundPosition = `${(i % 3) * -100}px ${Math.floor(i / 3) * -100}px`;
            pieza.setAttribute("draggable", true);
            pieza.setAttribute("data-index", i);
            pieza.addEventListener("dragstart", (e) => arrastrarPieza(e, index));
            pieza.addEventListener("dragend", soltarPieza);
        } else {
            pieza.classList.add("pieza-vacia");
        }

        piezas[index] = pieza;
        rompecabezas.appendChild(pieza);
    });

    posicionVacia = ordenPiezas.indexOf(null); // Actualizar posición vacía
}

// Función para comenzar a arrastrar una pieza
function arrastrarPieza(evento, index) {
    piezaArrastrada = index; // Guardar la pieza que se está arrastrando
}

// Función para soltar una pieza
function soltarPieza(evento) {
    evento.preventDefault(); // Prevenir comportamiento por defecto
    // Intercambiar la pieza arrastrada con el espacio vacío
    [piezas[posicionVacia], piezas[piezaArrastrada]] = [piezas[piezaArrastrada], piezas[posicionVacia]];

    // Actualizar posición vacía
    posicionVacia = piezaArrastrada;

    // Actualizar el tablero
    actualizarTablero();

    // Verificar si el rompecabezas está completo
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
