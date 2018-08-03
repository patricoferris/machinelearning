let asteroids = [];
const size = 60;

function setup() {
  createCanvas(800, 800);
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid(random(width), random(height), random(size), random(1.5, 2.5)));
  }
}

function draw() {
  background(0);

  for(asteroid of asteroids) {
    asteroid.render();
    asteroid.update();
  }

  if(collisionDetection(asteroids)){
    console.log('BOOM!');
  }
}
