'use strict';

var pg = require('pg');
var config = require('./config.js');
var logger = require('./log.js')();

function Connection() {
  var _this = this;
  this.logger = logger;
  this.sendQuery = function (query, callback) {
    pg.connect(config.DATABASE_URL, function (connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query, function (queryError, result) {
          done();
          _this.logger.message('info', `NEW DATABASE QUERY`);
          callback(queryError, result);
        });
      }
    });
  };
}

module.exports = Connection;
