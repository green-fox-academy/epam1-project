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
      userQueries.registNewUser(params, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      INSERT INTO users (email, password)
      VALUES (${params.email}, ${params.password})
      RETURNING id, email, admin`,
      callback);
    });
  });

  describe('test getUsers query', function () {
    it('tracks all the arguments of its calls', function () {
      userQueries.getUsers(callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
      'SELECT id, email, admin FROM USERS',
      callback);
    });
  });

  describe('test updateUserAdminStatus query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { email: 'test@test.com', admin: true };
      userQueries.updateUserAdminStatus(params, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      UPDATE users SET admin = ${params.admin}
      WHERE email = ${params.email}
      RETURNING email, admin`,
      callback);
    });
  });
});
