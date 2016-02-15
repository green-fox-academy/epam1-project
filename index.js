'use strict';


var config = require('./server/config.js');
var createServer = require('./server/server.js');

var app = createServer();

app.listen(config.DEFAULT_PORT, function() {
	console.log('Listening on port ' + config.DEFAULT_PORT + '...');
});
