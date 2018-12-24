module.exports = (sequelize, type) => {
	return sequelize.define('users', {
		id: {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: type.STRING
		},
		email: {
			type: type.STRING
		},
		role: {
			type: type.STRING
		},
		password: {
			type: type.STRING
		},
	},
	{
		timestamps: false
	});
};