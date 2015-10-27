var gulp = require("gulp");
var express = require('express');

var settings = require("../settings");

var app = express();
app.use(express.static(settings.output.path));

gulp.task("web", ["build-watch"], function() {
    var server = app.listen(settings.web.port, function() {
        var address = server.address();

        console.log("express server started at");
        console.log('http://localhost:%s', address.port);
    });
});
