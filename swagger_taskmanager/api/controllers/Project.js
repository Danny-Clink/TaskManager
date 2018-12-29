'use strict';
const connection = require('../../../database/database');

module.exports = {
	GetProjectInfo: GetProjectInfo,
	GetProjectTasks: GetProjectTasks,
	GetDevelopers: GetDevelopers
};

function GetProjectInfo(req, res){
	const projectName = req.swagger.params.projectName.value;

	connection.query('SELECT * FROM projects WHERE name = ? LIMIT 1',
		[projectName], (err, result) => {
			if (err) throw(err);
			res.end(JSON.stringify(result));
		});
}

function GetProjectTasks(req, res){
	const projectName = req.swagger.params.projectName.value;

	connection.query('SELECT * FROM tasks WHERE project = ?',
		[projectName], (err, result) => {
			if (err) throw(err);

			result.forEach(element => {
				if(element.endDate < new Date()){
					connection.query('UPDATE tasks SET status = "expired" WHERE name = ?',
						[element.name], (err) => {
							if (err) throw err;
							element.status = 'expired';
							res.end(JSON.stringify(result));
						});
				}
			});
			result.forEach(element => {
				element.startDate = element.startDate.toLocaleDateString('en-US');
				element.endDate = element.endDate.toLocaleDateString('en-US');
			});
			res.end(JSON.stringify(result));
		});
}

function GetDevelopers(res){
	connection.query('SELECT email FROM users WHERE role = "Developer"',
		(err, result) => {
			if (err) throw err;

			res.end(JSON.stringify(result));
		});
}