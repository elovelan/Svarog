var msbuild = require("gulp-msbuild");
var plug = require('gulp-load-plugins')();

var log = plug.util.log;

module.exports = function (gulp, config) {
  var config = config;

  gulp.task("buildSolution", function () {
    var solutionPath = config.solutionPath || './*.sln';
    log('Building ' + solutionPath);
    return gulp.src(solutionPath)
      .pipe(msbuild(config));
  });
};
