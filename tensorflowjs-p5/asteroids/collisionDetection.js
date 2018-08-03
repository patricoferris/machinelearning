//A basic collision detection algorithm

function collisionDetection(asteroids) {
  for(let i = 0; i < asteroids.length; i++) {
    for(let j = asteroids.length - 1 ; j >= i + 1; j--) {
      //Preliminary version is to approximate the two asteroids as circles
      let x = asteroids[i].position.x;
      let y = asteroids[i].position.y;
      let r = asteroids[i].size * asteroids[i].maxfactor;
      let x2 = asteroids[j].position.x;
      let y2 = asteroids[j].position.y;
      let r2 = asteroids[j].size * asteroids[j].maxfactor;
      if(dist(x, y, x2, y2) <= (r/2 + r2/2)){
        let v1 = asteroids[i].velocity;
        let p1 = asteroids[i].position;
        let m1 = asteroids[i].size;
        let v2 = asteroids[j].velocity;
        let p2 = asteroids[j].position;
        let m2 = asteroids[j].size;

        v1_prime = v1.sub(p1.sub(p2).mult(p5.Vector.dot(v1.sub(v2), p1.sub(p2)) * ((2*m2/(m1+m2))) / (mag(p1.sub(p2)) * mag(p1.sub(p2)))));
        v2_prime = v2.sub(p2.sub(p1).mult(p5.Vector.dot(v2.sub(v1), p2.sub(p1)) * ((2*m1/(m1+m2))) / (mag(p2.sub(p1)) * mag(p2.sub(p1)))));

        asteroids[i].setVelocity(v1_prime.mult(0.001));
        asteroids[j].setVelocity(v2_prime.mult(0.001));

        console.log(x, y, x2, y2);
        return true;
      }
    }
  }
  return false;
}
