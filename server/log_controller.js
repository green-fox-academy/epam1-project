'use strict';

var logger = require('./log.js')();

function LogController() {

  this.logRequest = function (req, res, next) {
    var logLevel = 'info';
    var logMessage = `NEW REQUEST, method=${req.method}, url=${req.originalUrl}`;
    logger.message(logLevel, logMessage);
    next();
  };

  this.logFrontendEvent = function (req, res) {
    var logLevel = req.body.level;
    var logMessage = `NEW FRONTEND EVENT, ROUTE CHANGED TO: ${req.body.toState}`;
    logger.message(logLevel, logMessage);
    res.status(200).json({ 'Logging:': 'Success' });
  };
}

module.exports = LogController;
