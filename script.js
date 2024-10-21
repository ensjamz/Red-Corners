let selectedCorner = null;
let score = 0;
let spinsLeft = 10;

// Spinner rotation angle
let currentAngle = 0;

const spinnerImage = document.getElementById("spinnerImage");
const spinCountDisplay = document.getElementById("spinCount");
const scoreDisplay = document.getElementById("scoreDisplay");
const restartButton = document.getElementById("restartButton");
const uploadPhoto = document.getElementById("uploadPhoto");
const startGameButton = document.getElementById("startGame");

// Corner buttons event listener
document.querySelectorAll('.corner-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        selectedCorner = parseInt(e.target.dataset.corner);
        spinSpinner();
    });
});

// Spin spinner logic
function spinSpinner() {
    if (spinsLeft > 0 && selectedCorner !== null) {
        const randomAngle = Math.floor(Math.random() * 360);
        currentAngle = (currentAngle + randomAngle) % 360;
        spinnerImage.style.transform = `rotate(${currentAngle}deg)`;
        const pointedCorner = getPointedCorner(currentAngle);

        if (selectedCorner !== pointedCorner) {
            score++;
        }

        spinsLeft--;
        updateGameStatus();

        if (spinsLeft === 0) {
            displayFinalScore();
        }
    }
}

// Determine which corner is pointed at based on angle
function getPointedCorner(angle) {
    if (angle >= 0 && angle < 90) return 1; // Top Left
    if (angle >= 90 && angle < 180) return 2; // Top Right
    if (angle >= 180 && angle < 270) return 3; // Bottom Left
    return 4; // Bottom Right
}

// Update the game status
function updateGameStatus() {
    spinCountDisplay.textContent = `Spins left: ${spinsLeft}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Display the final score and show the restart button
function displayFinalScore() {
    const percentScore = (score / 10) * 100;
    scoreDisplay.textContent = `FINAL SCORE: ${percentScore}%`;
    restartButton.style.display = "block";
}

// Restart the game
restartButton.addEventListener('click', () => {
    score = 0;
    spinsLeft = 10;
    selectedCorner = null;
    restartButton.style.display = "none";
    updateGameStatus();
});

// Handle photo upload
uploadPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        spinnerImage.src = event.target.result;
        spinnerImage.style.display = 'block';
    };

    reader.readAsDataURL(file);
});

// Start game event listener
startGameButton.addEventListener('click', () => {
    if (spinnerImage.src) {
        spinSpinner();
    }
});