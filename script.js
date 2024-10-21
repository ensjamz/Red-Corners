let selectedCorner = null;
let score = 0;
let spinsLeft = 10;
let bouncing = false;

const spinnerImage = document.getElementById("spinnerImage");
const spinCountDisplay = document.getElementById("spinCount");
const scoreDisplay = document.getElementById("scoreDisplay");
const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");
const continueButton = document.getElementById("continueButton");
const uploadPhoto = document.getElementById("uploadPhoto");
const startGameButton = document.getElementById("startGame");

let movementInterval = null;

// Handle corner button click
document.querySelectorAll('.corner-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (!bouncing && spinsLeft > 0) {
            selectedCorner = parseInt(e.target.dataset.corner);
            bounceSpinner();
        }
    });
});

// Simulate the image bouncing around the screen
function bounceSpinner() {
    if (bouncing) return;
    bouncing = true;
    let x = 0, y = 0, dx = 5, dy = 5;

    movementInterval = setInterval(() => {
        let screenWidth = window.innerWidth - 200;
        let screenHeight = window.innerHeight - 200;
        x += dx;
        y += dy;
        if (x <= 0 || x >= screenWidth) dx *= -1;
        if (y <= 0 || y >= screenHeight) dy *= -1;

        spinnerImage.style.transform = `translate(${x}px, ${y}px)`;

        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) {
            clearInterval(movementInterval);
            bouncing = false;
            resolveSpin(x, y, screenWidth, screenHeight);
        } else {
            dx *= 0.98;
            dy *= 0.98;
        }
    }, 20);
}

// Determine which corner the image lands in
function resolveSpin(x, y, screenWidth, screenHeight) {
    let landedCorner = getCorner(x, y, screenWidth, screenHeight);

    if (landedCorner === selectedCorner) {
        statusMessage.textContent = 'No Points';
    } else {
        score++;
        statusMessage.textContent = '1 Point!';
    }

    spinsLeft--;
    updateGameStatus();

    if (spinsLeft === 0) {
        displayFinalScore();
    } else {
        continueButton.style.display = "block";
    }
}

// Find out which corner the spinner image lands in based on coordinates
function getCorner(x, y, screenWidth, screenHeight) {
    if (x < screenWidth / 2 && y < screenHeight / 2) return 1; // Top Left
    if (x >= screenWidth / 2 && y < screenHeight / 2) return 2; // Top Right
    if (x < screenWidth / 2 && y >= screenHeight / 2) return 3; // Bottom Left
    return 4; // Bottom Right
}

// Update the game status
function updateGameStatus() {
    spinCountDisplay.textContent = `Spins left: ${spinsLeft}`;
    scoreDisplay.textContent = `Score: ${score}`;
}

// Display the final score
function displayFinalScore() {
    const percentScore = (score / 10) * 100;
    scoreDisplay.textContent = `FINAL SCORE: ${percentScore}%`;
    restartButton.style.display = "block";
}

// Continue the game (bring spinner back to the center)
continueButton.addEventListener('click', () => {
    spinnerImage.style.transform = `translate(0px, 0px)`;
    spinnerImage.style.animation = 'spin 3s linear infinite';
    continueButton.style.display = "none";
    statusMessage.textContent = '';
});

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
        bounceSpinner();
    }
});