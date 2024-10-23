let isPressed = false;

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.position(0, 0);
    cnv.style('z-index', '1'); // Behind thumb-area
    noFill();
}

function draw() {
    clear();
    
    if (isPressed) {
        for (let i = 0; i < 10; i++) {
            stroke(255, 255, 0, random(100, 255));
            strokeWeight(random(2, 5));
            beginShape();
            for (let j = 0; j < 5; j++) {
                let x = random(0, width);
                let y = random(0, height);
                vertex(x, y);
            }
            endShape();
        }
    }
}

function mousePressed() {
    let thumbArea = document.getElementById('thumb-area');
    let d = dist(mouseX, mouseY, thumbArea.offsetLeft + thumbArea.offsetWidth / 2, thumbArea.offsetTop + thumbArea.offsetHeight / 2);

    if (d < thumbArea.offsetWidth / 2) {
        thumbArea.classList.add('active');
        isPressed = true;
    }
}

function mouseReleased() {
    document.getElementById('thumb-area').classList.remove('active');
    isPressed = false;
}