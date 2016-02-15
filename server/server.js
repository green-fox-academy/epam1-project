'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

function createServer() {

	var app = express();
	app.use(bodyParser.json());

	var route = path.join(__dirname, '..', 'public');
	app.use(express.static(route));

	return app;
}

module.exports = createServer;
