var msbuild = require('gulp-msbuild');
var object = require('lodash/object');

module.exports = function (config) {
  var packageConfig = getPackageConfig(config);
  return msbuild(packageConfig);
};

function getPackageConfig(config) {
  var defaultConfig = {
    stdout: true,
    toolsVersion: 12,
    targets: ['Package'],
    properties: {
      outdir: '../+staging',
      DeployEncryptKey: 'test1',
      IncludeAppPool: true,
      IncludeAppPool: true,
      IncludeIisSettings: true,
      DestinationIisVersion: 8,
      UseMsdeployExe: true
    }
  };

  //Override default config with the config defined in inheriting gulp file
  //Very hacky - but good enough to get it going
  return object.merge(defaultConfig, config, config.staging);
};
