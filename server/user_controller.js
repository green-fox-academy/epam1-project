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

  this.updateUserAdmin = function (request, response) {
    queries.updateUserAdminStatus(request.body, function (err, result) {
      _this.handleResponse(err, result, response);
    });
  };

  this.getAllUser = function (request, response) {
    queries.getUsers(function (err, result) {
      _this.handleResponse(err, result, response);
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

  this.authenticateUser = function (username, password, done) {
    _this.findUser(username, function (err, user) {
      if (err) {
        return done(err, false, 'Connection error');
      } else if (!user) {
        return done(null, false, 'Incorrect username');
      } else if (user.password !== password) {
        return done(null, false, 'Incorrect password');
      } else {
        return done(null, user);
      }
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

  this.serialize = function (user, cb) {
    cb(null, user.email);
  };

  this.deserialize = function (email, done) {
    _this.findUser(email, function (err, user) {
      done(err, user);
    });
  };

  this.sessionLogout = function (req, res) {
    if (!req.isAuthenticated()) {
      res.status(500).send('Nobody logged in');
    } else {
      req.logout();
      res.status(200).send('Successful logout');
    }
  };

  this.loggedInStatus = function (req, res) {
    res.status(200).send(req.isAuthenticated());
  };

}

module.exports = UserController;
