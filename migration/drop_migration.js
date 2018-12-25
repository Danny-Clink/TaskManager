const Sequelize = require('sequelize');

const sequelize = new Sequelize('', 'username', 'password', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 3000,
		idle: 1000
	}
});

sequelize.query('DROP DATABASE `taskmanager`').then(() => {
	console.log('database is droped');
});