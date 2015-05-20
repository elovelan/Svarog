var build = require('./libs/build');
var nugetRestore = require('./libs/nugetRestore');
var stage = require('./libs/stage');
var deploy = require('./libs/deploy');
var setParams = require('./libs/setParams');

module.exports = {
  build: build,
  nugetRestore: nugetRestore,
  stage: stage,
  deploy: deploy,
  setParams: setParams
};
