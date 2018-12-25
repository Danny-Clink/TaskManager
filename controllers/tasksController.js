const connection = require('../database/database');

class Tasks{
	create(req, res){
		const name = req.body.createName;
		const description = req.body.createDescription;
		const startDate = req.body.createStartDate;
		const endDate = req.body.createEndDate;
		const project = req.body.createProject;

		connection.query('SELECT true FROM tasks WHERE name = ? AND project = ? LIMIT 1',
			[name, project], (err, result) => {
				if (err) throw err;

				if (result.length === 0){
					connection.query('INSERT INTO tasks (name, description, startDate, endDate, status, project) VALUES(?, ?, ?, ?, ?, ?)',
						[name, description, startDate, endDate, 'created', project], (err) => {
							if(err) throw err;

							res.redirect('/manager/' + project);
						});
				} else res.send(404, '<h1>This task already exist</h1>');
			});
	}

	update(req, res){
		const updateSelect = req.body.updateSelect;
		const name = req.body.updateName;
		const description = req.body.updateDescription;
		const startDate = req.body.updateStartDate;
		const endDate = req.body.updateEndDate;
		const project = req.body.updateProject;

		connection.query('SELECT true FROM tasks WHERE name = ? LIMIT 1',
			[name], (err, result) => {
				if (err) throw err;

				if (result.length === 0){
					connection.query('UPDATE tasks SET name = ?, description = ?, startDate = ?, endDate = ? WHERE name = ?',
						[name, description, startDate, endDate, updateSelect], (err) => {
							if (err) throw err;

							res.redirect('/manager/' + project);
						});
				} else res.send(404, '<h1>This task already exist</h1>');
			});
	}

	delete(req, res){
		const name = req.body.deleteName;

		connection.query('SELECT project FROM tasks WHERE name = ? ',
			[name], (err, result) => {
				if (err) throw err;

				connection.query('DELETE FROM tasks WHERE name = ? LIMIT 1',
					[name], (err) => {
						if (err) throw err;

						res.redirect('/manager/' + result[0].project);
					});
			});
	}

	assign(req, res){
		const taskName = req.body.selectTask;
		const devName = req.body.selectName;

		connection.query('SELECT project FROM tasks WHERE name = ? ',
			[taskName], (err, result) => {
				if (err) throw err;
				connection.query('UPDATE tasks SET developer = ?, status = "assigned" WHERE name = ?',
					[devName, taskName], (err) => {
						if (err) throw err;

						res.redirect('/manager/' + result[0].project);
					});
			});
	}
}

module.exports = Tasks;