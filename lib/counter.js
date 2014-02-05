var GitHubApi = require('github');

var Counter = function(username) {
  if (!username) {
    throw new Error('username is required');
  }
  this.username = username;
};

Counter.prototype.fetch = function(username, callback) {
  var github = new GitHubApi({ version: '3.0.0' });
  github.user.getFrom({ user: username }, callback);
};

Counter.prototype.count = function(callback) {
  var self = this;
  self.fetch(self.username, function(err, data) {
    if (err) return callback(err);
    var counts = self.parse(data);
    callback(null, counts);
  });
};

Counter.prototype.parse = function(data) {
  return {
    'GitHub Followers': data.followers,
    'GitHub Following': data.following,
    'GitHub Public Repos': data.public_repos,
    'GitHub Public Gists': data.public_gists
  };
};

module.exports.Counter = Counter;

