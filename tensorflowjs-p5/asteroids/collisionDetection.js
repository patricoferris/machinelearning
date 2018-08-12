//A basic collision detection algorithm

function collisionDetection(asteroids) {
  for(let i = 0; i < asteroids.length; i++) {
    for(let j = asteroids.length - 1 ; j >= i + 1; j--) {
      //Preliminary version is to approximate the two asteroids as circles
      let astA = asteroids[i];
      let astB = asteroids[j];
      let x = astA.position.x;
      let y = astA.position.y;
      let r = astA.radius;
      let x2 = astB.position.x;
      let y2 = astB.position.y;
      let r2 = astB.radius;

      if(dist(x, y, x2, y2) <= (r + r2)){
        let collisionNormal = p5.Vector.sub(astB.position, astA.position).normalize();
        let relativeVelocity = p5.Vector.sub(astB.velocity, astA.velocity);

        let velAlongNormal = p5.Vector.mult(relativeVelocity, collisionNormal);

        //Elasticity of collisions
        let e = 1;

        //Impulse Scalar
        let impulseScalar = p5.Vector.mult(velAlongNormal, (-(1 + e)));
        impulseScalar.div((1/astA.mass + 1/astB.mass));

        let impulse = p5.Vector.mult(collisionNormal, impulseScalar);
        astA.velocity.sub(impulse.mult(1/astA.mass));
        astB.velocity.add(impulse.mult(1/astB.mass));

        return true;
      }
    }
  }
  return false;
}
