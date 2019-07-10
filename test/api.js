const request = require('request');
const expect = require('chai').expect;

describe('get routes', function() {

  it('should get posts', function(done) {
    request.get('http://localhost:3000/api/posts', function(err, res, body) {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should get single post', function(done) {
    const fetchUrl = 'https://hn.algolia.com/api/v1/items/20404038'
    request.get(fetchUrl, function(err, res, body) {
      expect(err).to.equal(null);
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

});
