const session = require('express-session');
const connection = require('../database/database');

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
					if (err) reject(err);

					resolve(result);
				});
		});
	}

	createProject(req, res){
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

	updateData(req, res){
		const updateName = req.body.updateSelectName;
		const name = req.body.updateName;
		const description = req.body.updateDescription;

		connection.query('SELECT true FROM projects WHERE name = ? LIMIT 1',
			[name], (err, result) => {
				if (err) throw err;

				if (result.length === 0){
					this.updateTask(name, updateName);
					this.updateProject(name, description, updateName);

				} else res.send(404, '<h1>This project already exist</h1>');
			});
	}

	updateTask(name, updateName){
		connection.query('UPDATE tasks SET project = ? WHERE project = ?',
			[name, updateName], (err) => {
				if (err) throw err;
			});
	}

	updateProject(name, description, updateName, res){
		connection.query('UPDATE projects SET name = ?, description = ? WHERE name = ?',
			[name, description, updateName], (err) => {
				if(err) throw err;
				res.redirect('/manager');
			});
	}

	deleteData(req, res){
		const name = req.body.deleteName;

		connection.query('DELETE FROM tasks WHERE project = ?',
			[name], (err) => {
				if (err) throw err;
			});

		connection.query('DELETE FROM projects WHERE name = ? LIMIT 1',
			[name], (err) => {
				if (err) throw err;

				res.redirect('/manager');
			});
	}

	logout(req, res){
		req.session.destroy((err) => {
			if (err) throw err;
			session.role = null;
			session.email = null;
			res.redirect('/');
		});
	}
}


module.exports = Projects;