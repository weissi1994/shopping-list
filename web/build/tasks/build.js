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

gulp.task("bootstrap-fonts", () => gulp
    .src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap/dist/css/bootstrap-theme.min.css",
    ])
	.pipe(gulp.dest(settings.output.path + "css"))
);

gulp.task("bootstrap-css", () => gulp
    .src("node_modules/bootstrap/dist/fonts/*.*")
	.pipe(gulp.dest(settings.output.path + "fonts"))
);

gulp.task("dependencies", ["bootstrap-css", "bootstrap-fonts"], () => gulp
    .src(dependenciesToCopyToDeploymentPath)
	.pipe(gulp.dest(settings.output.path))
);

gulp.task("es6", () => gulp
    .src(settings.source.path + "modules/**/*.js")
	.pipe(babel())
	.pipe(gulp.dest(settings.output.binpath + "modules"))
);

gulp.task("styles", () => gulp
    .src(settings.source.path + "styles/init.styl")
    .pipe(stylus())
    .pipe(rename("styles.css"))
	.pipe(gulp.dest(settings.output.path + "css"))
);

gulp.task("modules", ["es6"], () => gulp
    .src(settings.output.binpath + "modules/router/router.js")
    .pipe(webpack({
        output: {
            filename: settings.output.filename,
        },
    }))
    .pipe(gulp.dest(settings.output.path))
);

gulp.task("build", ["dependencies", "styles", "modules"]);

gulp.task("build-watch", ["build"], () => {
    gulp.watch(dependenciesToCopyToDeploymentPath, ["dependencies"]);
    gulp.watch(settings.source.path + "styles/**/*.styl", ["styles"]);
    gulp.watch(settings.source.path + "modules/**/*.js", ["modules"]);
});
