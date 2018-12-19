const session = require('express-session');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'taskmanager'
});

class Projects{
	async manager(req, res){
		const projectsList = await this.list();

		if(session.role === 'Manager'){
			res.render('manager',
				{
					projectsList: projectsList,
					userEmail: session.email
				});
		}
	}

	async list(){
		return new Promise(function(resolve, reject){
			connection.query('SELECT * FROM projects WHERE manager = ?',
				[session.email], (err, result) => {
					if (err) throw reject;

					resolve(result);
				});
		});
	}

	create(req, res){
		const name = req.body.createName;
		const description = req.body.createDescription;

		connection.query('SELECT true FROM projects WHERE name = ? LIMIT 1',
			[name], (err, result) => {
				if (err) throw err;

				if (result.length === 0){
					connection.query('INSERT INTO projects (name, description, manager) VALUE(?, ?, ?)',
						[name, description, session.email], (err) => {
							if (err) throw err;

							res.redirect('/manager');
						});
				} else res.send(404, '<h1>This project already exist</h1>');
			});
	}

	update(req, res){
		const updateName = req.body.updateSelectName;
		const name = req.body.updateName;
		const description = req.body.updateDescription;

		connection.query('UPDATE projects SET name = ?, description = ? WHERE name = ?',
			[name, description, updateName], (err) => {
				if(err) throw err;

				res.redirect('/manager');
			});
	}

	delete(req, res){
		const name = req.body.deleteName;

		connection.query('DELETE FROM projects WHERE name = ? LIMIT 1',
			[name], (err) => {
				if (err) throw err;

				res.redirect('/manager');
			});
	}
}


module.exports = Projects;