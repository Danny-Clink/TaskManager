module.exports = (sequelize, type) => {
    return sequelize.define('tasks', {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: type.STRING
    },
    description: {
        type: type.TEXT
    },
    startDate: {
        type: type.DATE
    },
    endDate: {
        type: type.DATE
    },
    status: {
        type: type.STRING
    },
    developer: {
        type: type.STRING
    }
})
}