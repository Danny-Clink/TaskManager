const session = require('express-session');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'taskmanager'
});

const Controller = function(){};

Controller.project = async function(req, res){
	this.nameUrl = () => {
		return req.originalUrl;
	};

	const getProjectInfo = await Controller.getProjectInfo();
	const getTasksInfo = await Controller.getTasksInfo();
	const getDevelopers = await Controller.getDevelopers();

	if(session.role === 'Manager'){
		res.render('project',
			{
				getProjectInfo: getProjectInfo,
				getTasksInfo: getTasksInfo,
				getDevelopers: getDevelopers
			});
	}
};

Controller.getProjectInfo = async function(){
	return new Promise(function(resolve, reject){
		const projectName = this.nameUrl().slice(9);

		connection.query('SELECT * FROM projects WHERE name = ? LIMIT 1',
			[projectName], (err, result) => {
				if (err) reject(err);

				resolve(result);
			});
	});
};

Controller.getTasksInfo = async function(){
	return new Promise(function(resolve, reject){
		const projectName = this.nameUrl().slice(9);

		connection.query('SELECT * FROM tasks WHERE project = ?',
			[projectName], (err, result) => {
				if (err) reject(err);

				result.forEach(element => {
					if(element.endDate < new Date()){
						connection.query('UPDATE tasks SET status = "expired" WHERE name = ?',
							[element.name], (err) => {
								if (err) throw err;
								element.status = 'expired';
								resolve(result);
							});
					}
				});
				result.forEach(element => {
					element.startDate = element.startDate.toLocaleDateString('en-US');
					element.endDate = element.endDate.toLocaleDateString('en-US');
				});
				resolve(result);
			});
	});
};

Controller.getDevelopers = async function(){
	return new Promise(function(resolve, reject){
		connection.query('SELECT email FROM users WHERE role = "Developer"',
			(err, result) => {
				if (err) reject(err);

				resolve(result);
			});
	});
};

module.exports = Controller;