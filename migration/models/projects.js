module.exports = (sequelize, type) => {
	return sequelize.define('projects', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: type.STRING
		},
		description: {
			type: type.TEXT
		},
		manager: {
			type: type.STRING
		}
	},
	{
		timestamps: false
	});
};