'use strict';

require('newrelic');
var config = require('./server/config.js');
var createServer = require('./server/server.js');
var Connection = require('./server/connection.js');
var connection = new Connection();

var app = createServer(connection);

app.listen(config.DEFAULT_PORT, function () {
  console.log('Listening on port ' + config.DEFAULT_PORT + '...');
});
