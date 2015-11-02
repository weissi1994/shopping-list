var express = require("express");
var settings = require("./build/settings");

var app = express();
app.use(express.static(settings.output.path));

var server = app.listen(settings.web.port, function() {
	var address = server.address();

	console.log("express server started at");
	console.log('http://localhost:%s', address.port);
});
