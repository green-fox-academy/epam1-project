'use strict';

var pg = require('pg');
var config = require('./config.js');
var Logger = require('./log.js');

function Connection() {
  var _this = this;
  this.logger = new Logger();
  this.sendQuery = function (query, callback) {
    pg.connect(config.DATABASE_URL, function (connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query, function (queryError, result) {
          done();
          _this.logger.message('info', `NEW DATABASE QUERY = ${query}`);
          callback(queryError, result);
        });
      }
    });
  };
}

module.exports = Connection;
