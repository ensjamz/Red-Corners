let selectedCorner = null;
let score = 0;
let rounds = 10;
let spinnerX, spinnerY;
let dx, dy;
let isMoving = false;
let img;
let gamePaused = true;

function setup() {
    createCanvas(400, 400);
    resetSpinner();
    // Disable loop initially; only spin when the game is running
    noLoop();

    // Handle image upload
    const uploadPhoto = document.getElementById("uploadPhoto");
    uploadPhoto.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            img = loadImage(event.target.result);
            resetSpinner();
        };
        reader.readAsDataURL(file);
    });

    // Continue button click event
    document.getElementById('continueButton').addEventListener('click', () => {
        if (!isMoving && rounds > 0) {
            resetSpinner();
            document.getElementById('continueButton').style.display = 'none';
            gamePaused = false;
            loop();
        }
    });
}

function draw() {
    background(0);

    if (img) {
        image(img, spinnerX - 25, spinnerY - 25, 50, 50);  // Draw the uploaded image as the spinner
    } else {
        fill(255, 0, 0);
        ellipse(spinnerX, spinnerY, 50, 50);  // Placeholder circle if no image is uploaded
    }

    // Move spinner if the game isn't paused
    if (!gamePaused) {
        spinnerX += dx;
        spinnerY += dy;

        // Bounce off edges
        if (spinnerX < 25 || spinnerX > width - 25) dx *= -1;
        if (spinnerY < 25 || spinnerY > height - 25) dy *= -1;

        // Stop after moving for some time
        if (frameCount % 60 == 0) {
            stopSpinner();
        }
    }
}

// Set up spinner's random movement
function resetSpinner() {
    spinnerX = width / 2;
    spinnerY = height / 2;
    dx = random(-5, 5);
    dy = random(-5, 5);
    isMoving = true;
    gamePaused = false;
}

// Stop spinner and check if it landed in the selected corner
function stopSpinner() {
    isMoving = false;
    noLoop();  // Stop the animation loop temporarily
    checkResult();
}

// Check if the spinner is in the selected corner
function checkResult() {
    let landedCorner = getCorner(spinnerX, spinnerY);

    if (landedCorner === selectedCorner) {
        // If the spinner lands in the selected corner, no points
        document.getElementById("scoreBoard").innerText = `No Points! Score: ${score}`;
    } else {
        // Award 1 point if it doesn't land in the selected corner
        score++;
        document.getElementById("scoreBoard").innerText = `1 Point! Score: ${score}`;
    }

    // Move to the next round
    rounds--;
    if (rounds > 0) {
        document.getElementById('continueButton').style.display = 'block';  // Show continue button
        gamePaused = true;
    } else {
        document.getElementById("scoreBoard").innerText = `Game Over! Final Score: ${score}`;
    }
}

// Determine which corner the spinner lands in
function getCorner(x, y) {
    if (x < width / 2 && y < height / 2) return 'topLeft';
    if (x >= width / 2 && y < height / 2) return 'topRight';
    if (x < width / 2 && y >= height / 2) return 'bottomLeft';
    return 'bottomRight';
}

// Button click event listeners to select the corner
document.getElementById('topLeft').addEventListener('click', () => {
    selectedCorner = 'topLeft';
    startSpinner();
});
document.getElementById('topRight').addEventListener('click', () => {
    selectedCorner = 'topRight';
    startSpinner();
});
document.getElementById('bottomLeft').addEventListener('click', () => {
    selectedCorner = 'bottomLeft';
    startSpinner();
});
document.getElementById('bottomRight').addEventListener('click', () => {
    selectedCorner = 'bottomRight';
    startSpinner();
});

function startSpinner() {
    if (!isMoving && !gamePaused && img) {
        loop();  // Start the animation loop
    }
}
