var gulp = require('gulp');
var svarog = require('svarog');

var buildConfig = {
  stdout: true,
  toolsVersion: 12,
  solutionPath: './SampleWebApp.sln',
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

svarog(gulp, buildConfig);

gulp.task('build', ['buildSolution'], function () {});

gulp.task('stage', ['stageWebArtifacts'], function () {});

gulp.task('deploy', ['deployWebApp'], function () {});