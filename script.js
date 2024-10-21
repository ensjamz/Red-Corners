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
    let x = 0, y = 0, dx = (Math.random() * 10) + 3, dy = (Math.random() * 10) + 3;

    movementInterval = setInterval(() => {
        let screenWidth = window.innerWidth - 200;
        let screenHeight = window.innerHeight - 200;
        x += dx;
        y += dy;
        if (x <= 0 || x >= screenWidth) dx *= -1;
        if (y <= 0 || y >= screenHeight) dy *= -1;

        spinnerImage.style.transform = `translate(${x}px, ${y}px)`;

        // Slow down and stop the movement when it's time to land in a corner
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
            clearInterval(movementInterval);
            bouncing = false;
            resolveSpin(x, y, screenWidth, screenHeight);
        } else {
            dx *= 0.98;  // Reduce the speed to eventually stop
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