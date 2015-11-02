var express = require("express");
var settings = require("./build/settings");
var os = require("os");

var app = express();
app.use(express.static(settings.output.path));

var server = app.listen(settings.web.port, function() {
	var address = server.address();
	var ip = os.networkInterfaces()['eth0'][0]['address'];

	console.log("express server started at");
	console.log('http://%s:%s', ip, address.port);
});
