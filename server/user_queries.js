'use strict';

var SQL = require('sql-template-strings');

function UserQueries(connection) {

  this.registrateUser = function (params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO users (email, password, role)
      VALUES (${params.email}, ${params.password}, 'admin')
      RETURNING id, email, role`,
      callback
    );
  };
}

module.exports = UserQueries;
