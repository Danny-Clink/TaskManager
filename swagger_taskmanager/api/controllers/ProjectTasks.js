'use strict';
const connection = require('../../../database/database');

module.exports = {
	CreateTask: CreateTask,
	UpdateTask: UpdateTask,
	DeleteTask: DeleteTask,
	AssignDeveloper: AssignDeveloper
};

function CreateTask(req, res){
	const createName = req.swagger.params.createTask.value.createName;
	const createDescription = req.swagger.params.createTask.value.createDescription;
	const createStartDate = req.swagger.params.createTask.value.createStartDate;
	const createEndDate = req.swagger.params.createTask.value.createEndDate;
	const createProjectName = req.swagger.params.createTask.value.createProjectName;

	connection.query('SELECT true FROM tasks WHERE name = ? AND project = ? LIMIT 1',
		[createName, createProjectName], (err, result) => {
			if (err) throw err;

			if (result.length === 0){
				connection.query('INSERT INTO tasks (name, description, startDate, endDate, status, project) VALUES(?, ?, ?, ?, ?, ?)',
					[createName, createDescription, createStartDate, createEndDate, 'created', createProjectName], (err) => {
						if(err) throw err;

						res.end('Task created');
					});
			} else res.send(404, 'This task already exist');
		});
}

function UpdateTask(req, res){
	const taskWillBeUpdated = req.swagger.params.updateTask.value.taskWillBeUpdated;
	const updateName = req.swagger.params.updateTask.value.updateName;
	const updateDescription = req.swagger.params.updateTask.value.updateDescription;
	const updateStartDate = req.swagger.params.updateTask.value.updateStartDate;
	const updateEndDate = req.swagger.params.updateTask.value.updateEndDate;
	const updateProjectName = req.swagger.params.updateTask.value.updateProjectName;

	connection.query('SELECT true FROM tasks WHERE name = ? LIMIT 1',
		[updateName], (err, result) => {
			if (err) throw err;

			if (result.length === 0){
				connection.query('UPDATE tasks SET name = ?, description = ?, startDate = ?, endDate = ? WHERE name = ? AND project = ?',
					[updateName, updateDescription, updateStartDate, updateEndDate, taskWillBeUpdated, updateProjectName], (err) => {
						if (err) throw err;

						res.end('Task updated');
					});
			} else res.send(404, 'This task already exist');
		});
}

function DeleteTask(req, res){
	const taskName = req.swagger.params.deleteTask.value.taskName;
	const projectName = req.swagger.params.deleteTask.value.projectName;

	connection.query('DELETE FROM tasks WHERE name = ? AND project = ? LIMIT 1',
		[taskName, projectName], (err) => {
			if (err) throw err;

			res.end('Task has been deleted');
		});
}

function AssignDeveloper(req, res){
	const selectTask = req.swagger.params.assignDeveloper.value.selectTask;
	const selectProject = req.swagger.params.assignDeveloper.value.selectProject;
	const developerEmail = req.swagger.params.assignDeveloper.value.developerEmail;

	connection.query('UPDATE tasks SET developer = ?, status = "assigned" WHERE name = ? AND project = ?',
		[developerEmail, selectTask, selectProject], (err) => {
			if (err) throw err;

			res.end('Developer assigned');
		});
}