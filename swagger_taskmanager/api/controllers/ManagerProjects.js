'use strict';
const connection = require('../../../database/database');

module.exports = {
	GetProjects: GetProjects,
	CreateProject: CreateProject,
	UpdateData: UpdateData,
	DeleteData: DeleteData
};

function GetProjects(req, res){
	const managerEmail = req.swagger.params.managerEmail.value;

	connection.query('SELECT * FROM projects WHERE manager = ?',
		[managerEmail], (err, result) => {
			if (err) throw err;
			res.end(JSON.stringify(result));
		});
}

function CreateProject(req, res){
	const projectName = req.swagger.params.createProject.value.projectName;
	const projectDescription = req.swagger.params.createProject.value.projectDescription;
	const projectManager = req.swagger.params.createProject.value.projectManager;

	connection.query('SELECT true FROM projects WHERE name = ? LIMIT 1',
		[projectName], (err, result) => {
			if (err) throw err;

			if (result.length === 0){
				connection.query('INSERT INTO projects (name, description, manager) VALUE(?, ?, ?)',
					[projectName, projectDescription, projectManager], (err) => {
						if (err) throw err;

						res.end('Project created');
					});
			} else res.end(404, '<h1>This project already exist</h1>');
		});
}

function UpdateData(req, res){
	const projectWillBeUpdated = req.swagger.params.updateProject.value.projectWillBeUpdated;
	const projectName = req.swagger.params.updateProject.value.projectName;
	const projectDescription = req.swagger.params.updateProject.value.projectDescription;

	connection.query('SELECT true FROM projects WHERE name = ? LIMIT 1',
		[projectName], (err, result) => {
			if (err) throw err;

			if (result.length === 0){
				updateTask(projectName, projectWillBeUpdated);
				updateProject(projectName, projectDescription, projectWillBeUpdated);
				res.end('Project updated');
			} else res.end(404, '<h1>This project already exist</h1>');
		});
}
function updateTask(projectName, projectWillBeUpdated){
	connection.query('UPDATE tasks SET project = ? WHERE project = ?',
		[projectName, projectWillBeUpdated], (err) => {
			if (err) throw err;
		});
}
function updateProject(projectName, projectDescription, projectWillBeUpdated){
	connection.query('UPDATE projects SET name = ?, description = ? WHERE name = ?',
		[projectName, projectDescription, projectWillBeUpdated], (err) => {
			if(err) throw err;
		});
}

function DeleteData(req, res){
	const projectWillBeDeleted = req.swagger.params.deleteProject.value.projectWillBeDeleted;

	connection.query('DELETE FROM tasks WHERE project = ?',
		[projectWillBeDeleted], (err) => {
			if (err) throw err;
		});

	connection.query('DELETE FROM projects WHERE name = ? LIMIT 1',
		[projectWillBeDeleted], (err) => {
			if (err) throw err;
			res.end('Project deleted');
		});
}