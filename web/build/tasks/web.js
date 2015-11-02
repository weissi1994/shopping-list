var gulp = require("gulp");
var express = require('express');
var os = require("os");

var settings = require("../settings");

var app = express();
app.use(express.static(settings.output.path));

gulp.task("web", ["build-watch"], function() {
    var server = app.listen(settings.web.port, function() {
        var address = server.address();
        var ip = os.networkInterfaces()['eth0'][0]['address'];

        console.log("web server started at");
        console.log('http://%s:%s', ip, address.port);
    });
});
