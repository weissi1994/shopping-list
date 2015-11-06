var gulp = require("gulp");

var settings = require("../settings");
var webserver = require("../webserver");

gulp.task("web", ["build-watch"], () => {
    webserver.start(settings.output.path, settings.web.port);
});
