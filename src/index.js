var msbuild = require("gulp-msbuild");
var plug = require('gulp-load-plugins')();
var object = require('lodash/object');

var log = plug.util.log;

module.exports = function (gulp, config) {
  var config = config;

  gulp.task("buildSolution", function () {
    var solutionPath = config.solutionPath || './*.sln';
    log('Building ' + solutionPath);
    return gulp.src(solutionPath)
      .pipe(msbuild(config));
  });

  gulp.task('stageWebArtifacts', function () {

    var stagingConfig = getStagingConfig(config);

    return gulp.src(stagingConfig.webProjectPath)
      .pipe(msbuild(stagingConfig))
  });

  function getStagingConfig(config) {
    var defaultStagingConfig = {
      stdout: true,
      toolsVersion: 12,
      targets: ['Package'],
      properties: {
        outdir: '../+staging',
        DeployEncryptKey: 'test1',
        IncludeAppPool: true,
        IncludeAppPool: true,
        IncludeIisSettings: true,
        DestinationIisVersion: 8,
        UseMsdeployExe: true
      }
    };

    //Override default config with the config defined in inheriting gulp file
    //Very hacky - but good enough to get it going
    return object.merge(defaultStagingConfig, config, config.staging);
  }
};
