'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var config = require('./config.js');
var HeartQuery = require('./heartbeat/heartbeat-query.js');
var HeartBeat = require('./heartbeat/heartbeat.js');
var UserController = require('./user_controller.js');
var UserQueries = require('./user_queries.js');
var LogController = require('./log_controller.js');

function createServer(connection) {
  var heartQuery = new HeartQuery(connection);
  var userQueries = new UserQueries(connection);
  var heartController = new HeartBeat(heartQuery);
  var userController = new UserController(userQueries);
  var logController = new LogController();
  var app = express();

  var route = path.join(__dirname, '..', 'public');

  passport.use(new Strategy(config.PASSPORT_CONFIG, userController.authenticateUser));
  passport.serializeUser(userController.serialize);
  passport.deserializeUser(userController.deserialize);

  app.use(logController.logRequest);
  app.use(bodyParser.json());
  app.use(express.static(route));
  app.use(cookieParser());
  app.use(expressSession(config.EXPRESS_SESSION_CONFIG));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/heartbeat', heartController.getStatus);
  app.post('/api/log', logController.logFrontendEvent);
  app.get('/api/users', userController.getAllUser);
  app.put('/api/users', userController.updateUserAdmin);
  app.post('/api/register', userController.registerUser);
  app.get('/api/user', userController.getLoggedInUser);
  app.get('/api/logout', userController.sessionLogout);

  app.post('/api/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        req.logIn(user, function (err) {
          if (err) return next(err);
          return res.status(200).json({
            email: user.email,
            admin: user.admin,
          });
        });
      } else {
        res.status(401).send(info);
      }
    })(req, res, next);
  });

  return app;
}

module.exports = createServer;
