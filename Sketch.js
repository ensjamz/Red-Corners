let img;
let imgFile;
let imgCircle = { x: 0, y: 0, size: 100, angle: 0, speedX: 2, speedY: 2 };
let zooming = false;
let zoomTime = 0;
let circleDiameter = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noStroke();
  
  // File input handling
  const fileInput = document.getElementById('imageUpload');
  fileInput.addEventListener('change', handleFile);
  
  imgCircle.x = random(width);
  imgCircle.y = random(height);
}

function handleFile(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    imgFile = createImg(URL.createObjectURL(file), '', '', () => {
      img = loadImage(imgFile.elt.src);
      imgFile.hide();
    });
  }
}

function draw() {
  background(200);

  if (img) {
    if (!zooming) {
      // Update circle movement and rotation
      imgCircle.x += imgCircle.speedX;
      imgCircle.y += imgCircle.speedY;
      imgCircle.angle += 0.01;

      // Check for bouncing
      if (imgCircle.x - circleDiameter / 2 < 0 || imgCircle.x + circleDiameter / 2 > width) {
        imgCircle.speedX *= -1;
      }
      if (imgCircle.y - circleDiameter / 2 < 0 || imgCircle.y + circleDiameter / 2 > height) {
        imgCircle.speedY *= -1;
      }
    }

    // Apply zoom effect if zooming
    if (zooming) {
      circleDiameter = lerp(circleDiameter, width / 2, 0.1);
      imgCircle.x = lerp(imgCircle.x, width / 2, 0.1);
      imgCircle.y = lerp(imgCircle.y, height / 2, 0.1);
      zoomTime += deltaTime;

      if (zoomTime > 3000) {
        zooming = false;
        zoomTime = 0;
        circleDiameter = 100;
      }
    }

    // Draw circular image
    push();
    translate(imgCircle.x, imgCircle.y);
    rotate(imgCircle.angle);

    // Make the image circular by applying a mask
    let imgRadius = circleDiameter / 2;
    clipCircle(imgCircle.x, imgCircle.y, imgRadius);
    image(img, 0, 0, circleDiameter, circleDiameter);
    noClip(); // Turn off the mask

    pop();
  }
}

function mousePressed() {
  // Detect if the image is touched
  const distanceToCircle = dist(mouseX, mouseY, imgCircle.x, imgCircle.y);
  if (distanceToCircle < circleDiameter / 2) {
    zooming = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Function to clip the image into a circle
function clipCircle(x, y, radius) {
  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.01) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}