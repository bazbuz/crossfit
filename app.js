/*
//  Codename: Bangers
//      Direct Sales Channel for 'Cheap' New Cars
*/

/*
//  Module Dependencies
//      For further information on these and any other packages, you can 
//      simply head to npmjs.org and look up the package - for example, for 
//      underscore, go to https://npmjs.org/package/underscore
*/

var http                = require('http'),
    path                = require('path');

var express             = require('express');

//  TODO:   Switch to using Swig instead of Jade at some point. Not urgent.

var mongo               = require('mongodb');

var routes              = require('./routes'),
 lessMiddleware         = require("less-middleware"),
 moment                 = require('moment');;

/*
//  Configuration
//      See http://s.phuu.net/12PFa6J by Tom Ashworth (@phuunet)
*/

var configFile;
try {
    configFile = require('./config.json');
}
catch (err) {
    console.log(err);
    configFile = {};
}

//  Configure by using process environment variables first, falling back to the 
//  configuration file (config.json) if it exists, finally falling back to 
//  sensible defaults for local development environments.

var config = {
    "port":   
                    configFile.port ||
                    5000,

    "dbHostname": 
                    configFile.dbHostname ||
                    "localhost",
    "dbPort":       process.env.DB_PORT ||
                    configFile.dbPort ||
                    27017,
    "dbDatabase":  
                    configFile.dbDatabase ||
                    "test",
    "dbUsername":  
                    configFile.dbUsername ||
                    "",
    "dbPassword":   
                    configFile.dbPassword ||
                    ""
}

console.log(config);

/*
//  Database Configuration
*/

var db = new mongo.Db(
    config.dbDatabase,
    new mongo.Server(
        config.dbHostname,
        config.dbPort,
        {
            auto_reconnect: true
        }
    ),
    /* No write acknowledgement needed just yet - we're not writing anything (are we?) */
    {
        w: 0
    }
);

//  Open the Database
db.open(function (openErr, openData) {

    if (openData) {
        openData.authenticate(
            config.dbUsername, 
            config.dbPassword,
            function (authErr, authData) {
                if (authData) {
                    console.log("Database: Connected.");
                }
                else {
                    console.log(authErr);
                }
            }
        );
    }
    else {
        console.log(openErr);
    }
});

//  The whole thing falls over if vehicles is var'd here, which makes me think 
//  that this does not belong here and is possibly being called out of scope.
wods = db.collection("wods");
members = db.collection("members");


/*
//  Express Configuration
*/

var app = express();

//  All Environments
app.set("port", config.port);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.favicon());
// app.use(express.cookieParser(/* 'some secret string goes here' */));
// app.use(express.cookieSession());
// app.use(express.compress()); // Compresses responses with gzip/deflate
// app.use(express.csrf()); // Cross Site Request Forgery Protection
//  Express Routing

app.use(lessMiddleware({
    force: true,
       dest: __dirname + '/public/css', // should be the URI to your css directory from the location bar in your browser
        src: __dirname + '/public/less', // or '../less' if the less directory is outside of /public
        prefix:'/css',
        compress: true,
        debug:true
}));
//This needs to be after the middleware declaration above
app.use(express.static(__dirname + "/public"));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);



//  Development-only Configuration
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}
else {
    app.use(function errorHandler (err, req, res, next) {
        res.status(500);       
        res.render(
            'error', 
            { 
                error: err 
            }
        );
    });
}

/*
//  Routing
*/

routes(app);

/*
//  Start the HTTP Server
*/

http
    .createServer(app)
    .listen(
        app.get('port'), 
        function () {
            console.log("Express server listening on port " + app.get('port'));
        }
    );
