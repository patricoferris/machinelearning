
function sumRows(x) {
  let cols = x.shape[1];
  let ones = tf.ones([cols, 1]);
  return tf.reshape(tf.matMul(x, ones), [-1]);
}

function compute_sampled_logits({
  weights,
  biases,
  labels,
  inputs,
  num_sampled,
  num_classes,
  num_true=1,
  sampled_values=None,
}) {
  let labels_flat = tf.reshape(labels, [-1]);
  
}

function nce_loss({
  weights: weights,
  biases: biases,
  labels: labels,
  inputs: inputs,
  num_sampled: num_sampled,
  num_classes: num_classes,
  num_true: num_true,
  sampled_values: sampled_values,
}) {

  let sample_losses = tf.sigmoidCrossEntropyWithLogits({
    labels: labels,
    logits: logits
  });
  return sumRows(sampled_losses);
}
