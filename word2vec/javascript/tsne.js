/*
*
* This file contains an implementation of the t-Distributed Stochastic Neighbour Embedding algorithm
* It is used in order to reduce the dimensionality of data whilst preserving the higher dimensional similarities that exist.
* The algorithm can be found in this paper: http://jmlr.csail.mit.edu/papers/volume9/vandermaaten08a/vandermaaten08a.pdf
* A lot of this work is inspired by: https://github.com/karpathy/tsnejs/blob/master/tsne.js
*/

class TSNE {
  constructor(perp, data, iterations, learningRate, momentum) {
    this.perp = perp;
    this.iterations = iterations;
    this.learningRate = learningRate;
    this.momentum = momentum;
    this.distances = this.applyDistances(data);
    this.Ps = this.calculatePairwise(this.distances);
  }

  zeros(n) {
    let arr = [];
    for(var i = 0; i < n; i++) {
      arr.append(0);
    }
    return arr;
  }

  norm(x) {
    let total = x
      .map((i) => i*i)
      .reduce((acc, j) => acc + j, 0);

    return Math.sqrt(total);
  }

  applyDistances(data) {
    let ds = zeros(data.length * data.length);
    for(var row = 0; row < data.length; row++) {
      for(var col = row + 1; col < data.length; col++) {
        let d = distance(data[row], data[col]);
        ds[row * data.length + col] = d;
        ds[col * data.length + row] = d;
      }
    }
    return ds;
  }

  distance(x, y) {
    let vec = x.map((i, idx) => {
      i - y[idx];
    })

    return norm(vec);
  }

  calculatePairwise(distances) {
    let h = Math.log(this.perplexity);
    let n = Math.sqrt(distances.length);
    let sigma = 1;
    let maxIterations = 15;
    let stop = false;
    let Ps = this.zeros(n * n)
    //Searching for the optimal variance using a binary search
    let cacheRow = this.zeros(n);
    for(var i = 0 ; i < n; i++) {
      let iter = 0;
      while(!stop) {
        //Calculate the current p_j_i value
        let h_guess = 0;
        let denom = 0;
        for(var j = 0; j < n; j++) {
          let p_j = Math.exp(distances[i * n + j]/(2 * Math.pow(sigma, 2)));
          if (i === j) {
            p_j = 0;
          } else {
            cacheRow[j] = p_j
            denom += p_j
          }
        }

        //The division step in the algorithm
        for(var j = 0; j < n; j++) {
          let p_j = cacheRow[j] / denom;
          cacheRow[j] = p_j;
          h_guess += (cacheRow[j] * Math.log(cacheRow[j]));
        }
      }

      if(h_guess > h) {
        sigma /= 2;
      } else {
        sigma *= 2;
      }

      //Stopping Conditions
      iter++;

      if(iter > maxIterations) {
        stop = true;
      }

      if(h - h_guess <= 0.1) {
        stop = true;
      }

    }

    for(var j = 0; j < n; j++) {
      Ps[i * n + j] = cacheRow[j];
    }
    return Ps;
  }

  costGradient(Ys) {

  }

  random2dArray(m, n) {
    let arr = []
    for(var i = 0; i < m; i++) {
      for(var j = 0; j < n; j++) {
        arr.push(Math.random());
      }
    }
    return arr;
  }

  initialiseRandomSolution(n) {
    let Ys = this.random2dArray(n, n);
    return Ys;
  }
}

let tsne = new TSNE(1, 1, 1, 1, 1);

tsne.calculatePairwise(1, 2);
tsne.norm([1, 2, 3, 4]);
console.log(tsne.initialiseRandomSolution(20));
