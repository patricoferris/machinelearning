// The Spaceship class

class Spaceship {
  constructor(x, y, size) {
    this.position = createVector(x, y);
    this.velocity = createVector(1, 0);
    this.acceleration = createVector(1, 0);
    this.size = size;
  }

  boost() {
    this.applyForce(createVector(1, 0));
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
    beginShape()
    vertex(-this.size, 0);
    vertex(0, 2*this.size);
    vertex(this.size, 0);
    endShape(CLOSE);
    pop();
  }
}
