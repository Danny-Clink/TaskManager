'use strict';
const connection = require('../../../database/database');
const bcrypt = require('bcrypt');

module.exports = {
	Register: Register
};

function Register(req, res){
	const username = req.swagger.params.register.value.username;
	const email = req.swagger.params.register.value.userEmail;
	const role = req.swagger.params.register.value.userRole;
	const password = req.swagger.params.register.value.userPassword;
	const confirmPassword = req.swagger.params.register.value.userConfirmPassword;

	if(password === confirmPassword){
		connection.query('SELECT true FROM users WHERE email = ? LIMIT 1',
			[email], (err, result) => {
				if(err) throw err;

				if(result.length === 0){
					const hashedPassword = bcrypt.hashSync(password, 8);
					connection.query('INSERT INTO users (username, email, role, password) VALUES(?, ?, ?, ?)',
						[username, email, role, hashedPassword], (err) => {
							if(err) throw err;
							res.end('user created');
						});
				} else res.end(JSON.stringify('email is already extist'));
			});
	}
}