var through = require('through2');
var plug = require('gulp-load-plugins')();
var object = require('lodash/object');
var exec = require('child_process').exec;

var log = plug.util.log;

var build = require('./libs/build');
var stage = require('./libs/stage');

module.exports = function (gulp, config) {

  build(gulp, config);
  stage(gulp, config);

  function deployWebApp(config) {

    var stream = through.obj(function (file, enc, callback) {
      var self = this;
      if (file.isNull()) {
        self.push(file);
        return callback();
      }

      var pathname = file.path;

      var command = [
        'powershell',
        pathname,
        config.whatif ? '/T' : '/Y',
        '/M:' + config.remoteComputer
      ].join(' ');

      log(command);

      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    });

    return stream;
  };

  gulp.task('deployWebApp', function () {
    return gulp.src(config.deployment.artifactsDir + '/*.cmd')
      .pipe(deployWebApp(config.deployment));
  });
};
