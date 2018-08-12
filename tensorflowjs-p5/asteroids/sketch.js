let asteroids = [];
let spaceship;
const mass = 60;

function setup() {
  createCanvas(800, 800);
  spaceship = new Spaceship(width/2, height/2, 10);
  for (let i = 0; i < 4; i++) {
    asteroids.push(new Asteroid(random(width), random(height), 1, random(30, 60)));
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

  collisionDetection(asteroids);
}
