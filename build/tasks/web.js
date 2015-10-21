var gulp = require("gulp");
var express = require('express');

var app = express();
app.use(express.static('app'));

gulp.task("web", ["build-watch"], function() {
    app.listen(3000, function() {
        console.log("listening on port 3000");
    });
});
