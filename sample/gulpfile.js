var gulp = require('gulp');
var svarog = require('../');

var buildConfig = {
  stdout: true,
  toolsVersion: 12,
  solutionPath: './SampleWebApp.sln',
  nugetPath: './.nuget/nuget.exe',
  package: {
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

gulp.task('package', function () {
  return gulp.src(buildConfig.package.webProjectPath)
    .pipe(svarog.package(buildConfig))
});

gulp.task('deploy', function () {
  return gulp.src(buildConfig.deployment.artifactsDir + '/*')
    .pipe(svarog.setParams(paramValues))
    .pipe(svarog.deploy(buildConfig.deployment));
});
