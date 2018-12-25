const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'username',
	password: 'password',
	database: 'taskmanager'
});

connection.connect((err) => {
	if (err) throw err;
});
module.exports = connection;