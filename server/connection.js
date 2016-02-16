'use strict';

var pg = require('pg');
var config = require('./config.js');
var Log = require('./log.js');

function Connection() {
  var _this = this;
  this.log = new Log();
  this.sendQuery = function (query, callback) {
    pg.connect(config.DATABASE_URL, function (connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query, function (queryError, result) {
          done();
          _this.log.logQuery(query);
          callback(queryError, result);
        });
      }
    });
  };
}

module.exports = Connection;
