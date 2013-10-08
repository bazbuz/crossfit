/*
//  Routes Loader
//      /routes/index.js
*/

//  Require access to the filesystem
var	fs = require('fs');

module.exports = function (app) {
    
    fs.readdirSync(__dirname).forEach(function (file) {
        // Don't re-load index.js or any file that isn't a .js file
        if (file === 'index.js' || file.substr(file.lastIndexOf('.') + 1) !== 'js') 
            return;
        var name = file.substr(0, file.indexOf('.'));

        // Require the individual route files
        require('./' + name)(app);
    });

}
