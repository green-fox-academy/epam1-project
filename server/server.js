'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var HeartQuery = require('./heartbeat/heartbeat-query.js');
var HeartBeat = require('./heartbeat/heartbeat.js');
var Logger = require('./log.js');

function createServer(connection) {
  var queries = new HeartQuery(connection);
  var heartController = new HeartBeat(queries);
  var logger = new Logger();

  var app = express();
  app.use(logger.logRequest);
  app.use(bodyParser.json());

  var route = path.join(__dirname, '..', 'public');
  app.use(express.static(route));

  app.get('/heartbeat', heartController.getStatus);

  return app;
}

module.exports = createServer;
