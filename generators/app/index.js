'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var generator = {};
var prompts = [{
	type: 'input',
	name: 'projectname',
	message: 'The name of your library/plugin',
	default: this.appname
}, {
	type: 'input',
	name: 'version',
	message: 'The version to start with',
	default: '0.0.1'
}, {
	type: 'input',
	name: 'description',
	message: 'Describe your project'
}, {
	type: 'input',
	name: 'author',
	message: 'Who is the author?'
}];

generator.constructor = function(){
	//call super
 	yeoman.generators.Base.apply(this, arguments);
};

generator.prompting = function(){
	var done = this.async();
	this.prompt(prompts, function(properties){
			this.projectname = properties.projectname;
			this.version = properties.version;
			this.description = properties.description;
			this.author = properties.author;
    	done();
	}.bind(this));
};

generator.generate = function(){

  this.mkdir('dist');
  this.mkdir('docs');

  this.mkdir('src');
  this.mkdir('src/lib');

  this.template('_bower.json', 'bower.json');
  this.template('_gulpfile.js', 'gulpfile.js');
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');  

  this.copy('gitignore', '.gitignore');
  this.template('src/_main.js', 'src/main.js');

  this.write('dist/'+this.projectname+'.js', '');
  this.write('dist/'+this.projectname+'.min.js', '');

  this.write('docs/MAIN.md', '');
 	var geo = this;
  this.installDependencies({
  	callback: function(){
  	geo.spawnCommand('gulp', ['build']);
  	}
  }); 
};

 module.exports = yeoman.generators.Base.extend(generator);