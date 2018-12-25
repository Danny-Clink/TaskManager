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

class Login{

	checkAuth(req, res){
		const {loginEmail, loginPassword} = req.body;
		session.email = loginEmail;

		connection.query('SELECT * FROM users WHERE email = ?',
			[loginEmail], (err, result) => {
				if(err) throw err;

				const dbPassword = result[0] && result[0].password || '';
				const isValidPassword = bcrypt.compareSync(loginPassword, dbPassword);

				if (!isValidPassword) {
					return res.send(403);
				}
				this.checkRole(res, result);
				session.token = this.getToken(result);
			});
	}

	checkRole(res, result){
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
	}

	getToken(result){
		return jwt.sign(
			{
				userId: result[0].ID,
				email: result[0].email
			},
			'protection',
			{
				expiresIn: '1h'
			});
	}
}
module.exports = Login;