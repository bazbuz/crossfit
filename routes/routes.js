/*
//  Vehicles
*/

module.exports = function (app) {
    var util = require("util");
    var fs = require('fs');
    var http = require('http');
    //var expressValidator = require('express-validator');
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
                    "body":         [],
                    "breadcrumb" : [],
                    "errors":[]
                });
         });
    });
    app.post("/addwod", function (req, res) {

            req
                .assert('instructor', 'An instructor is required.')
                .notEmpty();
            req
                .assert('date','A date is required.')
                .isDate();
            
            //  If there aren't any errors and we've got here then email a confirmation and send
            //  the user to the confirmation message
            var errors = req.validationErrors(true);
            
            if(errors)
            {
                console.log(errors);
                res.render("addwod", {
                    "results":      items,
                    "title":        "Add WOD",
                    "body":         req.body,
                    "breadcrumb" : [],
                    "errors":errors
                });
                res.send('There have been validation errors: ' + util.inspect(errors), 400);
                return;
            }
            else
            {

                console.log(req.body.date);
                result = {};
                result.instructor = req.body.instructor;
                console.log(req.body.date);
                result.classDate = new Date(req.body.date).getTime();

                result.wod = {};
                result.wod.repetitions = req.body.wodstructurecount + " " + req.body.wodstructure;
                result.wod.exercises = [];
             //I want to parse the body to get the details. 
                 //I need to add the wod details.
                 var exercises = req.body.exercise;
                 var reps = req.body.reps;
                 var wodItems = [];
                for(var i=0;i<exercises.length;i++)
                {
                    //I want to add each of the members to this wod
                    if(exercises[i] != "")
                    {
                        var exerciseItem = {
                            exercise:exercises[i],
                            reps:reps[i]
                        }
                        result.wod.exercises.push(exerciseItem);
                    }
                 }
                 
                 var memberNames = req.body.memberName;
                 var memberTimes = req.body.memberTime;
                 
                 result.results = []
                 for(var i=0;i<memberNames.length;i++)
                 {
                    //I want to add each of the members to this wod
                    var memberItem = {
                        memberId:memberNames[i],
                        result:memberTimes[i]
                    }
                    result.results.push(memberItem);
                 }
                 console.log(result);
                 //I want to see what the result looks like.
                res.redirect('/');
             }//This the end of the else for validation
             //I want to redirect back to the WOD page
          
    });
     /* This is to get further offers when the  user clicks on the more offers link*/
 
};
