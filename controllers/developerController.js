const session = require('express-session');

const Controller = function(){};

Controller.developer = async function(req, res){
	if(session.role === 'Developer'){
		res.render('developer');
	} else res.send('access danied');
};

module.exports = Controller;