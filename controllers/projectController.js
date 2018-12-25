const session = require('express-session');
const connection = require('../database/database');

class Project{

	async project(req, res){

	const getProjectInfo = await this.getProjectInfo(req);
	const getTasksInfo = await this.getTasksInfo(req);
	const getDevelopers = await this.getDevelopers();

	if(session.role === 'Manager'){
		res.render('project',
			{
				getProjectInfo: getProjectInfo,
				getTasksInfo: getTasksInfo,
				getDevelopers: getDevelopers
			});
	}
};

	getNameUrl(req){
		return req.originalUrl;
	}

	async getProjectInfo(req){
	return new Promise((resolve, reject) => {
		const projectName = this.getNameUrl(req).slice(9);

		connection.query('SELECT * FROM projects WHERE name = ? LIMIT 1',
			[projectName], (err, result) => {
				if (err) reject(err);

				resolve(result);
			});
	});
};

	async getTasksInfo(req){
	return new Promise((resolve, reject) => {
		const projectName = this.getNameUrl(req).slice(9);

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

async getDevelopers(){
	return new Promise(function(resolve, reject){
		connection.query('SELECT email FROM users WHERE role = "Developer"',
			(err, result) => {
				if (err) reject(err);

				resolve(result);
			});
	});
};
}

module.exports = Project;