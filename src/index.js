var build = require('./libs/build');
var stage = require('./libs/stage');
var deploy = require('./libs/deploy');

module.exports = function (gulp, config) {
  build(gulp, config);
  stage(gulp, config);
  deploy(gulp, config);
};
