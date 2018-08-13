// The Spaceship class

class Spaceship {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.size = size;
    this.angle = 0;
    this.up = createVector(0, -0.1);
  }

  boost() {
    this.applyForce(this.up);
  }

  rotate(rad) {
    this.angle += rad;
    this.up.rotate(rad);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    beginShape()
    vertex(-this.size, this.size/2);
    vertex(0, -2*this.size);
    vertex(this.size, this.size/2);
    endShape(CLOSE);
    pop();
  }
}
