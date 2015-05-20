var build = require('./libs/build');
var nugetRestore = require('./libs/nugetRestore');
var package = require('./libs/package');
var deploy = require('./libs/deploy');
var setParams = require('./libs/setParams');

module.exports = {
  build: build,
  nugetRestore: nugetRestore,
  package: package,
  deploy: deploy,
  setParams: setParams
};
