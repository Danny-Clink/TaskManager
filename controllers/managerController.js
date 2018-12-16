const session = require('express-session');
const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'strangerthings',
	database: 'taskmanager'
});

const Controller = function(){};

Controller.manager = async function(req, res){
	const projectsList = await Controller.projectsList();

	if(session.role === 'Manager'){
		res.render('manager',
			{
				projectsList: projectsList,
				userEmail: session.email
			});
	} else res.send('access danied');
};

Controller.projectsList = function(){
	return new Promise(function(resolve, reject){
		connection.query('SELECT * FROM projects WHERE manager = ?',
			[session.email], (err, result) => {
				if (err) throw reject;

				console.log(result);
				resolve(result);
			});
	});
};

Controller.projectCreate = function(req, res){
	const name = req.body.nameCreate;
	const description = req.body.descriptionCreate;

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
};

Controller.projectUpdate = function(req, res){
	const id = req.body.idUpdate.replace(/[^0-9]/gim, '');
	const name = req.body.nameUpdate;
	const description = req.body.descriptionUpdate;

	connection.query('UPDATE projects SET name = ?, description = ? WHERE ID = ?',
		[name, description, id], (err) => {
			if(err) throw err;

			console.log('updated');
			res.redirect('/manager');
		});
};

module.exports = Controller;