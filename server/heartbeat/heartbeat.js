'use strict';

var logger = require('../log.js')();

function HeartbeatController(query) {
  var _this = this;
  this.logger = logger;
  this.getStatus = function (request, response) {
    query.get(function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.handleResponse = function (err, result, response) {
    if (err) {
      _this.logger.message('error', 'DATABASE CONNECTION ERROR');
      response.status(503).json({ 'Connection Error:': err });
    } else {
      if (result.rows.length === 0) {
        _this.logger.message('warn', 'ITEM NOT FOUND IN DATABASE');
        response.status(404).json(result.rows);
      } else {
        _this.logger.message('info', 'SUCCESSFUL DATABASE QUERY');
        response.status(200).json(result.rows);
      }
    }
  };
}

module.exports = HeartbeatController;
