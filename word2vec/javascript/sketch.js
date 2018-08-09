let txtObj;
let vocabulary = {};
let index = 0;
let words = []


//TENSORFLOW CONSTANTS
const model = tf.sequential();
const BATCH_SIZE = 64;
const EMBEDDING_SIZE = 16;

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
  let vocabSize = vocabulary.length;
  model.add(tf.layers.Embedding({
    inputDim: vocabSize,
    outputDim: EMBEDDING_SIZE
  }));

  model.add(tf.layers.Dense({
    units: 20,
    
  }))
}
