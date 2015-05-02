var gulp = require('gulp');
var svarog = require('svarog');

var buildConfig = {
  stdout: true,
  toolsVersion: 12,
  solutionPath: './SampleWebApp.sln'
};

svarog(gulp, buildConfig);

gulp.task('build', ['buildSolution'], function () {});
