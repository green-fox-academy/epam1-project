'use strict';

function Log() {
  this.logRequest = function (req, res, next) {
    var parts = [
      new Date(),
      req.method,
      req.originalUrl,
    ];
    console.log(parts.join(' '));
    next();
  };

  this.logQuery = function (query) {
    var parts = [
      new Date(),
      query,
    ];
    console.log(parts.join(' '));
  };

  this.logResponse = function (response, status) {
    var parts = [
      new Date(),
      response,
      status,
    ];
    console.log(parts.join(' '));
  };

  this.logError = function (error, status) {
    var parts = [
      new Date(),
      error,
      status
    ];
    console.log(parts.join(' '));
  };
}

module.exports = Log;
