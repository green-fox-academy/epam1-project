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

  passport.serializeUser(function (user, cb) {
    cb(null, user.email);
  });

  passport.deserializeUser(function (email, done) {
    userController.findUser(email, function (err, user) {
      done(err, user);
      console.log(err);
    });
  });

  var app = express();
  app.use(logController.logRequest);
  app.use(bodyParser.json());
  app.use(require('cookie-parser')());
  app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  var route = path.join(__dirname, '..', 'public');
  app.use(express.static(route));

  app.get('/heartbeat', heartController.getStatus);
  app.get('/api/users', userController.getAllUser);
  app.post('/api/register', userController.registerUser);
  app.put('/api/users', userController.updateUserAdmin);
  app.post('/api/log', logController.logFrontendEvent);
  app.get('/api/user/isloggedin', function (req, res) {
    res.status(200).send(req.isAuthenticated());
  });

  app.post('/api/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        req.logIn(user, function (err) {
          if (err) return next(err);
          return res.status(200).json({
            email: user.email,
            id: user.id,
            admin: user.admin, });
        });
      } else {
        res.status(401).send(info);
      }
    })(req, res, next);
  });

  app.get('/api/logout', function (req, res) {
    if (!req.isAuthenticated()) {
      res.status(500).send('Nobody logged in');
    } else {
      req.logout();
      res.status(200).send('Successful logout');
    }
  });

  return app;
}

module.exports = createServer;
