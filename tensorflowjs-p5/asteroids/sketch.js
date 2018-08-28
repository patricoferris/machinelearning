let asteroids = [];
let spaceship;
const mass = 60;

let up = false;
let right = false;
let left = false;

function setup() {
  createCanvas(640, 640);
  spaceship = new Spaceship(width/2, height/2, 6);
  for (let i = 0; i < 8; i++) {
    asteroids.push(new Asteroid(random(width), random(height), 1, random(20, 40)));
  }
}

function draw() {
  background(0);

  spaceship.update();
  spaceship.show();

  for(asteroid of asteroids) {
    asteroid.render();
    asteroid.update();
  }

  if(up) {
    spaceship.boost();
  }

  if(right) {
    spaceship.rotate(0.1);
  }

  if(left) {
    spaceship.rotate(-0.1);
  }

  collisionDetection(asteroids);
}

function keyPressed() {
  if(keyCode == UP_ARROW) {
    up = true;
  }

  if(keyCode == RIGHT_ARROW) {
    right = true;
  }

  if(keyCode == LEFT_ARROW) {
    left = true;
  }
}

function keyReleased() {
  if(keyCode == UP_ARROW) {
    up = false;
  }

  if(keyCode == RIGHT_ARROW) {
    right = false;
  }

  if(keyCode == LEFT_ARROW) {
    left = false;
  }
}
