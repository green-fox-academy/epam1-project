'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var HeartQuery = require('./heartbeat/heartbeat-query.js');
var HeartBeat = require('./heartbeat/heartbeat.js');
var logger = require('./log.js')();
var UserController = require('./user_controller.js');
var UserQueries = require('./user_queries.js');

function createServer(connection) {
  var heartQuery = new HeartQuery(connection);
  var userQueries = new UserQueries(connection);
  var heartController = new HeartBeat(heartQuery);
  var userController = new UserController(userQueries);

  var app = express();
  app.use(function (req, res, next) {
    logger.message('info', `NEW REQUEST, method=${req.method}, url=${req.originalUrl}`);
    next();
  });

  app.use(bodyParser.json());

  var route = path.join(__dirname, '..', 'public');
  app.use(express.static(route));

  app.get('/heartbeat', heartController.getStatus);

  app.post('/api/register', userController.registrateUser);

  return app;
}

module.exports = createServer;
