var sinon = require('sinon');
var expect = require('chai').use(require('sinon-chai')).expect;
var Counter = require('../lib/counter').Counter;

describe('Counter', function() {

  describe('[slow] fetch()', function() {
    it('works', function(done) {
      this.timeout(5000);
      var c = new Counter('dummy');
      c.fetch('bouzuya', function(err, data) {
        expect(data).to.have.a.property('followers');
        expect(data).to.have.a.property('following');
        expect(data).to.have.a.property('public_repos');
        expect(data).to.have.a.property('public_gists');
        done();
      });
    });
  });

  describe('parse()', function() {
    it('works', function(done) {
      var c = new Counter('dummy');
      var parsed = c.parse({
        followers: 1,
        following: 2,
        public_repos: 3,
        public_gists: 4,
      });
      expect(parsed).to.have.a.property('GitHub Followers', 1);
      expect(parsed).to.have.a.property('GitHub Following', 2);
      expect(parsed).to.have.a.property('GitHub Public Repos', 3);
      expect(parsed).to.have.a.property('GitHub Public Gists', 4);
      done();
    });
  });

  describe('count()', function() {
    it('works', function(done) {
      var username = 'dummy';
      var data = {
        followers: 1,
        following: 2,
        public_repos: 3,
        public_gists: 4,
      };
      var c = new Counter(username);
      var parse = sinon.stub(c, 'parse');
      var fetch = sinon.stub(c, 'fetch', function(username, callback) {
        callback(null, data);
      });
      c.count(function(err, counts) {
        expect(parse).to.have.been.calledWith(data);
        expect(fetch).to.have.been.calledWith('dummy');
        done();
      });
    });
  });

});

