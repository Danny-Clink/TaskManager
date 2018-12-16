const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const session = require('express-session');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'taskmanager'
});

const Controller = function(){};

Controller.checkAuth = function(req, res){
	const email = req.body.loginEmail;
	const password = req.body.loginPassword;
	session.email = email;

	connection.query('SELECT * FROM users WHERE email = ?',
		[email], (err, result) => {
			if(err) throw err;

			const passwordValid = bcrypt.compareSync(password, result[0].password);
			if (passwordValid) {
				const role = result[0].role;
				session.role = role;
				switch(role){
				case('Developer'): res.redirect('/developer');
					break;
				case('Manager'): res.redirect('/manager');
					break;
				default: res.send('<h1><b>Error</b></h1>');
					break;
				}

				const token = jwt.sign(
					{
						userId: result[0].ID,
						email: result[0].email
					},
					process.env.JWT_KEY,
					{
						expiresIn: '1h'
					});
				session.token = token;
			} else res.send('<h1>invalid password ');
		});
};

module.exports = Controller;