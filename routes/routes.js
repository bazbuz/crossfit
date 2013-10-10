/*
//  Vehicles
*/

module.exports = function (app) {
    var fs = require('fs');
    var http = require('http');

    var url         = require("url");
     
/*app.get("*.less", function(req, res) {
    var path = __dirname + req.url;
    console.log(path);
    fs.readFile(path, "utf8", function(err, data) {
    if (err) throw err;
    less.render(data, function(err, css) {
            if (err) throw err;
            console.log(css);
            res.header("Content-type", "text/css");
            res.send(css);
    });
    });
});
*/
     app.get("/", function (req, res) {
        wods.find().toArray(function(err,results)
        {
            console.log(results);
            //console.log(results.items.length);
            //console.log(results.items);
             res.render("index", {
                    "results":     results,
                    "title":        "Crossfit Coventry",
                    "breadcrumb" : []
                });


        });
    });
     /* This is to get further offers when the  user clicks on the more offers link*/
 
};
