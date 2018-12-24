const Sequelize = require('sequelize');
const UserModel = require('../models/users');
const ProjectsModel = require('../models/projects');
const TasksModel = require('../models/tasks');

const sequelize = new Sequelize('taskmanager', 'root', 'strangerthings', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 10,
		min: 0,
		acquire: 3000,
		idle: 1000
	}
});

class Tables{
	createTable(){
		UserModel(sequelize, Sequelize);
		ProjectsModel(sequelize, Sequelize);
		TasksModel(sequelize, Sequelize);

		sequelize.sync({force: true})
			.then(() => {
				console.log('tables created');
			});
	}
}

module.exports = Tables;