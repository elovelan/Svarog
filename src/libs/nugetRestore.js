var through = require('through2');
var execSync = require('child_process').execSync;

module.exports = function (config) {
  var stream = through.obj(function (file, enc, callback) {
    var self = this;
    if (file.isNull()) {
      self.push(file);
      return callback();
    }

    var pathname = file.path;

    var command = [
        'powershell',
        config.nugetPath,
        'restore',
        pathname
      ].join(' ');

    var history = execSync(command);
    process.stdout.write(history);

    this.push(file);
    callback();
  });

  return stream;
};
