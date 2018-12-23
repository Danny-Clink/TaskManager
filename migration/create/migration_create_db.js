const Sequelize = require('sequelize');
const Tables = require('./migration_create_tables');

const tables = new Tables();

const sequelize = new Sequelize('', 'root', 'strangerthings', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 3000,
		idle: 1000
	}
});

class Database{
	createDB(){
		sequelize.query('CREATE DATABASE `taskmanager`;').then(() => {
			console.log('database created');
			tables.createTable();
		});
	}
}

module.exports = Database;