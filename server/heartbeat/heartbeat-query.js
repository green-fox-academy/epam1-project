'use strict';

function Heartbeat(connection) {
  this.get = function (callback) {
    connection.sendQuery('SELECT ok FROM heartbeat', callback);
  };
}

module.exports = Heartbeat;
