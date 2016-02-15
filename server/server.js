'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var HeartQuery = require('./heartbeat-query.js');
var HeartBeat = require('./heartbeat.js');

function createServer(connection) {
	var queries = new HeartQuery(connection);
	var heartController = new HeartBeat(queries);

	var app = express();
	app.use(bodyParser.json());

	var route = path.join(__dirname, '..', 'public');
	app.use(express.static(route));

	app.get('/heartbeat', heartController.getStatus);

	return app;
}

module.exports = createServer;
