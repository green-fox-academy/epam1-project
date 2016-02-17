'use strict';

describe('Test logger', function () {

  it('checks existence', function () {
    var logger = require('../../server/log.js')();
    expect(typeof logger.message).toBe('function');
  });

  describe('create fake dependencies', function () {

    it('should log because the log\'s level is higher than the logging level', function () {
      var currentLevel = 'error';
      var loggingLevel = 'info';

      function fakeConsoleLog(text) {
        expect(text).toBe(`{"level":"${currentLevel}","date":"fakeDatum","message":"testMessage"}`);
      }

      function FakeDate() {}

      FakeDate.prototype.toISOString = function () {
        return 'fakeDatum';
      };

      var logger = require('../../server/log.js')(loggingLevel, fakeConsoleLog, FakeDate);
      logger.message(currentLevel, 'testMessage');
      expect(logger.isValidLevel(currentLevel)).toBe(true);
    });

    it('shouldn\'t log because the log\'s level is lower than the logging level', function () {
      var currentLevel = 'info';
      var loggingLevel = 'error';

      function fakeConsoleLog(text) {
        expect(text).toBe(`{"level":"${currentLevel}","date":"fakeDatum","message":"testMessage"}`);
      }

      function FakeDate() {}

      FakeDate.prototype.toISOString = function () {
        return 'fakeDatum';
      };

      var logger = require('../../server/log.js')(loggingLevel, fakeConsoleLog, FakeDate);
      logger.message(currentLevel, 'testMessage');
      expect(logger.isValidLevel(currentLevel)).toBe(false);
    });
  });

});
