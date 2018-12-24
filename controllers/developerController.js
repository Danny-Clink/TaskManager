const session = require('express-session');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'taskmanager'
});

class Developer{
	async developer(req, res){
		const tasks = await this.getTasks();

		if(session.role === 'Developer'){
			res.render('developer', {
				getTasks: tasks,
				devEmail: session.email,
			});
		}
	}

	async getTasks(){
		return new Promise(function(resolve, reject){
			const email = session.email;
			connection.query('SELECT name, description, startDate, endDate, status, project FROM tasks WHERE developer = ?',
				[email], (err, result) => {
					if (err) reject(err);

					if(result){
						result.forEach(element => {
							element.startDate = element.startDate.toLocaleDateString('en-US');
							element.endDate = element.endDate.toLocaleDateString('en-US');
						});
						resolve(result);
					}
				});
		});
	}

	doneTask(req, res){
		const selectedTask = req.body.selectedTask;
		connection.query('UPDATE tasks SET status = "done" WHERE name = ?',
			[selectedTask], (err) => {
				if (err) throw err;

				res.redirect('/developer');
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

module.exports = Developer;