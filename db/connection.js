const Sequelize = require('sequelize');

const sequelize = new Sequelize('musicToVideo', '', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;