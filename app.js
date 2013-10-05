
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var config ={
	dbDatabase:"crossfit",
	dbHostname:"ds031968.mongolab.com",
	dbPort:31968,
	dbUsername:"barry",
	dbPassword:"joseph"
};

var mongo = require('mongodb');

var db = new mongo.Db(
	config.dbDatabase,
	new mongo.Server(
		config.dbHostname,
		config.dbPort,
		{
			autoreconnect:true
		}),
		{
			w:0
		}
	);
db.open(function(openErr,openData){
	if(openData){
		openData.authenticate(
			config.dbUsername,
			config.dbPassword,
			function(authErr,authData){
				console.log("Database:connected");
			});
	}
});

var crossfit = db.collection("crossit");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
