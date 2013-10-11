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
     app.get("/addwod", function (req, res) {
        members.find().toArray(function(err,items){
            if(err)
            {
                console.log(err);
            }
            console.log(items);
             res.render("addwod", {
                    "results":      items,
                    "title":        "Add WOD",
                    "breadcrumb" : []
                });
         });
    });
    app.post("/addwod", function (req, res) {
             //I want to parse the body to get the details. 
             var instructor = req.body.instructor;
             console.log(instructor);
             var date = new Date(req.body.date).getTime();
             console.log(date);
             //I need to add the wod details.
             var exercises = req.body.exercise;
             var reps = req.body.reps;
             var wodItems = [];
            for(var i=0;i<exercises.length;i++)
            {
                //I want to add each of the members to this wod
                if(exercises[i] != "")
                {
                    var result = {
                        exercise:exercises[i],
                        reps:reps[i]
                    }
                    wodItems.push(result);
                }
             }
             console.log(wodItems);
             //This is the results part to add member results
             var memberNames = req.body.memberName;
             var memberTimes = req.body.memberTime;
             
             var memberResults = [];
             for(var i=0;i<memberNames.length;i++)
             {
                //I want to add each of the members to this wod
                var result = {
                    memberId:memberNames[i],
                    result:memberTimes[i]
                }
                memberResults.push(result);
             }
             console.log(memberResults);
             //This will be the array of items for the times

             //If succesfull I want to redirect to the index page to show the wod.

    });
     /* This is to get further offers when the  user clicks on the more offers link*/
 
};
