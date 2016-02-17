'use strict';

var config = require('./config.js');

function createLog(loggingLevel, loggerFunction, InnerDate) {
  loggingLevel = loggingLevel || config.DEFAULT_LOGGING_LEVEL;
  loggerFunction = loggerFunction || console.log;
  InnerDate = InnerDate || Date;
  var levels = ['debug', 'info', 'warn', 'error'];

  function message(level, message) {
    createLogEntry({
      level: level,
      date: new InnerDate().toISOString(),
      message: message,
    });
  }

  function createLogEntry(messages) {
    if (isValidLevel(messages.level)) {
      loggerFunction(JSON.stringify(messages));
    }
  }

  function isValidLevel(level) {
    return levels.indexOf(level) >= levels.indexOf(loggingLevel);
  }

  return {
    message: message,
    isValidLevel: isValidLevel,
  };
}

module.exports = createLog;
