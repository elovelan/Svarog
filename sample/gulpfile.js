var gulp = require('gulp');
var svarog = require('../');

var buildConfig = {
  stdout: true,
  toolsVersion: 12,
  solutionPath: './SampleWebApp.sln',
  nugetPath: './.nuget/nuget.exe',
  staging: {
    webProjectPath: './SampleWebApp/SampleWebApp.csproj',
    properties: {
      dir: '../+staging',
      encryptionKey: 'Test123'
    }
  },
  deployment: {
    whatif: true,
    remoteComputer: 'localhost',
    artifactsDir: './+staging/_PublishedWebsites/SampleWebApp_Package/'
  }
};

var paramValues = {
  "debug": "false"
};

gulp.task('build', function () {
  var solutionPath = buildConfig.solutionPath;
  return gulp.src(solutionPath)
    .pipe(svarog.nugetRestore(buildConfig))
    .pipe(svarog.build(buildConfig));
});

gulp.task('stage', function () {
  return gulp.src(buildConfig.staging.webProjectPath)
    .pipe(svarog.stage(buildConfig))
});

gulp.task('deploy', function () {
  return gulp.src(buildConfig.deployment.artifactsDir + '/*')
    .pipe(svarog.setParams(paramValues))
    .pipe(svarog.deploy(buildConfig.deployment));
});
