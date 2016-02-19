'use strict';

var logger = require('./log.js')();

function LogController() {
  var _this = this;
  this.logger = logger;

  this.logRequest = function (req, res, next) {
    _this.logger.message('info', `NEW REQUEST, method=${req.method}, url=${req.originalUrl}`);
    next();
  };

  this.logFrontendEvent = function (req, res) {
    _this.logger.message(`${req.body.level}`, `NEW FRONTEND EVENT`);
    res.status(200).json({ 'log:': 'OK' });
  };
}

module.exports = LogController;
