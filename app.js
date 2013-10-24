
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

// Register partials
var partials = "./views/skin/";
fs.readdirSync(partials).forEach(function (dir) {
	var dirname = path.join(partials, dir);
    fs.readdirSync(dirname).forEach(function (file) {
	    var source = fs.readFileSync(path.join(dirname, file), "utf8");
	    var regex = /(.+)\.txt/;
	    if (regex.exec(file)) {
	    	partial = regex.exec(file).pop();
	    	Handlebars.registerPartial(partial, source);
	    }
	});
});

var partials = "./default/partials";
fs.readdirSync(partials).forEach(function (file) {
    var source = fs.readFileSync(path.join(partials, file), "utf8");
    var regex = /(.+)\.txt/;
    if (regex.exec(file)) {
    	partial = regex.exec(file).pop();
    	Handlebars.registerPartial(partial, source);
    }
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
