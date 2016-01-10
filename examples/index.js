var counter = require('../lib/').default;

counter(function(error, counts) {
  if (error) {
    console.error(error);
  } else {
    console.log(counts);
  }
});
