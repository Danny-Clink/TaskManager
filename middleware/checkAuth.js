const jwt = require('jsonwebtoken');
const session = require('express-session');

module.exports = (req, res, next) => {
	try{
		jwt.verify(session.token, 'protection');
		next();
	} catch(error){
		res.send('err verify');
	}

};