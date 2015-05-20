var through = require('through2');
var xmlpoke = require('xmlpoke');
var _ = require('lodash/collection');

module.exports = function (values) {
  var stream = through.obj(function (file, enc, callback) {
    var self = this;
    if (file.isNull() || file.path.toLowerCase().indexOf('setparameters.xml') === -1) {
      self.push(file);
      return callback();
    }

    var pathname = file.path;

    xmlpoke(pathname, function (xml) {
      var base = xml.withBasePath('parameters')

      console.log('--------------------------');
      console.log('Starting XML Poking');
      console.log();

      _.forEach(values, function (value, name) {
        console.info("> Setting '" + name + "' to '" + value + "'");

        var xmlPath = "setParameter[@name='" + name + "']/@value";
        base.set(xmlPath, value)
      });

      console.log('--------------------------');
    });

    this.push(file);
    callback();
  });

  return stream;
};
