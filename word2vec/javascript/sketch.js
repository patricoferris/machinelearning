let txtObj;
let vocabulary = {};
let index = 0;
let words = []

//TENSORFLOW CONSTANTS
const BATCH_SIZE = 64;

function preload() {
  txtObj = loadStrings('alice.txt', processData);
}

function processData(data) {
  for(sentence of data) {
    let tokens = sentence.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
    for(token of tokens) {
      words.push(token);
      if(!(token in vocabulary)) {
        vocabulary[token] = index++;
      }
    }
  }
  console.log(words);
}

function setup() {
  let inputs = tf.input({shape: BATCH_SIZE});
}
