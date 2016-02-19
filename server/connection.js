'use strict';

var pg = require('pg');
var config = require('./config.js');

function Connection() {
  this.sendQuery = function (query, callback) {
    pg.connect(config.DATABASE_URL, function (connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query, function (queryError, result) {
          done();
          callback(queryError, result);
        });
      }
    });
  };
}

module.exports = Connection;
