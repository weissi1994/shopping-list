var gulp = require('gulp');
var tsc = require('gulp-typescript');

var deploymentPath = "app";
var dependenciesToCopyToDeploymentPath = [
    "node_modules/mithril/mithril.js",
];

gulp.task("dependencies", function () {
	gulp.src(dependenciesToCopyToDeploymentPath)
		.pipe(gulp.dest(deploymentPath));
});

gulp.task("typescript", function () {
	gulp.src("src/app.ts")
		.pipe(tsc({
            out: "app.js"
        }))
		.pipe(gulp.dest(deploymentPath));
});

gulp.task("html", function () {
	gulp.src("src/**/*.html")
		.pipe(gulp.dest(deploymentPath));
});

gulp.task("styles", function () {
	gulp.src("src/**/*.css")
		.pipe(gulp.dest(deploymentPath));
});

gulp.task("build", ["dependencies", "html", "styles", "typescript"]);

gulp.task("build-watch", ["build"], function() {
    gulp.watch(dependenciesToCopyToDeploymentPath, ["dependencies"]);
    gulp.watch("src/**/*.html", ["html"]);
    gulp.watch("src/**/*.css", ["styles"]);
    gulp.watch("src/**/*.ts", ["typescript"]);
});
