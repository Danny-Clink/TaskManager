const Controller = function(){};

Controller.manager = function(req, res){
	res.render('manager');
	console.log('jwt: ' + req.body.token);
};

module.exports = Controller;