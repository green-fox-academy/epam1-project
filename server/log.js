'use strict';

function Log() {
  this.logRequest = function (req, res, next) {
    var parts = [
      'info',
      new Date(),
      req.method,
      req.originalUrl,
    ];
    console.log(parts.join(' '));
    next();
  };

  this.logQuery = function (query) {
    var parts = [
      'info',
      new Date(),
      query,
    ];
    console.log(parts.join(' '));
  };

  this.logResponse = function (response, status) {
    var parts = [
      'info',
      new Date(),
      response,
      status,
    ];
    console.log(parts.join(' '));
  };

  this.logWarning = function (message, status) {
    var parts = [
      'warn',
      new Date(),
      message,
      status,
    ];
    console.log(parts.join(' '));
  };

  this.logError = function (error, status) {
    var parts = [
      'error',
      new Date(),
      error,
      status,
    ];
    console.log(parts.join(' '));
  };
}

module.exports = Log;
