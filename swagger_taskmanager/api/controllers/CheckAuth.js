'use strict';
const connection = require('../../../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	CheckAuth: CheckAuth
};

function CheckAuth(req, res){
	const loginEmail = req.swagger.params.login.value.email;
	const loginPassword = req.swagger.params.login.value.password;

	connection.query('SELECT * FROM users WHERE email = ?',
		[loginEmail], (err, result) => {
			res.header('Content-Type', 'application/json');
			if (err) {
				res.end(JSON.stringify(err));
			} else {
				result.push(checkRole(result), getToken(result), isValidPassword(result, loginPassword));
				res.end(JSON.stringify(result));
			}
		});
}

function checkRole(result){
	const role = result[0] && result[0].role || '';

	if(!role){
		return 'checkRole: ' + false;
	}else{
		return 'checkRole: ' + '/' + role;
	}
}

function getToken(result){
	const userId = result[0] && result[0].ID || '';
	const email = result[0] && result[0].email || '';
	if(!userId || !email){
		return 'jwt: ' + false;
	} else {
		return 'jwt: ' + jwt.sign(
			{
				userId: userId,
				email: email
			},
			'protection',
			{
				expiresIn: '1h'
			});
	}
}

function isValidPassword(result, loginPassword){
	const dbPassword = result[0] && result[0].password || '';
	const isValidPassword = bcrypt.compareSync(loginPassword, dbPassword);

	if (!isValidPassword) {
		return 'isValidPassword: ' + false;
	}else{
		return 'isValidPassword:' + true;
	}
}