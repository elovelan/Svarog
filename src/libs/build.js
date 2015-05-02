var msbuild = require('gulp-msbuild');

module.exports = function (gulp, config) {
  gulp.task('svarogBuildSolution', function () {
    var solutionPath = config.solutionPath;
    return gulp.src(solutionPath)
      .pipe(msbuild(config));
  });
};
