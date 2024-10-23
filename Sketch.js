let isPressed = false;
let timer = 0;
const LIGHTNING_DURATION = 10000; // 10 seconds in milliseconds

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '1'); // Behind thumb-area
    noFill();
}

function draw() {
    clear();

    // Draw lightning for the duration of the timer
    if (isPressed && millis() - timer < LIGHTNING_DURATION) {
        for (let i = 0; i < 10; i++) {
            stroke(255, 255, 0, random(100, 255));
            strokeWeight(random(2, 5));
            beginShape();
            for (let j = 0; i < 5; j++) {
                let x = random(0, width);
                let y = random(0, height);
                vertex(x, y);
            }
            endShape();
        }
    } else if (isPressed && millis() - timer >= LIGHTNING_DURATION) {
        // Reset after the timer has run out
        resetLightning();
    }
}

// Function to handle touch and mouse press events
function handlePress() {
    let thumbArea = document.getElementById('thumb-area');
    let d = dist(mouseX, mouseY, thumbArea.offsetLeft + thumbArea.offsetWidth / 2, thumbArea.offsetTop + thumbArea.offsetHeight / 2);

    // Check if the press is within the thumb-area
    if (d < thumbArea.offsetWidth / 2 && !isPressed) {
        thumbArea.classList.add('active');
        isPressed = true;
        timer = millis(); // Start the timer
    }
}

// Function to handle the mouse release or touch end event
function handleRelease() {
    let thumbArea = document.getElementById('thumb-area');
    thumbArea.classList.remove('active');
    isPressed = false;
}

// Reset function to stop lightning and reset the button state
function resetLightning() {
    let thumbArea = document.getElementById('thumb-area');
    thumbArea.classList.remove('active');
    isPressed = false;
}

function mousePressed() {
    handlePress();
}

function touchStarted() {
    handlePress();
}

function touchEnded() {
    handleRelease();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}