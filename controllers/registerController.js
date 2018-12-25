const bcrypt = require('bcrypt');
const connection = require('../database/database');

class Register{

	register(req, res){
		const username = req.body.username;
		const email = req.body.registerEmail;
		const role = req.body.role;
		const password = req.body.registerPassword;
		const confirmPassword = req.body.confirmPassword;

		if(password === confirmPassword){
			connection.query('SELECT true FROM users WHERE email = ? LIMIT 1',
				[email], (err, result) => {
					if(err) throw err;

					if(result.length === 0) {
						const hashedPassword = bcrypt.hashSync(password, 8);
						connection.query('INSERT INTO users (username, email, role, password) VALUES(?, ?, ?, ?)',
							[username, email, role, hashedPassword], (err) => {
								if(err) throw err;
								res.redirect('/');
							});
					} else res.send(404, 'email is already exist');
				});
		}
	}
}

module.exports = Register;