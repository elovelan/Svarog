var through = require('through2');
var msbuild = require('gulp-msbuild');
var exec = require('child_process').exec;

module.exports = function (gulp, config) {

  gulp.task('svarogDeployWebApp', function () {
    return gulp.src(config.deployment.artifactsDir + '/*.cmd')
      .pipe(deployWebApp(config.deployment));
  });

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

      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
      });
    });

    return stream;
  };
};