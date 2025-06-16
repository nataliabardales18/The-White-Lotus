// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const resultMessage = document.getElementById('result-message');
const finalScoreDisplay = document.getElementById('final-score');

// Variables del juego
let score = 0;
let timeLeft = 30;
let gameInterval;
let bottleInterval;
let isPlaying = false;

// Emojis para los jugos
const JUICE_TYPES = {
    correct: '🧃', // Jugo de frutas
    incorrect: '🥤' // Refresco (incorrecto)
};

// Event Listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('play-again').addEventListener('click', () => {
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});

// Iniciar el juego
function startGame() {
    // Resetear variables
    score = 0;
    timeLeft = 30;
    isPlaying = true;
    
    // Limpiar intervalos existentes
    clearInterval(gameInterval);
    clearInterval(bottleInterval);
    
    // Actualizar displays
    updateScoreDisplay();
    updateTimeDisplay();
    
    // Cambiar pantalla
    welcomeScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // Limpiar área de juego
    gameArea.innerHTML = '';
    
    // Iniciar temporizador
    gameInterval = setInterval(updateTimer, 1000);
    
    // Iniciar generación de botellas
    bottleInterval = setInterval(createBottle, 1000);
}

// Crear botella
function createBottle() {
    if (!isPlaying) return;
    
    const bottle = document.createElement('div');
    bottle.className = 'bottle';
    
    // 70% de probabilidad de ser botella correcta
    const isCorrect = Math.random() < 0.7;
    bottle.textContent = isCorrect ? '🧃' : '🥤';
    bottle.dataset.correct = isCorrect;
    
    // Posición aleatoria
    const maxX = gameArea.clientWidth - 60;
    const maxY = gameArea.clientHeight - 60;
    bottle.style.left = Math.random() * maxX + 'px';
    bottle.style.top = Math.random() * maxY + 'px';
    
    // Evento de clic
    bottle.addEventListener('click', () => handleBottleClick(bottle));
    
    gameArea.appendChild(bottle);
    
    // Remover botella después de 1 segundo
    setTimeout(() => {
        if (bottle.parentNode === gameArea) {
            gameArea.removeChild(bottle);
        }
    }, 1000);
}

// Manejar clic en botella
function handleBottleClick(bottle) {
    if (!isPlaying) return;
    
    const isCorrect = bottle.dataset.correct === 'true';
    
    if (isCorrect) {
        score += 10;
        bottle.classList.add('correct');
    } else {
        score -= 5;
        bottle.classList.add('clicked');
    }
    
    updateScoreDisplay();
    
    // Remover botella después de la animación
    setTimeout(() => {
        if (bottle.parentNode === gameArea) {
            gameArea.removeChild(bottle);
        }
    }, 300);
}

// Actualizar temporizador
function updateTimer() {
    timeLeft--;
    updateTimeDisplay();
    
    if (timeLeft <= 0) {
        endGame();
    }
}

// Actualizar displays
function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

function updateTimeDisplay() {
    timeDisplay.textContent = timeLeft;
}

// Terminar juego
function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(bottleInterval);
    
    // Determinar mensaje final
    let message, messageClass;
    if (score >= 100) {
        message = '¡Ganaste un jugo gratis! 🎉\nToma una captura de pantalla y muéstrasela en caja para reclamar tu premio.';
        messageClass = 'win-message';
    } else {
        message = '¡Perdiste!';
        messageClass = 'lose-message';
    }
    
    resultMessage.textContent = message;
    resultMessage.className = messageClass;
    finalScoreDisplay.textContent = `Puntuación final: ${score}`;
    
    // Cambiar a pantalla de resultados
    gameScreen.classList.remove('active');
    resultScreen.classList.add('active');
}
