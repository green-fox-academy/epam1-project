'use strict';

var logger = require('./log.js')();

function UserController(queries) {
  var _this = this;
  this.logger = logger;

  this.registerUser = function (request, response) {
    queries.registNewUser(request.body, function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.getAllUser = function (request, response) {
    queries.getAllUserFromDB(function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.findUser = function (email, cb) {
    queries.findUser(email, function (err, result) {
      if (err) return cb(err);
      var foundUser = result.rows[0];
      if (foundUser) return cb(null, foundUser);
      return cb(null, null);
    });
  };

  this.handleResponse = function (err, result, response) {
    if (err) {
      this.logger.message('error', 'DATABASE CONNECTION ERROR');
      response.status(503).json({ 'Connection Error:': err });
    } else {
      if (result.rows.length === 0) {
        this.logger.message('warn', 'ITEM NOT FOUND IN DATABASE');
        response.status(404).json(result.rows);
      } else {
        this.logger.message('info', 'SUCCESSFUL DATABASE QUERY');
        response.status(200).json(result.rows);
      }
    }
  };
}

module.exports = UserController;
