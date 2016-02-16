'use strict';

var config = require('./config.js');

function Log() {
  var _this = this;
  this.levels = ['debug', 'info', 'warn', 'error'];
  this.loggingLevel = config.DEFAULT_LOGGING_LEVEL;

  this.logRequest = function (req, res, next) {
    _this.createLogEntry({
      level: 'info',
      name: 'NEW REQUEST',
      method: req.method,
      url: req.originalUrl,
    });
    next();
  };

  this.message = function (level, message) {
    _this.createLogEntry({
      level: level,
      message: message,
    });
  };

  this.createLogEntry = function (messages) {
    if (_this.isValidLevel(messages.level)) {
      console.log(JSON.stringify(messages));
    }
  };

  this.isValidLevel = function (level) {
    return _this.levels.indexOf(level) >= _this.levels.indexOf(_this.loggingLevel);
  };
}

module.exports = Log;
