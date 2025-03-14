// Función para mostrar un mensaje cute
function mostrarMensajeCute() {
    alert("¡Eres tan cute! 💖");
}

// Función para cambiar el fondo a un color pastel
function cambiarFondo() {
    const colores = ["#fff0f5", "#f8e1f4", "#fadadd", "#ffd1dc"];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = colorAleatorio;
}

// Función para agregar corazones flotantes
function agregarCorazones() {
    const corazon = document.createElement("div");
    corazon.innerHTML = "💖";
    corazon.style.position = "fixed";
    corazon.style.left = Math.random() * 100 + "vw";
    corazon.style.animation = "flotar 5s linear";
    document.body.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 5000);
}

setInterval(agregarCorazones, 1000);