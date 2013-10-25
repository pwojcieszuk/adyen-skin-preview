
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var consolidate = require('consolidate');
var Handlebars = require("handlebars");
var fs = require("fs");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.engine("html", consolidate.handlebars);
app.set("view engine", "html");
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'views/skin')));
app.use(express.static(path.join(__dirname, 'default')));


/*
*	registers handkebars partials from .txt files in a directory
*   not very bulletproof
*/
var getPartialsFromDir = function (dirpath) {
	fs.readdirSync(dirpath).forEach(function (file) {
	    var source = fs.readFileSync(path.join(dirpath, file), "utf8");
	    var regex = /(.+)\.txt/;
	    if (regex.exec(file)) {
	    	partial = regex.exec(file).pop();
	    	Handlebars.registerPartial(partial, source);
	    }
	});
};

// Register partials
var partials = "./views/skin/";
fs.readdirSync(partials).forEach(function (dir) {
	var dirpath = path.join(partials, dir);
	getPartialsFromDir(dirpath);
});

var partials = "./default/partials";
getPartialsFromDir(partials);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
