var expect = require('chai').use(require('sinon-chai')).expect;
var counter = require('../');

describe('counter()', function() {
  it('[slow] works', function(done) {
    this.timeout(5000);
    counter(function(err, counts) {
      expect(err).to.be.null;
      expect(counts).to.have.a.property('GitHub Followers');
      expect(counts).to.have.a.property('GitHub Following');
      expect(counts).to.have.a.property('GitHub Public Repos');
      expect(counts).to.have.a.property('GitHub Public Gists');
      done();
    });
  });
});

