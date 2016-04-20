'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the spectacular ' + chalk.red('generator-azurewebjobs') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: 'defaultname'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someAnswer;

      done();
    }.bind(this));
  },

  writing: function () {
    fs.readdir(this.templatePath(), (err, items) => {
      if (err) {
        throw err;
      }
      var jobname = this.props.someAnswer;
      console.log(items);
      items.forEach(file => {
        if (file === '.deployment') {
          this.fs.copy(
            this.templatePath(file),
            this.destinationPath(file)
          );
        } else {
          this.fs.copyTpl(
            this.templatePath(file),
            this.destinationPath(`App_Data/jobs/triggered/${jobname}/${file}`),
            {name: jobname}
          );
        }
      });
    });
  },

  install: function () {
    this.installDependencies();
  }
});
