'use strict';

var SQL = require('sql-template-strings');

function UserQueries(connection) {

  this.registNewUser = function (params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO users (email, password)
      VALUES (${params.email}, ${params.password})
      RETURNING id, email, admin`,
      callback
    );
  };

  this.getAllUserFromDB = function (callback) {
    connection.sendQuery('SELECT * FROM USERS', callback);
  };
}

module.exports = UserQueries;
