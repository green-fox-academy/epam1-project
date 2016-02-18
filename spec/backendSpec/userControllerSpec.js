'use strict';

describe('Controller', function () {
  var request = require('supertest');
  var createServer = require('../../server/server');
  var app;

  beforeEach(function () {
    var connection = {};
    connection.sendQuery = function (query, callback) {
      return callback(null, { rows: [{}] });
    };

    app = createServer(connection);
  });

  describe('POST api/register', function () {
    it('should respond with json', function (done) {
      var user = { email: 'smth@fox.com', password: '1234' };
      request(app)
        .post('/api/register')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });
});
