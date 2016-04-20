'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-azurewebjobs:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({someAnswer: 'test'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'App_Data/jobs/triggered/test/app.js',
      'App_Data/jobs/triggered/test/deploy.sh',
      'App_Data/jobs/triggered/test/package.json',
      'App_Data/jobs/triggered/test/settings.job',
      '.deployment'
    ]);
  });
});
