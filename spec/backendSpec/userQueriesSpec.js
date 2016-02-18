'use strict';

var SQL = require('sql-template-strings');

describe('User query', function () {
  var connection = {};
  var UserQueries = require('../../server/user_queries.js');
  var userQueries = new UserQueries(connection);
  var callback;

  beforeEach(function () {
    callback = function () {};

    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };

    spyOn(connection, 'sendQuery').and.callThrough();
  });

  describe('test registrateUser query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { email: 'test@test.com', password: '1234' };
      userQueries.registrateUser(params, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      INSERT INTO users (email, password, role)
      VALUES (${params.email}, ${params.password}, 'admin')
      RETURNING id, email, role`,
      callback);
    });
  });
});
