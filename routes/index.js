
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Crossfit' });
};
exports.results = function(req,res) {
	console.log('results page');
};