'use strict';
const connection = require('../../../database/database');

module.exports = {
	GetTasks: GetTasks
};

function GetTasks(req, res){
	const developerEmail = req.swagger.params.developerEmail.value;

	connection.query('SELECT * FROM tasks WHERE developer = ?',
		[developerEmail], (err, result) => {
			if (err) throw err;

			res.end(JSON.stringify(result));
		});
}