const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
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

	connection.query('SELECT * FROM users WHERE email = ?',
		[email], (err, result) => {
			if(err) throw err;

			const passwordValid = bcrypt.compareSync(password, result[0].password);
			if (passwordValid) {
				const role = result[0].role;
				switch(role){
				case('Developer'): res.redirect('/developer');
					break;
				case('Manager'): res.redirect('/manager');
					break;
				default: res.send('<h1><b>Error</b></h1>');
				}

				const token = jwt.sign({id: result[0].ID}, 'protection', {
					expiresIn: 86400
				});
				console.log(token);
			} else res.send('<h1>password invalid');
		});
};

module.exports = Controller;