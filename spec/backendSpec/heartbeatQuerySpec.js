'use strict';

describe('heartbeat query', function () {
  var connection = {};
  var Beat = require('../../server/heartbeat/heartbeat-query.js');
  var heartbeat = new Beat(connection);
  var callback;

  beforeEach(function () {
    callback = function () {};

    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };

    spyOn(connection, 'sendQuery').and.callThrough();
  });

  describe('get query', function () {
    it('tracks all the arguments of its calls', function () {
      heartbeat.get(callback);
      expect(connection.sendQuery).toHaveBeenCalledWith(
        'SELECT ok FROM heartbeat', callback
      );
    });
  });
});
