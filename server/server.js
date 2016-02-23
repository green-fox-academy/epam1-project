'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var HeartQuery = require('./heartbeat/heartbeat-query.js');
var HeartBeat = require('./heartbeat/heartbeat.js');
var UserController = require('./user_controller.js');
var UserQueries = require('./user_queries.js');
var LogController = require('./log_controller.js');

function createServer(connection) {
  var passport = require('passport');
  var Strategy = require('passport-local').Strategy;
  var heartQuery = new HeartQuery(connection);
  var userQueries = new UserQueries(connection);
  var heartController = new HeartBeat(heartQuery);
  var userController = new UserController(userQueries);
  var logController = new LogController();

  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  function (username, password, done) {
    userController.findUser(username, function (err, user) {
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
  }));

  var app = express();
  app.use(logController.logRequest);

  app.use(bodyParser.json());
  app.use(passport.initialize());

  var route = path.join(__dirname, '..', 'public');
  app.use(express.static(route));

  app.get('/heartbeat', heartController.getStatus);
  app.get('/api/users', userController.getAllUser);
  app.post('/api/register', userController.registerUser);
  app.post('/api/log', logController.logFrontendEvent);

  app.post('/api/login', function (req, res) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        res.status(200).json({ email: user.email });
      } else {
        res.status(401).send(info);
      }
    })(req, res);
  });

  return app;
}

module.exports = createServer;
