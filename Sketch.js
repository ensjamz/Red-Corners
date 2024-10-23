let isPressed = false;
let timer = 0;
const LIGHTNING_DURATION = 10000; // 10 seconds in milliseconds

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '1'); // Behind thumb-area
    noFill();
    strokeWeight(2);
}

function draw() {
    clear();

    // Draw lightning for the duration of the timer
    if (isPressed && millis() - timer < LIGHTNING_DURATION) {
        // Create lightning flashes across the screen
        for (let i = 0; i < 5; i++) {
            drawLightning(random(width), random(height));
        }
    } else if (isPressed && millis() - timer >= LIGHTNING_DURATION) {
        // Reset after the timer has run out
        resetLightning();
    }
}

// Function to draw a single lightning bolt at random positions
function drawLightning(x, y) {
    let length = random(50, 200);  // Length of the lightning bolt
    stroke(255, 255, 0, random(100, 255));  // Random yellow shades
    strokeWeight(random(2, 5));
    
    beginShape();
    vertex(x, y);
    for (let i = 0; i < 10; i++) {
        let newX = x + random(-50, 50);  // Random jagged lightning effect
        let newY = y + random(-50, 50);
        vertex(newX, newY);
    }
    endShape();
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

// Function to reset the lightning and thumb-area
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
    resetLightning();  // End effect when touch is lifted
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}