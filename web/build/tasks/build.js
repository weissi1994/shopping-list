var gulp = require('gulp');
var babel = require('gulp-babel');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var webpack = require('gulp-webpack');

var settings = require("../settings");

var dependenciesToCopyToDeploymentPath = [
    "node_modules/mithril/mithril.js",
    settings.source.path + "index.html",
];

gulp.task("dependencies", function () {
	return gulp.src(dependenciesToCopyToDeploymentPath)
		.pipe(gulp.dest(settings.output.path));
});

gulp.task("es6", function () {
	return gulp.src(settings.source.path + "modules/**/*.js")
		.pipe(babel())
		.pipe(gulp.dest(settings.output.path + "modules"));
});

gulp.task("styles", function () {
	return gulp.src(settings.source.path + "styles/init.styl")
        .pipe(stylus())
        .pipe(rename("styles.css"))
		.pipe(gulp.dest(settings.output.path));
});

gulp.task("modules", ["es6"], function() {
    return gulp.src(settings.output.path + "modules/router/router.js")
        .pipe(webpack({
            output: {
                filename: settings.output.filename,
            },
        }))
        .pipe(gulp.dest(settings.output.path));
});

gulp.task("build", ["dependencies", "styles", "modules"]);

gulp.task("build-watch", ["build"], function() {
    gulp.watch(dependenciesToCopyToDeploymentPath, ["dependencies"]);
    gulp.watch(settings.source.path + "**/*.styl", ["styles"]);
    gulp.watch(settings.source.path + "**/*.js", ["modules"]);
});
