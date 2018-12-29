'use strict';
const connection = require('../../../database/database');

module.exports = {
	DoneTask: DoneTask
};

function DoneTask(req, res){
	const taskName = req.swagger.params.doneTask.value.taskName;

	connection.query('UPDATE tasks SET status = "done" WHERE name = ?',
		[taskName], (err) => {
			if (err) throw err;

			res.end('status updated');
		});
}