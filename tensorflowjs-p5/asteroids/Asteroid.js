//The Asteroid Class

class Asteroid {
  constructor(x, y, size, maxfactor) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(random(0.1), random(0.1));
    this.size = size;
    this.maxfactor = maxfactor;
    this.total = random(5, 20);
    this.offset = []
    this.rotation = 0;
    for(let i = 0; i < this.total; i++) {
      this.offset.push(random(0.6*this.size, this.maxfactor*this.size));
    }
  }

  render() {
    push();
    stroke(0);
    fill(255);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.offset[i];
      vertex(r * cos(angle), r * sin(angle));
    }
    endShape(CLOSE);
    noFill()
    stroke(255, 0, 0);
    ellipse(0, 0, this.maxfactor*this.size);
    pop();
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.size * 0.1);
    this.acceleration.add(f);
  }

  setVelocity(v) {
    this.velocity = v;
  }

  update() {
    this.velocity = this.velocity.add(this.acceleration);
    this.position = this.position.add(this.velocity);
    this.rotation += 0.01;
    this.acceleration.mult(0);

    if(this.position.x > width + this.size) {
      this.position.x = 0;
    } else if (this.position.x < 0 - this.size) {
      this.position.x = width;
    }

    if(this.position.y > height + this.size) {
      this.position.y = 0;
    } else if (this.position.y < 0 - this.size) {
      this.position.x = height;
    }

  }
}
