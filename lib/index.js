var Counter = require('./counter').Counter;

module.exports = function(callback) {
  try {
    var username = process.env.GITHUB_USERNAME;
    var counter = new Counter(username)
    counter.count(callback);
  } catch(e) {
    callback(e);
  }
};

